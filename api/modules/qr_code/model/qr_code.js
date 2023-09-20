const { log } = require("async");
const { ObjectId } = require("mongodb");

function QRCode() {
    /**
     * Function for product listing
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.qrCodeList = (req, res)=>{
        if (isPost(req)) {
            let limit = (req.body.length) ? parseInt(req.body.length) : API_LISTING_LIMIT;
            let skip = (req.body.start) ? parseInt(req.body.start) : DEFAULT_SKIP;

            let uniqueCode = (req.body.unique_code) ? req.body.unique_code : "";
            let companyName = (req.body.company_name) ? req.body.company_name : "";

            let searchCondition = {}

            if(uniqueCode) searchCondition['unique_code'] = uniqueCode;
            if(companyName) searchCondition['company_name'] = companyName;

            let collection     = db.collection("qr_code");
            collection.find(searchCondition).sort({created_at: -1}).skip(skip).limit(limit).toArray((err,result)=>{
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
    this.addQrCode = (req, res)=>{
        if(isPost(req)){
            let collection     = db.collection("qr_code");
            /** Sanitize Data */
			req.body = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);

            console.log(req.body);

			/** Check validation */
			req.checkBody({
				'company_name': {
					notEmpty: true,
					errorMessage: res.__("Please enter product name")
				}
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
          
            collection.insertOne({
                "user_id": null,
                "company_name": null,
                "company_slug": null,
                "business_type": 0,
                "name": null,
                "phone_number": null,
                "email_address": null,
                "gender": null,
                "employee_code": null,
                "blood_group": null,
                "designation": null,
                "location": null,
                "card_printing_id": null,
                "manual_card_printing_id": null,
                "combo_card_printing_id": null,
                "unique_code": "ATRC-88",
                "business_card_url": "https://richkardz.com/business-card/ATRC-88",
                "code_url": "/media/qrcode/ATRC-88.png",
                "status": 1,
                "is_hide": 0,
                "created_at" 		:	getUtcDate(),
                "updated_at"		: 	getUtcDate(),
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
}
module.exports = new QRCode();