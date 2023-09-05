/** Model file path for current plugin **/
const modelPath     = 	__dirname+"/model/faqs";
const adminFaqs      =   require(modelPath);

/** Routing is used to get faqs list **/
routes.all(API_URL+'faqs',(req, res,next) => {
    adminFaqs.getFaqsList(req, res,next);
});

/** Routing is used to get faqs list **/
routes.all(API_URL+'faqs/view/:id',(req, res,next)=>{
    adminFaqs.getFaqsDetails(req, res,next);
});

/** Routing is used to add faqs **/
routes.all(API_URL+"faqs/add",(req,res,next) => {
    adminFaqs.addFaqs(req,res,next);
});

/** Routing is used to edit faqs **/
routes.all(API_URL+"faqs/edit/:id",(req,res,next) => {
    adminFaqs.editFaqs(req,res,next);
});