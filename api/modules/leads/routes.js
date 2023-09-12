/** Model file path for current plugin **/
const modelPath     =	__dirname+"/model/leads";
const leads	    =   require(modelPath);

/** Routing is used to get leads*/
routes.all(API_URL+"leads/:type",(req, res)=>{
    leads.LeadsList(req, res);
});

// /** Routing is used to get order detail*/
// routes.all(API_URL+"bulk_order/view/:id",(req, res)=>{
//     leads.viewBulkOrder(req, res);
// });

/** Routing is used to get order detail*/
routes.all(API_URL+"leads/delete/:id",(req, res)=>{
    leads.deleteLead(req, res);
});

