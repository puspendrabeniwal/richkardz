const collection = db.collection('testimonials');
function Testimonials() {

	/**
	 * Function to get banners list
	 *
	 * @param req As Request Data
	 * @param res As Response Data
	 *
	 * @return render/json
	 */
	this.getList = (req, res, next) => {
		if (isPost(req)) {
			let limit = (req.body.length) ? parseInt(req.body.length) : API_LISTING_LIMIT;
			let skip = (req.body.start) ? parseInt(req.body.start) : DEFAULT_SKIP;


			let searchCondition = {};
			let name			= (req.body.name)	? req.body.name	: "";
			if(name) searchCondition['name'] = new RegExp(name, "i");

			collection.find(searchCondition).skip(skip).limit(limit).toArray((err,result)=>{
	
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

			});
		} else {

		}
	};//End getList()


	/**
	 * Function to update testimonial's detail
	 *
	 * @param req 	As 	Request Data
	 * @param res 	As 	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.editTestimonial = (req, res, next) => {
		if (isPost(req)) {
			/** Sanitize Data **/
			req.body = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);

			/** Check validation */
			req.checkBody({
				'name': {
					notEmpty: true,
					errorMessage:"Please enter name"
				},
				'rating': {
					notEmpty: true,
					errorMessage: "Please enter rating"
				},
				'descripiton': {
					notEmpty: true,
					errorMessage: "Please enter description"
				},
			})

			/** parse Validation array  **/
			let errors = parseValidation(req.validationErrors(), req);
			if (errors) {
				/** Send error response **/
				return res.send({
					status: API_STATUS_ERROR,
					message: errors,
					errors : errors,
					result : []

				});
			}
			let testimonialId = (req.params.id) ? req.params.id : "";

			/** Configure testimonials unique conditions **/
			const testimonials = db.collection("testimonials");
			testimonials.findOne({
				_id: { $eq: ObjectId(testimonialId) },
				is_deleted: NOT_DELETED,
			}, { projection: { _id: 1, name: 1, rating: 1, image: 1, descripiton:1 } },
				(err, result) => {
					if (err) return next(err);
					/** Set options for upload image **/
					let oldimage = (req.body.old_image) ? req.body.old_image : "";
					let image = (req.files && req.files.image) ? req.files.image : "";
					let options = {
						'image': image,
						'filePath': USERS_FILE_PATH,
						'oldPath': oldimage
					};
					/** Upload testimonials image **/
					moveUploadedFile(req, res, options).then(response => {

						if (response.status == STATUS_ERROR) {
							/** Send error response **/
							return res.send({
								status: API_STATUS_ERROR,
								message: [{ 'param': 'image', 'msg': response.message }],
								error : [],
								result : {}
							});
						}
						/** Set update data **/
						let updateData = {
							modified: getUtcDate(),
							name: (req.body.name) ? req.body.name : "",
							rating: (req.body.rating) ? Number(req.body.rating) : ACTIVE,
							descripiton: req.body.descripiton ? req.body.descripiton : ""
						};
						let bannerImage = response.fileName ? response.fileName : "";
						updateData.image = bannerImage ? bannerImage : oldimage;

						/** Update testimonial data **/
						testimonials.updateOne({ _id: ObjectId(testimonialId) }, { $set: updateData }, (updateErr, result) => {
							if (updateErr) return next(updateErr);
							
							res.send({
								status: API_STATUS_SUCCESS,
								message: "Details has been updated successfully",
								error : [],
								result : {}
							});
						});

					}).catch(next);
				});
		} else {
			/** Send error response */
			res.send({
				"status"      : API_STATUS_ERROR,
				"error"       : [],
				"result"      : [],
				"message"	  : "Something going wrong please try again"
			});
		}
	};//End edittestimonials()


		/**
	 * Function to view testimonial's detail
	 *
	 * @param req 	As 	Request Data
	 * @param res 	As 	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
		this.viewTestimonial = (req, res, next) => {
			if (isPost(req)) {
				/** Sanitize Data **/
				req.body = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
				let testimonialId = (req.params.id) ? req.params.id : "";
	
				/** Configure testimonials unique conditions **/
				const testimonials = db.collection("testimonials");
				testimonials.findOne({
					_id: { $eq: ObjectId(testimonialId) },
					is_deleted: NOT_DELETED,
				},(err, result) => {
					if (err) return next(err);
					
					/** Set options for append image **/
					let imageOptions = {
						file_url: USERS_URL,
						file_path: USERS_FILE_PATH,
						result: [result],
						database_field: "image",
					};
					/** Upload testimonials image **/
					appendFileExistData(imageOptions).then(response => {
						if (response.status == STATUS_ERROR) {
							/** Send error response **/
							return res.send({
								status: API_STATUS_ERROR,
								message: [{ 'param': 'image', 'msg': response.message }],
								result  : {},
								error  : []
							});
						}
						

						res.send({
							status: API_STATUS_SUCCESS,
							message: "",
							result  : response.result[0],
							error  : []
						});
					}).catch(next);
				});
			} else {
				/** Send error response */
				res.send({
					"status"      : API_STATUS_ERROR,
					"error"       : [],
					"result"      : [],
					"message"	  : "Something going wrong please try again"
				});
			}
		};//End viewtestimonials()

	/**
	 * Function for add banners
	 *
	 * @param req 	As	Request Data
	 * @param res 	As	Response Data
	 * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.addTestimonial = (req, res, next) => {
		if (isPost(req)) {

			/** Sanitize Data */
			req.body = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
			/** Check validation */
			req.checkBody({
				'name': {
					notEmpty: true,
					errorMessage:"Please enter name"
				},
				'rating': {
					notEmpty: true,
					errorMessage: "Please enter rating"
				},
				'descripiton': {
					notEmpty: true,
					errorMessage: "Please enter description"
				},
			})

			/** parse Validation array  */
			let errors = parseValidation(req.validationErrors(), req);

			if (!req.files || !req.files.image) {
				if (!errors) errors = [];
				errors.push({ 'param': 'image', 'msg': "Please select image"});
			}
			if (errors) {
				/** Send error response */
				return res.send({
					status: STATUS_ERROR,
					message: errors,
				});
			}
			let testimonialImage = (req.files && req.files.image) ? req.files.image : {};
			let imageOptions = {
				'image': testimonialImage,
				'filePath': USERS_FILE_PATH
			};


			/** Upload testimonials image **/
			moveUploadedFile(req, res, imageOptions).then(imageResponse => {

				if (imageResponse.status == STATUS_ERROR) {
					/** Send error response **/
					return res.send({
						status: STATUS_ERROR,
						message: [{ 'param': 'image', 'msg': imageResponse.message }],
					});
				}




					/** Save testimonials details */
					const testimonials = db.collection('testimonials');
					testimonials.insertOne({
						name: req.body.name ? req.body.name : "",
						rating: req.body.rating ? Number(req.body.rating) : ACTIVE,
						descripiton: req.body.descripiton ? req.body.descripiton : "",
						image: imageResponse.fileName ? imageResponse.fileName : "",
						is_active : ACTIVE,
						is_deleted: NOT,
						created: getUtcDate(),
						modified: getUtcDate()
					}, (err, result) => {
						if (err) return next(err);
						
						res.send({
							status: STATUS_SUCCESS,
							message: "Testimonial has been added successfully",
							error : [],
							result : {}
						}); 
					});
				}, error => {
					/** Send error response */
					res.send({
						"status": STATUS_ERROR,
						"error"       : [],
						"result"      : [],
						"message"     : "Something going wrong please try again"
					});

			}).catch(next);
		} else {
			return res.send({
				"status"      : API_STATUS_ERROR,
				"message"     : "Something going wrong please try again",
				"error"       : [],
				"result"      : []
			});
		}
	};//End addtestimonials()


	/**
	* Function for delete testimonial
	*
	* @param req   As Request Data
	* @param res   As Response Data
	* @param next  As  Callback argument to the middleware function
	*
	* @return null
	*/
	this.deleteTestimonial = (req, res, next) => {
		/** Delete user*/
		let testimonialId = (req.params.id) ? req.params.id : "";
		const collection = db.collection("testimonials");
		collection.updateOne(
			{ _id: ObjectId(testimonialId) },
			{
				$set: {
					is_deleted: DELETED,
					deleted_at: getUtcDate(),
					modified: getUtcDate()
				}
			}, (err, result) => {
				if (err){
					return res.send({
						"status"      : API_STATUS_ERROR,
						"message"     : res.__("front.system.something_went_wrong"),
						"error"       : [],
						"result"      : []
					});
				}else{
					return res.send({
						"status"      : API_STATUS_SUCCESS,
						"message"     : "Testimonial has been deleted successfully",
						"error"       : [],
						"result" 	  : []
					});
				}
			}
		);
	};//End deleteUser()
}
module.exports = new Testimonials();
