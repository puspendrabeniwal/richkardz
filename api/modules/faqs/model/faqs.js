const collection	= db.collection('faqs');
function Faqs() {

	/**
	 * Function to get faqs list
	 *
	 * @param req As Request Data
	 * @param res As Response Data
	 *
	 * @return render/json
	 */
	this.getFaqsList = (req, res,next)=>{
		if(isPost(req)){
			let limit			= (req.body.length) ? parseInt(req.body.length)	: API_LISTING_LIMIT;
			let skip			= (req.body.start)	? parseInt(req.body.start)	: DEFAULT_SKIP;
			collection.find({
				status : ACTIVE
			}).skip(skip).limit(limit).toArray((err,result)=>{
	
				if(!err){
					return res.send({
						"status"      : API_STATUS_SUCCESS,
						"message"     : '',
						"error"       : [],
						"result"      : result
					});
				}else{
					return res.send({
						"status"      : API_STATUS_ERROR,
						"message"     : res.__("front.system.something_went_wrong"),
						"error"       : [],
						"result" : []
					});
				}
			})
		}else{
			return res.send({
				"status"      : API_STATUS_ERROR,
				"message"     : res.__("front.system.something_went_wrong"),
				"error"       : [],
				"result"      : {}
			});
		}
	};//End getfaqsList()

	/**
	 * Function to get faqs's detail
	 *
	 * @param req	As	Request Data
	 * @param res	As	Response Data
	 * @param next	As 	Callback argument to the middleware function
	 *
	 * @return json
	 */
	this.getFaqsDetails = (req, res)=>{
        let pageId = (req.params.id) ? req.params.id : "";
        let collection     = db.collection("faqs");
        collection.findOne({
            _id : ObjectId(pageId),
        },(err,result)=>{
            if(!err){
                return res.send({
                    "status"      : API_STATUS_SUCCESS,
                    "message"     : '',
                    "error"       : [],
                    "result"      : result
                });
            }else{
                return res.send({
                    "status"      : API_STATUS_ERROR,
                    "message"     : res.__("front.system.something_went_wrong"),
                    "error"       : [],
                    "result"      : {}
                });
            }
        })
    }
	// End getfaqsDetails().

	/**
	 * Function to update faqs's detail
	 *
	 * @param req 	As 	Request Data
	 * @param res 	As 	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.editFaqs = (req, res,next)=>{
		if(isPost(req)){
			/** Sanitize Data **/
			req.body	= sanitizeData(req.body,NOT_ALLOWED_TAGS_XSS);
			let id		= (req.params.id) ? req.params.id :"";

			if(!id){
				/** Send error response **/
				return res.send({
					status	: STATUS_ERROR,
					message	: [{param:ADMIN_GLOBAL_ERROR,msg:res.__("admin.system.something_going_wrong_please_try_again")}]
				});
			}


			let pageBody	= (req.body.answer)	? req.body.answer	: "";

			/** Check validation **/
			req.checkBody({
				'question': {
					notEmpty: true,
					errorMessage: res.__("admin.faqs.please_enter_page_name")
				},
				'answer': {
					notEmpty: true,
					errorMessage: res.__("admin.faqs.please_enter_page_description")
				},
			});

			if(pageBody!= ""){
				req.body.answer =  pageBody.replace(new RegExp(/&nbsp;|<br \/\>|<p>|<\/p>/g),' ').trim();
			}

			/** parse Validation array  **/
			let errors = parseValidation(req.validationErrors(),req);
			if (errors) {
				/** Send error response **/
				return res.send({
					status	: STATUS_ERROR,
					message	: errors,
				});
			}

			/** Update faqs details **/
			const faqs = db.collection("faqs");
			faqs.updateOne({
					_id : ObjectId(id)
				},
				{$set: {
					answer				: 	pageBody,
					question				: 	(req.body.question)	?	req.body.question	:"",
					status				: 	(req.body.status)	?	parseInt(req.body.status)	:"",
					modified 			:	getUtcDate()
				}},(err,result)=>{
					if(err) return next(err);

					res.send({
						status			: STATUS_SUCCESS,
						message			: res.__("admin.faqs.faqs_details_has_been_updated_successfully"),
					});
				}
			);
		}else{

		}
	};//End editfaqs()


	/**
	 * Function for add faqs
	 *
	 * @param req 	As	Request Data
	 * @param res 	As	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.addFaqs = (req, res,next)=>{
		if(isPost(req)){
	
			/** Sanitize Data */
			req.body = 	sanitizeData(req.body,NOT_ALLOWED_TAGS_XSS);

			let faqAnswer	= 	(req.body.answer)	?	req.body.answer	:"";
			let faqQuestion	= 	(req.body.question) ? 	req.body.question 	:"";

			/** Check validation */
			req.checkBody({
				'question': {
					notEmpty: true,
					errorMessage: res.__("Please Enter Question")
				},
				'answer': {
					notEmpty: true,
					errorMessage: res.__("Please Enter Answer")
				},
			})

			if(faqAnswer!= ""){
				req.body.answer =  faqAnswer.replace(new RegExp(/&nbsp;|<br \/\>|<p>|<\/p>/g),' ').trim();
			}

			/** parse Validation array  */
			let errors = parseValidation(req.validationErrors(),req);
			if (errors) {
				/** Send error response */
				return res.send({
					status	: API_STATUS_ERROR,
					message	: errors,
				});
			}
		

				/** Save faqs details */
				const faqs = db.collection('faqs');
				faqs.insertOne({
					question				:	faqQuestion,
					answer				: 	faqAnswer,
					status				: 	(req.body.status)	?	parseInt(req.body.status)	:"",
					created 			: 	getUtcDate(),
					modified 			: 	getUtcDate()
				},(err,result)=>{
					if(err) return next(err);

					res.send({
						status			: API_STATUS_SUCCESS,
						message			: "Faqs has been added successfully",
					});
				});
			
		}else{
			
		}
	};//End addFaqs()

}
module.exports = new Faqs();
