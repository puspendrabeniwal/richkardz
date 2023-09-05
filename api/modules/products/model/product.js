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
  this.productList = (req, res) => {
    if (isPost(req)) {
      let limit = req.body.length
        ? parseInt(req.body.length)
        : API_LISTING_LIMIT;
      let skip = req.body.start ? parseInt(req.body.start) : DEFAULT_SKIP;
      let productName = req.body.product_name ? req.body.product_name : "";
      let profession = req.body.profession ? req.body.profession : "";
      let cardType = req.body.card_type ? req.body.card_type : "";
      let price = req.body.price ? Number(req.body.price) : "";
      let discount = req.body.discount ? Number(req.body.discount) : "";

            let searchCondition = {}

      if (price) searchCondition["price"] = price;
      if (discount) searchCondition["discount"] = discount;
      if (profession) searchCondition["profession"] = profession;
      if (cardType) searchCondition["card_type"] = cardType;
      if (productName)
        searchCondition["product_name"] = new RegExp(productName, "i");

      let collection = db.collection("products");
      collection
        .find(searchCondition)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .toArray((err, result) => {
          if (!err) {
            return res.send({
              status: API_STATUS_SUCCESS,
              message: "",
              error: [],
              result: result,
            });
          } else {
            return res.send({
              status: API_STATUS_ERROR,
              message: res.__("front.system.something_went_wrong"),
              error: [],
              result: [],
            });
          }
        });
    } else {
      return res.send({
        status: API_STATUS_ERROR,
        message: res.__("front.system.something_went_wrong"),
        error: [],
        result: [],
      });
    }
  };

  /**
   * Function for add product
   *
   * @param req   As  Request Data
   * @param res   As  Response Data
   * @param next  As  Callback argument to the middleware function
   *
   * @return render/json
   */
  this.addProduct = (req, res) => {

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

    };
  this.addProductBack = (req, res) => {

    } 

    	/**
	 * Function for update product status
	 *
	 * @param req 	As 	Request Data
     * @param res 	As 	Response Data
     * @param next 	As 	Callback argument to the middleware function
	 *
	 * @return render/json
	 */
	this.updateProductStatus = (req,res)=>{

	};// end updateProductStatus()
}
module.exports = new Products();
