
/** Model file path for current plugin **/
const modelPath     =	__dirname+"/model/auth";
const auth	        =   require(modelPath);

/** Routing is used to get user login **/
routes.post(API_URL+"auth",(req,res,next)=>{
    auth.login(req,res,next);
});

/** Routing is used to update password **/
routes.post(API_URL+"change_password",(req,res,next)=>{
    auth.changePassword(req,res,next);
});

/** Routing is used to get user detail **/
routes.all(API_URL+"getUserDetail",(req,res,next)=>{
    auth.getUserDetail(req,res,next);
});

/** Routing is used to get user detail **/
routes.all(API_URL+"updateUserProfile",(req,res,next)=>{
    auth.updateUserDetail(req,res,next);
});