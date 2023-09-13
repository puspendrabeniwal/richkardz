/** Model file path for current plugin **/
const modelPath     =	__dirname+"/model/tnt_request";
const tntRequest	    =   require(modelPath);

/** Routing is used to get return list*/
routes.all(API_URL+"return_replacement",(req, res)=>{
    tntRequest.returnReplacementList(req, res);
});

/** Routing is used to get warranty claim list*/
routes.all(API_URL+"warranty_claim",(req, res)=>{
    tntRequest.warrantyClaimList(req, res);
});

/** Routing is used to get refund request list*/
routes.all(API_URL+"refund_request",(req, res)=>{
    tntRequest.refundRequestList(req, res);
});

/** Routing is used to get cancel request list*/
routes.all(API_URL+"cancel_request",(req, res)=>{
    tntRequest.cancelRequestList(req, res);
});

