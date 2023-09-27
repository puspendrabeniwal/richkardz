/** Model file path for current plugin **/
const modelPath = __dirname + "/model/order";
const order = require(modelPath);

/** Routing is used to save design contact **/
routes.post(API_URL+"design_contact", (req, res, next) => {
    order.saveDesignContact(req, res, next);
});

/** Routing is used to add **/
routes.all(API_URL + "testimonials/add", (req, res, next) => {
    order.addTestimonial(req, res, next);
});

/** Routing is used to edit **/
routes.all(API_URL + "testimonials/edit/:id", (req, res, next) => {
    order.editTestimonial(req, res, next);
});

/** Routing is used to delete **/
routes.get(API_URL+"delete/:id",(req,res,next)=>{
    order.deleteTestimonial(req,res,next);
});
