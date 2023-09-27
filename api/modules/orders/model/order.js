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
			/** Check validation **/
			req.checkBody({
				"title": {
					notEmpty: true,
					errorMessage: res.__("admin.testimonial.please_enter_title")
				},
				"subtitle": {
					notEmpty: true,
					errorMessage: res.__("admin.testimonial.please_enter_subtitle")
				},

			});

			/** parse Validation array  **/
			let errors = parseValidation(req.validationErrors(), req);
			if (errors) {
				/** Send error response **/
				return res.send({
					status: STATUS_ERROR,
					message: errors,
				});
			}
			let testimonialId = (req.params.id) ? req.params.id : "";

			/** Configure testimonials unique conditions **/
			const testimonials = db.collection("testimonials");
			testimonials.findOne({
				_id: { $ne: ObjectId(testimonialId) },
				is_deleted: NOT_DELETED,
			}, { projection: { _id: 1, title: 1, subtitle: 1, banner_image: 1 } },
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
								status: STATUS_ERROR,
								message: [{ 'param': 'image', 'msg': response.message }],
							});
						}
						/** Set update data **/
						let updateData = {
							modified: getUtcDate(),
							title: (req.body.title) ? req.body.title : "",
							subtitle: (req.body.subtitle) ? req.body.subtitle : "",

						};
						let bannerImage = response.fileName ? response.fileName : "";
						updateData.image = bannerImage ? bannerImage : oldimage;

						/** Update testimonial data **/
						testimonials.updateOne({ _id: ObjectId(testimonialId) }, { $set: updateData }, (updateErr, result) => {
							if (updateErr) return next(updateErr);
							
							res.send({
								status: STATUS_SUCCESS,
								message: res.__("admin.testimonial.details_has_been_updated_successfully"),
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
				"message"	  : res.__("admin.system.something_going_wrong_please_try_again")
			});
		}
	};//End edittestimonials()

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
				'title': {
					notEmpty: true,
					errorMessage: res.__("admin.testimonial.please_enter_title")
				},
				'subtitle': {
					notEmpty: true,
					errorMessage: res.__("admin.testimonial.please_enter_subtitle")
				},
			})

			/** parse Validation array  */
			let errors = parseValidation(req.validationErrors(), req);

			if (!req.files || !req.files.image) {
				if (!errors) errors = [];
				errors.push({ 'param': 'image', 'msg': res.__("admin.testimonial.please_select_image") });
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

				/** Set options **/
				let options = {
					title: req.body.title + "-" + req.body.subtitle,
					table_name: "testimonials",
					slug_field: "slug"
				};


				/** Make Slug */
				getDatabaseSlug(options).then(response => {
					/** Save testimonials details */
					const testimonials = db.collection('testimonials');
					testimonials.insertOne({
						title: req.body.title ? req.body.title : "",
						subtitle: req.body.subtitle ? req.body.subtitle : "",
						image: imageResponse.fileName ? imageResponse.fileName : "",
						slug: response && response.title ? response.title : "",
						is_deleted: NOT,
						default_language_id: DEFAULT_LANGUAGE_MONGO_ID,
						created: getUtcDate(),
						modified: getUtcDate()
					}, (err, result) => {
						if (err) return next(err);
						
						res.send({
							status: STATUS_SUCCESS,
							message: res.__("admin.testimonial.testimonial_has_been_added_successfully")
						});
					});
				}, error => {
					/** Send error response */
					res.send({
						status: STATUS_ERROR,
						"error"       : [],
						"result"      : [],
						message: [{ param: ADMIN_GLOBAL_ERROR, msg: res.__("admin.system.something_going_wrong_please_try_again") }]
					});
				}).catch(next);
			}).catch(next);
		} else {
			return res.send({
				"status"      : API_STATUS_ERROR,
				"message"     : res.__("front.system.something_went_wrong"),
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
