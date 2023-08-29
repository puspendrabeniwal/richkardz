const collection	= db.collection('pages');
function Cms() {

	/**
	 * Function to get cms list
	 *
	 * @param req As Request Data
	 * @param res As Response Data
	 *
	 * @return render/json
	 */
	this.getCmsList = (req, res,next)=>{
		if(isPost(req)){
			let limit			= (req.body.length) ? parseInt(req.body.length)	: API_LISTING_LIMIT;
			let skip			= (req.body.start)	? parseInt(req.body.start)	: DEFAULT_SKIP;
			collection.find({
				is_active : ACTIVE,
				is_deleted : NOT_DELETED
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
	};//End getCmsList()

	/**
	 * Function to get cms's detail
	 *
	 * @param req	As	Request Data
	 * @param res	As	Response Data
	 * @param next	As 	Callback argument to the middleware function
	 *
	 * @return json
	 */
	let getCmsDetails = (req,res,next)=>{
		return new Promise(resolve=>{
			let cmsId = (req.params.id) ? req.params.id : "";
			/** Get Cms details **/
			const pages = db.collection('pages');
			pages.findOne({
					_id : ObjectId(cmsId)
				},
				{projection: {
					_id:1,name:1,body:1,modified:1,
				}},(err, result)=>{
					if(err) return next(err);
					if(!result){
						/** Send error response **/
						let response = {
							status	: STATUS_ERROR,
							message	: res.__("admin.system.invalid_access")
						};
						return resolve(response);
					}

					/** Send success response **/
					let response = {
						status	: STATUS_SUCCESS,
						result	: result
					};
					resolve(response);
				}
			);
		});
	};// End getCmsDetails().

	/**
	 * Function to update cms's detail
	 *
	 * @param req 	As 	Request Data
	 * @param res 	As 	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.editCms = (req, res,next)=>{
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


			let pageBody	= (req.body.body)	? req.body.body	: "";

			/** Check validation **/
			req.checkBody({
				'name': {
					notEmpty: true,
					errorMessage: res.__("admin.cms.please_enter_page_name")
				},
				'body': {
					notEmpty: true,
					errorMessage: res.__("admin.cms.please_enter_page_description")
				},
			});

			if(pageBody!= ""){
				req.body.body =  pageBody.replace(new RegExp(/&nbsp;|<br \/\>|<p>|<\/p>/g),' ').trim();
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

			/** Update cms details **/
			const pages = db.collection("pages");
			pages.updateOne({
					_id : ObjectId(id)
				},
				{$set: {
					body				: 	pageBody,
					name				: 	(req.body.name)	?	req.body.name	:"",
					modified 			:	getUtcDate()
				}},(err,result)=>{
					if(err) return next(err);

					res.send({
						status			: STATUS_SUCCESS,
						message			: res.__("admin.cms.cms_details_has_been_updated_successfully"),
					});
				}
			);
		}else{

		}
	};//End editCms()

	/**
	 * Function for add cms
	 *
	 * @param req 	As	Request Data
	 * @param res 	As	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.addCms = (req, res,next)=>{
		if(isPost(req)){
			/** Sanitize Data */
			req.body = 	sanitizeData(req.body,NOT_ALLOWED_TAGS_XSS);

			let pageBody	= 	(req.body.body)	?	req.body.body	:"";
			let pageName	= 	(req.body.name) ? 	req.body.name 	:"";

			/** Check validation */
			req.checkBody({
				'name': {
					notEmpty: true,
					errorMessage: res.__("admin.cms.please_enter_page_name")
				},
				'body': {
					notEmpty: true,
					errorMessage: res.__("admin.cms.please_enter_page_description")
				},
			})

			if(pageBody!= ""){
				req.body.body =  pageBody.replace(new RegExp(/&nbsp;|<br \/\>|<p>|<\/p>/g),' ').trim();
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

			/** Set options **/
			let options = {
				title 		:	pageName,
				table_name 	: 	"pages",
				slug_field 	: 	"slug"
			};

			/** Make Slug */
			getDatabaseSlug(options).then(response=>{
				/** Save Cms details */
				const pages = db.collection('pages');
				pages.insertOne({
					name				:	pageName,
					body				: 	pageBody,
					slug				: 	(response && response.title)	?	response.title	:"",
					created 			: 	getUtcDate(),
					modified 			: 	getUtcDate()
				},(err,result)=>{
					if(err) return next(err);

					res.send({
						status			: API_STATUS_SUCCESS,
						message			: res.__("admin.cms.cms_has_been_added_successfully")
					});
				});
			},error=>{
				/** Send error response */
				res.send({
					status	: API_STATUS_ERROR,
					message	: res.__("admin.system.something_going_wrong_please_try_again")
				});
			});
		}else{
			
		}
	};//End addCms()

}
module.exports = new Cms();
