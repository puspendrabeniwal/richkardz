const { log } = require("async");
const { ObjectId } = require("mongodb");

function BulkOrders() {
    /**
     * Function for product listing
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.bulkOrderList = (req, res)=>{
        if (isPost(req)) {
            let limit = (req.body.length) ? parseInt(req.body.length) : API_LISTING_LIMIT;
            let skip = (req.body.start) ? parseInt(req.body.start) : DEFAULT_SKIP;
            let name = (req.body.name) ? req.body.name : "";
            let companyName = (req.body.company_name) ? req.body.company_name : "";
            let noOfCard = (req.body.no_of_card_you_want) ? Number(req.body.no_of_card_you_want) : "";
            let email = (req.body.email) ? req.body.email : "";
            let phoneNumber = (req.body.phone_number) ? req.body.phone_number : "";


            let searchCondition = {}
            if(email) searchCondition['email'] = email;
            if(phoneNumber) searchCondition['phone_number'] = phoneNumber;
            if(noOfCard) searchCondition['no_of_card_you_want'] = noOfCard;
            if(name) searchCondition['name'] = new RegExp(name, "i");
            if(companyName) searchCondition['company_name'] = new RegExp(companyName, "i");

            let collection     = db.collection("bulk_orders");
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
     * Function for product detail
     *
     * @param req   As  Request Data
     * @param res   As  Response Data
     * @param next  As  Callback argument to the middleware function
     *
     * @return render/json
     */
    this.viewBulkOrder = (req, res)=>{
        let id = (req.params.id) ? req.params.id : "";
        let collection     = db.collection("bulk_orders");
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
module.exports = new BulkOrders();