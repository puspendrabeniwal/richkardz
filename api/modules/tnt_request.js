
const { ObjectId } = require("mongodb");

function TntRequest() {
    /**
     * Function for warranty claim listing
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.warrantyClaimList = (req, res)=>{
        if (isPost(req)) {
            let limit = (req.body.length) ? parseInt(req.body.length) : API_LISTING_LIMIT;
            let skip = (req.body.start) ? parseInt(req.body.start) : DEFAULT_SKIP;
            let name = (req.body.name) ? req.body.name : "";
            let utm = (req.body.utm) ? req.body.utm : "";
            let businessType = (req.body.business_type) ? req.body.business_type : "";
            let email = (req.body.email) ? req.body.email : "";
            let phoneNumber = (req.body.phone_number) ? req.body.phone_number : "";


            let searchCondition = {}
            if(email) searchCondition['email'] = email;
            if(phoneNumber) searchCondition['phone_number'] = phoneNumber;
            if(created) searchCondition['created'] = created;
            if(name) searchCondition['name'] = new RegExp(name, "i");
            if(utm) searchCondition['utm'] = utm
            if(businessType) searchCondition['business_type'] = businessType

            let collection     = db.collection("warranty_claim");
            collection.find(searchCondition).sort({created: -1}).skip(skip).limit(limit).toArray((err,result)=>{
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
     * Function for return/replacement listing
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.returnReplacementList = (req, res)=>{
        if (isPost(req)) {
            let limit = (req.body.length) ? parseInt(req.body.length) : API_LISTING_LIMIT;
            let skip = (req.body.start) ? parseInt(req.body.start) : DEFAULT_SKIP;
            let name = (req.body.name) ? req.body.name : "";
            let utm = (req.body.utm) ? req.body.utm : "";
            let businessType = (req.body.business_type) ? req.body.business_type : "";
            let email = (req.body.email) ? req.body.email : "";
            let phoneNumber = (req.body.phone_number) ? req.body.phone_number : "";


            let searchCondition = {}
            if(email) searchCondition['email'] = email;
            if(phoneNumber) searchCondition['phone_number'] = phoneNumber;
            if(created) searchCondition['created'] = created;
            if(name) searchCondition['name'] = new RegExp(name, "i");


            let collection     = db.collection("return_replacement_request");
            collection.find(searchCondition).sort({created: -1}).skip(skip).limit(limit).toArray((err,result)=>{
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
     * Function for refund request listing
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.refundRequestList = (req, res)=>{
        if (isPost(req)) {
            let limit = (req.body.length) ? parseInt(req.body.length) : API_LISTING_LIMIT;
            let skip = (req.body.start) ? parseInt(req.body.start) : DEFAULT_SKIP;
            let name = (req.body.name) ? req.body.name : "";
            let utm = (req.body.utm) ? req.body.utm : "";
            let businessType = (req.body.business_type) ? req.body.business_type : "";
            let email = (req.body.email) ? req.body.email : "";
            let phoneNumber = (req.body.phone_number) ? req.body.phone_number : "";


            let searchCondition = {}
            if(email) searchCondition['email'] = email;
            if(phoneNumber) searchCondition['phone_number'] = phoneNumber;
            if(created) searchCondition['created'] = created;
            if(name) searchCondition['name'] = new RegExp(name, "i");

            let collection     = db.collection("refund_request");
            collection.find(searchCondition).sort({created: -1}).skip(skip).limit(limit).toArray((err,result)=>{
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
     * Function for cancel request listing
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.cancelRequestList = (req, res)=>{
        if (isPost(req)) {
            let limit = (req.body.length) ? parseInt(req.body.length) : API_LISTING_LIMIT;
            let skip = (req.body.start) ? parseInt(req.body.start) : DEFAULT_SKIP;
            let name = (req.body.name) ? req.body.name : "";
            let email = (req.body.email) ? req.body.email : "";
            let phoneNumber = (req.body.phone_number) ? req.body.phone_number : "";


            let searchCondition = {}
            if(email) searchCondition['email'] = email;
            if(phoneNumber) searchCondition['phone_number'] = phoneNumber;
            if(created) searchCondition['created'] = created;
            if(name) searchCondition['name'] = new RegExp(name, "i");

            let collection     = db.collection("cancel_request");
            collection.find(searchCondition).sort({created: -1}).skip(skip).limit(limit).toArray((err,result)=>{
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


}
module.exports = new TntRequest();