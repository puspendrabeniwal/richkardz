/** Model file path for current plugin **/
const modelPath     =	__dirname+"/model/bulk_order";
const bulkOrder	    =   require(modelPath);

/** Routing is used to get bulk orders*/
routes.all(API_URL+"bulk_orders",(req, res)=>{
    console.log("dsfdsfsdfsd hello user")
    bulkOrder.bulkOrderList(req, res);
});

/** Routing is used to get order detail*/
routes.all(API_URL+"bulk_order/view/:id",(req, res)=>{
    bulkOrder.viewBulkOrder(req, res);
});

