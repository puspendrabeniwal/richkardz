/** Model file path for current plugin **/
const modelPath = __dirname + "/model/testimonials";
const testimonials = require(modelPath);

/** Routing is used to get list **/
routes.all(API_URL+"testimonials", (req, res, next) => {
    testimonials.getList(req, res, next);
});

/** Routing is used to add **/
routes.all(API_URL + "testimonials/add", (req, res, next) => {
    testimonials.addTestimonial(req, res, next);
});

/** Routing is used to edit **/
routes.all(API_URL + "testimonials/edit/:id", (req, res, next) => {
    testimonials.editTestimonial(req, res, next);
});

/** Routing is used to delete **/
routes.get(API_URL+"delete/:id",(req,res,next)=>{
    testimonials.deleteTestimonial(req,res,next);
});
