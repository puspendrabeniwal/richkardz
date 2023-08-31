const { log } = require("async");
const { ObjectId } = require("mongodb");

function Products() {
    /**
     * Function for product listing
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.productList = (req, res)=>{
        if (isPost(req)) {
            let limit = (req.body.length) ? parseInt(req.body.length) : API_LISTING_LIMIT;
            let skip = (req.body.start) ? parseInt(req.body.start) : DEFAULT_SKIP;
            let collection     = db.collection("products");
            collection.find({
                status : 1,
                // is_deleted : NOT_DELETED
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
                "result" : []
            });
        }
    }


    /**
     * Function for add product
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.addProduct = (req, res)=>{
        if(isPost(req)){
            let collection     = db.collection("products");
            /** Sanitize Data */
			req.body = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);

            console.log(req.body);
            console.log(req.files);
			/** Check validation */
			req.checkBody({
				'product_name': {
					notEmpty: true,
					errorMessage: res.__("Please enter product name")
				},
				'price': {
					notEmpty: true,
					errorMessage: res.__("Please enter price")
				},
                'discount': {
					notEmpty: true,
					errorMessage: res.__("Please enter discount")
				},
                'card_type': {
					notEmpty: true,
					errorMessage: res.__("Please enter card type")
				},
                'product_desc': {
					notEmpty: true,
					errorMessage: res.__("Please enter product description")
				},
                
			})
            /** parse Validation array  */
			let errors = parseValidation(req.validationErrors(), req);

			
			if (errors) {
				/** Send error response */
				return res.send({
					status: STATUS_ERROR,
					message: errors,
				});
			}
          

            let images = (req.files && req.files.images) ? req.files.images : {};
			let imageOptions = {
				'image': images,
				'filePath': PRODUCTS_FILE_PATH
			};

            // console.log(PRODUCTS_FILE_PATH,"PRODUCTS_FILE_PATH");
            // var multer  =   require('multer'); 
            
            // var storage =   multer.diskStorage({  
            //     destination: function (req, file, callback) {  
            //       callback(null, ".uploads/");  
            //     },  
            //     filename: function (req, file, callback) {  
            //         console.log(file,"file");
            //       callback(null, file.originalname);  
            //     }  
            //   });  

            //   console.log(storage.getFilename());
            //   var upload = multer(storage).single('images'); 
            //   upload(req,res,function(err) {  
            //     if(err) {  
            //         console.log(err,"err");
            //         return res.end("Error uploading file.");  
            //     }  
            //     res.end("File is uploaded successfully!");  
            // });  
                collection.insertOne({
                    /** add all product fields */
                    product_name	:	(req.body.product_name)?req.body.product_name:"",
                    price	        :	(req.body.price)?req.body.price:"",
                    discount	    :	(req.body.discount)?req.body.discount:"",
                    profession	    :	(req.body.profession)?req.body.profession:"",
                    card_type	    :	(req.body.card_type)?req.body.card_type:"",
                    product_desc	:	(req.body.product_desc)?req.body.product_desc:"",
                    status          :   ACTIVE,
                    is_feature      :   (req.body.is_feature)?req.body.is_feature:"",
                    is_new_release  :   (req.body.is_new_release)?req.body.is_new_release:"",
                    created_at 		:	getUtcDate(),
                    updated_at		: 	getUtcDate(),
                    // is_deleted : NOT_DELETED
                },(err,result)=>{
        
                    if(!err){
                    
                        return res.send({
                            "status"      : API_STATUS_SUCCESS,
                            "message"     : 'Product has been added successfully',
                            "error"       : [],
                            "result"      : {}
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
                "message"     : "invalid request",
                "error"       : [],
                "result" : []
            });
        }

    }
    this.addProductBack = (req, res)=>{
        if(isPost(req)){
            let collection     = db.collection("products");
            /** Sanitize Data */
			req.body = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
			/** Check validation */
			req.checkBody({
				'product_name': {
					notEmpty: true,
					errorMessage: res.__("Please enter product name")
				},
				'price': {
					notEmpty: true,
					errorMessage: res.__("Please enter price")
				},
                'discount': {
					notEmpty: true,
					errorMessage: res.__("Please enter discount")
				},
                'card_type': {
					notEmpty: true,
					errorMessage: res.__("Please enter card type")
				},
                'product_desc': {
					notEmpty: true,
					errorMessage: res.__("Please enter product description")
				},
                
			})
            /** parse Validation array  */
			let errors = parseValidation(req.validationErrors(), req);

			if (!req.files || !req.files.image) {
				if (!errors) errors = [];
				errors.push({ 'param': 'image', 'msg': res.__("Please select product image") });
			}
			if (errors) {
				/** Send error response */
				return res.send({
					status: STATUS_ERROR,
					message: errors,
				});
			}
            let productImage = (req.files && req.files.image) ? req.files.image : {};
			let imageOptions = {
				'image': productImage,
				'filePath': PRODUCT_FILE_PATH
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

            collection.insertOne({
                /** add all product fields */
                product_name	:	(req.body.product_name)?req.body.product_name:"",
                price	:	(req.body.price)?req.body.price:"",
                discount	:	(req.body.discount)?req.body.discount:"",
                profession	:	(req.body.profession)?req.body.profession:"",
                card_type	:	(req.body.card_type)?req.body.card_type:"",
                product_desc	:	(req.body.product_desc)?req.body.product_desc:"",
                status : 1,
                is_feature : (req.body.is_feature)?req.body.is_feature:"",
                is_new_release : (req.body.is_new_release)?req.body.is_new_release:"",
                product_image: imageResponse.fileName ? imageResponse.fileName : "",
                created_at 			:	getUtcDate(),
                updated_at			: 	getUtcDate(),
                // is_deleted : NOT_DELETED
            },(err,result)=>{
    
                if(!err){
                   
                    return res.send({
                        "status"      : API_STATUS_SUCCESS,
                        "message"     : 'Product has been added successfully',
                        "error"       : [],
                        "result"      : {}
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
        }).catch(next);
        }else{
            return res.send({
                "status"      : API_STATUS_ERROR,
                "message"     : "invalid request",
                "error"       : [],
                "result" : []
            });
        }

    }

    /**
     * Function for edit product
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.editProduct = (req, res)=>{
        if(isPost(req)){
            let productId = (req.params.id) ? req.params.id : '';
            console.log("productId DDDDD"+productId);
            let collection     = db.collection("products");
            /** Sanitize Data */
			req.body = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
			/** Check validation */
			req.checkBody({
				'product_name': {
					notEmpty: true,
					errorMessage: res.__("Please enter product name")
				},
				'price': {
					notEmpty: true,
					errorMessage: res.__("Please enter price")
				},
                'discount': {
					notEmpty: true,
					errorMessage: res.__("Please enter discount")
				},
                'card_type': {
					notEmpty: true,
					errorMessage: res.__("Please enter card type")
				},
                'product_desc': {
					notEmpty: true,
					errorMessage: res.__("Please enter product description")
				},
                
			})

               /** parse Validation array  */
			let errors = parseValidation(req.validationErrors(), req);
            if (errors) {
				/** Send error response */
				return res.send({
					status: STATUS_ERROR,
					message: errors,
				});
			}
            collection.updateOne({
                /** add all product fields */
                _id : ObjectId(productId)
            },{$set:{
                /** Add all field list which you want update */
                product_name	:	(req.body.product_name)?req.body.product_name:"",
                price	:	(req.body.price)?req.body.price:"",
                discount	:	(req.body.discount)?req.body.discount:"",
                profession	:	(req.body.profession)?req.body.profession:"",
                card_type	:	(req.body.card_type)?req.body.card_type:"",
                product_desc	:	(req.body.product_desc)?req.body.product_desc:"",
                is_feature : (req.body.is_feature)?req.body.is_feature:"",
                is_new_release : (req.body.is_new_release)?req.body.is_new_release:"",
                // product_image: imageResponse.fileName ? imageResponse.fileName : "",
                created_at 			:	getUtcDate(),
                updated_at			: 	getUtcDate(),
                modified_at : getUtcDate()
            }},(err,result)=>{
    
                if(!err){
                    
                    return res.send({
                        "status"      : API_STATUS_SUCCESS,
                        "message"     : 'Product has been updated successfully',
                        "error"       : [],
                        "result"      : {}
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
                "message"     : "invalid request",
                "error"       : [],
                "result" : []
            });
        }

    }


    /**
     * Function for product detail
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.viewProduct = (req, res)=>{
        let productId = (req.params.id) ? req.params.id : "";
        let collection     = db.collection("products");
        collection.findOne({
            _id : ObjectId(productId),
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
}
module.exports = new Products();