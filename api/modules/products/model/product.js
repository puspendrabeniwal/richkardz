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
                // is_active : ACTIVE,
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
            collection.insetOne({
                /** add all product fields */
                is_active : ACTIVE,
                is_deleted : NOT_DELETED
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
            let collection     = db.collection("products");
            collection.updateOne({
                /** add all product fields */
                is_active : ACTIVE,
                is_deleted : NOT_DELETED,
                _id : ObjectId(productId)
            },{$set:{
                /** Add all field list which you want update */
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
            is_active : ACTIVE
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