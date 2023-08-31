let collection      = db.collection("blocks");
function Block() {

	/**
	 * Function to get block list
	 *
	 * @param req As Request Data
	 * @param res As Response Data
	 *
	 * @return render/json
	 */
	this.getBlockList = (req, res,next)=>{
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
	};//End getBlockList()

	/**
	 * Function to get block's detail
	 *
	 * @param req	As	Request Data
	 * @param res	As	Response Data
	 * @param next	As 	Callback argument to the middleware function
	 *
	 * @return json
	 */
	let getBlockDetails = (req,res,next)=>{
		return new Promise(resolve=>{
			let blockId = (req.params.id) ? req.params.id : "";
			/** Get block details **/
			const blocks = db.collection('blocks');
			blocks.findOne({
					_id : ObjectId(blockId)
				},
				{projection: {
					_id:1,page_name :1,title:1,name:1,description:1,modified:1
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
	};// End getBlockdetails().

	/**
	 * Function to update block's detail
	 *
	 * @param req 	As 	Request Data
	 * @param res 	As 	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.editBlock = (req, res,next)=>{
		if(isPost(req)){
			/** Sanitize Data **/
			req.body	= sanitizeData(req.body,NOT_ALLOWED_TAGS_XSS);
			let id		= (req.params.id) ? req.params.id :"";

			if(!id){
				/** Send error response **/
				return res.send({
					status	: STATUS_ERROR,
					result  : {},
					error : {},
					message	: [{param:ADMIN_GLOBAL_ERROR,msg:res.__("admin.system.something_going_wrong_please_try_again")}]
				});
			}


			let pageTitle	= (req.body.title)	? req.body.title	: "";
			let pageBody	= (req.body.body)	? req.body.body	: "";

			/** Check validation **/
			req.checkBody({
				'name': {
					notEmpty: true,
					errorMessage: res.__("admin.block.please_enter_page_name")
				},
				'title': {
					notEmpty: true,
					errorMessage: res.__("admin.block.please_enter_title")
				},
				'body': {
					notEmpty: true,
					errorMessage: res.__("admin.block.please_enter_page_description")
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

			/** Update block details **/
			const blocks = db.collection("blocks");
			blocks.updateOne({
					_id : ObjectId(id)
				},
				{$set: {
					body				: 	pageBody,
					name				: 	(req.body.name)	?	req.body.name	:"",
					title				: 	(req.body.title)	?	req.body.title	:"",
					page_name			: 	(req.body.page_name)	?	req.body.page_name	:"",
					modified 			:	getUtcDate()
				}},(err,result)=>{
					if(!err){
						res.send({
							status		: API_STATUS_SUCCESS,
							result  	: {},
							error 		: {},
							message		: res.__("admin.block.block_details_has_been_updated_successfully"),
						});
					}else{
						return res.send({
							status		: API_STATUS_SUCCESS,
							result  	: {},
							error 		: {},
							message		: res.__("admin.block.block_details_has_been_updated_successfully"),
						});
					}
				}
			);
		}else{
			return res.send({
				"status"      : API_STATUS_ERROR,
				"message"     : res.__("front.system.something_went_wrong"),
				"error"       : [],
				"result" 	  : []
			});
		}
	};//End editBlock()

	/**
	 * Function for add block
	 *
	 * @param req 	As	Request Data
	 * @param res 	As	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.addBlock = (req, res,next)=>{
		if(isPost(req)){
			/** Sanitize Data */
			req.body = 	sanitizeData(req.body,NOT_ALLOWED_TAGS_XSS);
			
			if(req.body.pages_descriptions === undefined || req.body.pages_descriptions[DEFAULT_LANGUAGE_MONGO_ID] === undefined || req.body.pages_descriptions[DEFAULT_LANGUAGE_MONGO_ID] == ''){
				/** Send error response */
				return res.send({
					status	: STATUS_ERROR,
					message	: [{param:ADMIN_GLOBAL_ERROR,msg:res.__("admin.system.something_going_wrong_please_try_again")}]
				});
			}

			let allData		= 	req.body;
			req.body		=	clone(allData.pages_descriptions[DEFAULT_LANGUAGE_MONGO_ID]);
			let pageBody	= 	(req.body.body)	?	req.body.body	:"";
			let pageName	= 	(req.body.name) ? 	req.body.name 	:"";
			let pageTitle	= 	(req.body.title) ? 	req.body.title 	:"";

			/** Check validation */
			req.checkBody({
				'name': {
					notEmpty: true,
					errorMessage: res.__("admin.block.please_enter_page_name")
				},
				'title': {
					notEmpty: true,
					errorMessage: res.__("admin.block.please_enter_title")
				},
				'body': {
					notEmpty: true,
					errorMessage: res.__("admin.block.please_enter_page_description")
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
					status	: STATUS_ERROR,
					message	: errors,
				});
			}

			/** Set options **/
			let options = {
				title 		:	pageName,
				table_name 	: 	"blocks",
				slug_field 	: 	"slug"
			};

			/** Make Slug */
			getDatabaseSlug(options).then(response=>{
				/** Save block details */
				const blocks = db.collection('blocks');
				blocks.insertOne({
					name				:	pageName,
					title				:	pageTitle,
					body				: 	pageBody,
					slug				: 	(response && response.title)	?	response.title	:"",
					created 			: 	getUtcDate(),
					modified 			: 	getUtcDate()
				},(err,result)=>{
					if(err) return next(err);

					res.send({
						status			: API_STATUS_SUCCESS,
						"error"       : [],
						"result" 	  : [],
						message			: res.__("admin.block.block_has_been_added_successfully")
					});
				});
			},error=>{
				/** Send error response */
				res.send({
					status	: API_STATUS_ERROR,
					"error"       : [],
					"result" 	  : [],
					message	: res.__("admin.system.something_going_wrong_please_try_again")
				});
			});
		}else{
			return res.send({
				"status"      : API_STATUS_ERROR,
				"message"     : res.__("front.system.something_went_wrong"),
				"error"       : [],
				"result" 	  : []
			});
		}
	};//End addBlock()
}
module.exports = new Block();
