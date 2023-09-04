/** Model file path for current plugin **/
const modelPath     = 	__dirname+"/model/cms";
const adminCms      =   require(modelPath);

/** Routing is used to get cms list **/
routes.all(API_URL+'cms',(req, res,next) => {
    adminCms.getCmsList(req, res,next);
});

/** Routing is used to get cms list **/
routes.all(API_URL+'cms/view/:id',(req, res,next)=>{
    adminCms.getCmsDetails(req, res,next);
});

/** Routing is used to add cms **/
routes.all(API_URL+"cms/add",(req,res,next) => {
    adminCms.addCms(req,res,next);
});

/** Routing is used to edit cms **/
routes.all(API_URL+"cms/edit/:id",(req,res,next) => {
    adminCms.editCms(req,res,next);
});