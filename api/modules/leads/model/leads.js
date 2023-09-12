
const { ObjectId } = require("mongodb");

function Leads() {
    /**
     * Function for lead listing
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.LeadsList = (req, res)=>{
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

            let collection     = db.collection("enquiries");
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
     * Function for le detail
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.viewBulkOrder = (req, res)=>{
        let id = (req.params.id) ? req.params.id : "";
        let collection     = db.collection("enquiries");
        collection.findOne({
            _id : ObjectId(id),
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
module.exports = new Leads();