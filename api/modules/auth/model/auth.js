const bcrypt          = require("bcryptjs");
const { ObjectId }    = require("mongodb");
const asyncForEachOf  = require("async/forEachOf");
const asyncParallel   = require("async/parallel");
const asyncEach       = require("async/each");

function Auth(req, res) {

  /** Function is used to user login **/
  this.login = async(req, res)=> {

    req.body          = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
    let username      = (req.body.username) ? req.body.username : '';
    let password      = (req.body.password) ? req.body.password : '';
    // let loginType     = (req.body.loginType) ? req.body.loginType : '';
    if(!username){
      /** Check body */
      req.checkBody({	
        "username" :{
          notEmpty		:true,
          errorMessage	: "Please enter username"
        },
        "password":{
          notEmpty		:true,
          errorMessage	: "Please enter password"
        },
      });
    }

    let errors  = parseValidationFront(req.validationErrors());
    errors      = (errors && Object.keys(errors).length>0) ? errors :  {};

    if(Object.keys(errors).length == 0){
      let searchCondition       = { };
      searchCondition['username']  = { $regex: new RegExp("^" + username, "i") };
      searchCondition['role_id']  = 1;

      /** get user */
      let collection = db.collection('users');
      collection.findOne(searchCondition, async (err, result)=>{
        let userDetail = (result && Object.keys(result).length > NOT) ? result :{};
        if(err) return next(err);
          if(Object.keys(userDetail).length == NOT){
            return res.send({
              status		:	API_STATUS_ERROR,
              message		:	"Invalid login credentials.",
              result    : {},
              errors		:	{},
            });
          }

          /** Compare password */
          const bcrypt = require("bcryptjs");
          bcrypt.compare(password, result.password, async (err, isMatch) => {
            if(result && Object.keys(result).length > NOT && isMatch){

              let response= {
                status          : API_STATUS_SUCCESS,
                message         : "Logged In",
                result          : {},
                token           : '',
                errors		      :	{},
              };

                if(Object.keys(result).length == NOT){
                  return res.send({
                    status		      :	API_STATUS_ERROR,
                    message		      :	"Invalid login credentials.",
                    result          : {},
                    errors		      :	{},
                  })
                } 
                /*** End user detail */
                
                let data      = {user_key : result._id, email : result.email}; 
                let token     = generateJWT(data);
                response['token']   = token;
                response['result']  = {_id : result._id, role:result.role};
              
              response['errors']   = {};
              return res.send(response);
            }else{
              return res.send({
                status		:	API_STATUS_ERROR,
                message		:	"Invalid login credentials",
                result    : {},
                errors		:	{},
              });
            }
          }) 
        
      })
    }else{
      return res.send({
        status		:	API_STATUS_ERROR,
        message		:	'Invalid login credentials',
        result    : {},
        errors		:	errors,
      });
    }
  }


  /** Function is used to user signup **/
  // this.signup = async (req, res, next)=> {
  //   req.body  = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);

  //   /*** Common validation for all types of user */
  //   req.checkBody({	
  //     "email":{
  //       notEmpty		:true,
  //       isEmail			:{
  //         errorMessage:'The input is not valid E-mail!'
  //       },
  //       errorMessage	:'Please input your email!',
  //     },
  //     "password":{
  //       // isLength		:{
  //       //   options    : {min : PASSWORD_MIN_LENGTH , max : PASSWORD_MAX_LENGTH},
  //       //   errorMessage:res.__("front.user.password_should_be_6_characters_long")
  //       // },
  //       // matches	 : {
  //       //   options    	: PASSWORD_ALPHANUMERIC_REGEX,
  //       //   errorMessage:res.__("front.user.password.it_should_be_alphanumeric")
  //       // },
  //       notEmpty		:true,
  //       errorMessage	:'Please input your Password!'
  //     },
  //     "confirm_password":{ 
  //       // isLength		:{
  //       //   options    : {min :PASSWORD_MIN_LENGTH,  max : PASSWORD_MAX_LENGTH},
  //       //   errorMessage:res.__("front.user.password.it_should_be_6_characters_long")
  //       // },
  //       // matches	 : {
  //       //   options    	: PASSWORD_ALPHANUMERIC_REGEX,
  //       //   errorMessage:res.__("front.user.password.it_should_be_alphanumeric")
  //       // },
  //       notEmpty : true,
  //       errorMessage	: 'Please input your confirm password!'
  //     },
  //   });
    
  //   let email 					= (req.body.email)						 ?	req.body.email:'';
  //   let password 				= (req.body.password)					 ?	req.body.password:'';
  //   let confirmPassword = (req.body.confirm_password)  ?	req.body.confirm_password:'';
  //   let emailVerified   = (req.body.emailVerified)      ?	req.body.emailVerified:'';
  //   let encryptPassword = bcrypt.hashSync(password, BCRYPT_PASSWORD_SALT_ROUNDS);

  //   /** Match password with confirm password */
  //   if (password && confirmPassword) {
  //     req.checkBody("confirm_password", "Password and confirm password does not matched.").equals(req.body.password);
  //   }

  //   let errors  = parseValidationFront(req.validationErrors());
  //   errors      = (errors && Object.keys(errors).length>0) ? errors :  {};

  //   /** user email unique options */
  //   if(email){
  //     let emailUniqueOptions = {
  //       table_name  : "users",
  //       field_value : email,
  //       field_name  : 'email'
  //     };
  
  //     let isEmailUnique  = await checkUniqueValue(emailUniqueOptions);
  //     if(isEmailUnique && isEmailUnique.status == STATUS_ERROR){
  //       errors['name'] = 'email'
  //       errors['errors'] = ['Email is already in use, please try something different.']
  //     }
  //   }
    
  //   if(errors && Object.keys(errors).length == NOT){
      
  //     /** get string */
  //     getRandomString(VALIDATE_STRING_ROUND).then(responseString=>{
  //       let validateString   = (responseString.result) ? responseString.result : '';
  //       let insertData = {
  //         email						:	email,
  //         password				:	encryptPassword,
  //         emailVerified		:	(emailVerified) ? VERIFIED : NOT_VERIFIED,
  //         validateString  : validateString,
  //         created					: getUtcDate(),
  //         linkExpired			:	new Date(),
  //         currency        : 5
  //       };
        
  //       const users	=	db.collection('users');
  //       users.insertOne(insertData, (error,result)=>{
  //         if(error) return next();
  //         if(emailVerified == ACTIVE){
  //           validateString = result.insertedId
  //         }else{
  //           /***Send mail */
  //           // let validateURL  = WEBSITE_API_URL+'/email_verification/'+validateString;
  //           let emailTemplate = String(buildEmailValidationTemplate(WEBSITE_API_URL, validateString))
  //           let emailOptions = {
  //             action: "registration",
  //             to: email,
  //             subject: "Quibble RM - Email Validation",
  //             rep_array: ["Guest", emailTemplate, emailTemplate],
  //           };
  //           sendMail(req, res, emailOptions);
  //         }

  //         /*** return success */ 
  //         return res.send({
  //           status		:	API_STATUS_SUCCESS,
  //           message		:	'',
  //           result    : {validateString : validateString},
  //           error		  :	{},
  //         });
  //       })
  //     }).catch(next);
  //   }else{
  //     res.send({
  //       status	:	API_STATUS_ERROR,
  //       errors	:	errors,
  //       result  : '',
  //       message : ''
  //     });
  //   }
  // }

  /** Function is used to resend email **/
  this.resendEmail = async(req, res, next)=> {
    let string    = (req.body.validate_string) ? req.body.validate_string : '';

    /** Invalid Request */
    if(!string) return res.send({  
      status		:	API_STATUS_ERROR,
      message		:	"Invalid Request",
      result    : {},
      errors		:	{},
    })

    /*** Get random string */
    await getRandomString(VALIDATE_STRING_ROUND).then(responseString=>{
      let validateString   = (responseString.result) ? responseString.result : '';

      /** search condition */
      let conditionSearch = {emailVerified : NOT_VERIFIED}; 
      conditionSearch['validateString'] = string;

      /** update condition */
      let conditionUpdate = {};
        conditionUpdate['validateString']  = validateString;
        conditionUpdate['linkExpired']     = new Date();

      let collection = db.collection('users');
      collection.findOneAndUpdate(conditionSearch,{$set:conditionUpdate},{"projection": {full_name:1, email:1}}, (err, result)=>{
        if(!err && result && result.lastErrorObject.updatedExisting  == true){
            /** Send email */
            let validateURL =  WEBSITE_API_URL+'/email_verification/'+validateString;
            let emailOptions = {
              action        : 'registration',
              to            : result.value.email,
              subject       : 'Quibble RM - Email Validation',
              rep_array     : ['Guest', validateURL, validateURL]
            };
            sendMail(req, res, emailOptions);

            /*** return success */
            return res.send({
              status		:	API_STATUS_SUCCESS,
              message		:	'A validation link has been sent on your registered email. Kindly check your email and click on the link to validate your account.',
              result    : {},
              errors	  :	{},
            });
        }else{
          /*** return error */
          return res.send({
            status		:	API_STATUS_ERROR,
            message		:	"This email does not exist in our database",
            result    : {},
            errors		:	[],
          });
        }
      });
    }).catch(next); 
  }

  /** Function is used to verify email **/
  this.emailVerification = (req, res, next)=> {
    let validateString   = (req.params.validate_string)  ? req.params.validate_string : '';


    /** search condition */
    let conditionSearch = {};
    conditionSearch['validateString'] = validateString;

    /** update condition */
    let conditionUpdate = {};
    conditionUpdate['validateString']  = null;
    conditionUpdate['emailVerified']  = VERIFIED;

    let collection = db.collection('users');
    collection.findOneAndUpdate(conditionSearch,{$set:conditionUpdate},{"projection": {full_name:1, email:1}},(err, result)=>{
      if(!err && result && result.lastErrorObject.updatedExisting  == true){
        let userId = (result.value._id) ? result.value._id : ''
        return res.redirect(WEBSITE_URL+'select_pms?string='+userId+'&&status=success&&message=email-verified');
        // return res.redirect(WEBSITE_FRONT_URL+'/select_pms/'+userRole+'/email?status=success&&message=email-verified')
      }else{
        return res.redirect(WEBSITE_URL+'email_verification?string='+validateString+'&&status=error&&message=link-expired')
        // return res.redirect(WEBSITE_FRONT_URL+'/user/'+userRole+'/email?status=error&&message=link-expired')
      }
    });
  };

  /** Function is used to update user profile **/
  this.profileSetup = async (req, res, next)=> {
    req.body    = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
    let pms     = (req.body.pms) ? req.body.pms : '';
    let string  = (req.body.string) ? req.body.string : '';
    let apiKey  = (req.body.api_key) ? req.body.api_key : '';
    let code    = (req.body.code) ? req.body.code : null;
    let type    = (req.body.type) ? req.body.type : '';
    let username    = (req.body.username) ? req.body.username : '';
    let password    = (req.body.password) ? req.body.password : '';
    let conditionUpdate = {pms_info : {}};

    if(!string || string == 'undefined'){
      /*** return success */
      return res.send({
        status		:	API_STATUS_ERROR,
        message		:	'Invalid Request!',
        result    : {},
        errors	  :	{},
      });
    }

    if(!type){
      req.checkBody({	
        "pms":{
          notEmpty		:true,
          errorMessage	:"Please select PMS!",
        },
      })
    }

    if(type && pms == "Harmonics" || type && pms == "Guesty"){
    }
    else
    {
      req.checkBody({	
        "api_key":{
          notEmpty		:true,
          errorMessage	:"Please enter API key",
        }
      })
    }
    

    if(pms == "Harmonics"){
      req.checkBody({	
        "username":{
          notEmpty		:true,
          errorMessage	:"Please enter username"
        },
        "password":{
          notEmpty		:true,
          errorMessage	:"Please enter password"
        },
      })
    }

    if(pms == "Guesty"){
      req.checkBody({	
        "username":{
          notEmpty		:true,
          errorMessage	:"Please enter username"
        },
        "password":{
          notEmpty		:true,
          errorMessage	:"Please enter password"
        },
      })
    }

    if(pms == "Hostaway"){
      req.checkBody({	
        "code":{
          notEmpty		:true,
          errorMessage	:"Please enter account ID"
        },
        "api_key":{
          notEmpty		:true,
          errorMessage	:"Please enter API key"
        },
      })
    }
    
    let errors  = parseValidationFront(req.validationErrors());
    errors      = (errors && Object.keys(errors).length>0) ? errors :  {};

    /** Check errors */
    if(Object.keys(errors).length == NOT){
      if(code || pms == "Harmonics"){
        let updateToken = (request, response)=> {
          console.log(response, "response");
          if(response && pms === "Harmonics" || response && pms === "Guesty"){
            
            if(response.apiToken){
              conditionUpdate['pms_info']['username'] =  username;
              conditionUpdate['pms_info']['password'] = password;
              conditionUpdate['pms_info']['api_key']  = response.apiToken;
            }else{
              /*** return error */
              return res.send({
                status		:	API_STATUS_ERROR,
                message		:	'Unauthorized user',
                result    : {},
                error		  :	{}
              });
            }
            updateUserPMS(req, res, conditionUpdate)
          }else{
            if(response && response.access_token){
              conditionUpdate['pms_info']['code'] =  code;
              conditionUpdate['pms_info']['api_key'] = response.access_token;
              updateUserPMS(req, res, conditionUpdate)
            }else{
              /*** return error */
              return res.send({
                status		:	API_STATUS_ERROR,
                message		:	'Unauthorized user',
                result    : {},
                error		  :	{}
              });
            }
          }
        }
        if(pms === "MyVR") await myvr().auth.token({client_secret : CLIENT_SECRET_MYVR, code : code, grant_type : "authorization_code"},updateToken)           
        if(pms === "OwnerRez") await ownerRez().auth.token({grant_type : "authorization_code", code : code},updateToken)           
        if(pms === "Hostaway") await hostaway().auth.getToken({grant_type : "client_credentials", client_id : Number(code), client_secret : apiKey, scope : 'general'},updateToken)           
        if(pms === "Harmonics") await resHarmonics().auth.getToken({username : username, password : password},updateToken)           
      }else if(code || pms == "Guesty"){
          conditionUpdate['pms_info']['username'] =  username;
          conditionUpdate['pms_info']['password'] = password;
          conditionUpdate['pms'] = pms;
          updateUserPMS(req, res, conditionUpdate)
      }
      else{
        conditionUpdate['pms'] = pms;
        conditionUpdate['pms_info']['api_key'] = apiKey;
        updateUserPMS(req, res, conditionUpdate)
      }
    }else{
      /*** return error */
      return res.send({
        status		:	API_STATUS_ERROR,
        message		:	'',
        result    : {},
        error		  :	errors,
      });
    }
  }  

  let updateUserPMS = (req, res, conditionUpdate)=>{
    let string  = (req.body.string) ? req.body.string : '';
    let type    = (req.body.type) ? req.body.type : '';
    let pms    = (req.body.pms) ? req.body.pms : '';
    console.log(pms,'pms');
    let collection  = db.collection('users');
    collection.findOneAndUpdate({_id : ObjectId(string)},{$set:conditionUpdate},{"projection": {full_name:1, email:1}}, (err, result)=>{
      if(!err && result && result.lastErrorObject.updatedExisting  == true){
        return res.send({
          status		:	API_STATUS_SUCCESS,
          message		:	(!type && pms != "MyVr") ? "PMS detail has been updated successfully." : "You have successfully registered on QuibbleRM.",
          result    : {string: string},
          errors		:	{},
        });
      }else{
        return res.send({
          status		:	API_STATUS_ERROR,
          message		:	"Invalid credentials",
          result    : {string: string},
          errors		:	{},
        });
      }
    });
  }

  /** Function is used to send otp or email to reset password **/
  this.forgotPassword = async (req, res, next)=> {
    req.body      = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
    let email     = (req.body.email) ? req.body.email : '';

    req.checkBody({	
      "email":{
        notEmpty		:true,
        isEmail			:{
          errorMessage:res.__("admin.user.please_enter_a_valid_email")
        },
        errorMessage	:res.__("admin.user.please_enter_an_email"),
      },
    })

    let errors  = parseValidationFront(req.validationErrors());
    errors      = (errors && Object.keys(errors).length>0) ? errors :  {};

    /** Check errors */
    if(Object.keys(errors).length == NOT){

      /*** Get random string */
      await getRandomString(VALIDATE_STRING_ROUND).then(responseString=>{
        let validateString   = (responseString.result) ? responseString.result : '';

        /** search condition */
        let searchCondition       = { is_deleted : NOT_DELETED};
        searchCondition['email']  = { $regex: new RegExp("^" + email, "i") }

        /** update condition */
        let conditionUpdate = {};
        conditionUpdate['validate_string']  = validateString;

        let collection = db.collection('users');
        collection.findOneAndUpdate(searchCondition,{$set:conditionUpdate},{"projection": {full_name:1, email:1}}, (err, result)=>{
          if(!err && result && result.lastErrorObject.updatedExisting  == true){

            /*** Send an email */
            let validateURL     = WEBSITE_FRONT_URL+'/user/reset-password/?validate_string='+validateString;
            let emailOptions = {
              action      : 'forgot_password',
              to          : result.value.email,
              rep_array   : [result.value.full_name, validateURL, validateURL]
            };
            sendEmail(req, res,emailOptions);
            
            /*** return success */
            return res.send({
              status		:	API_STATUS_SUCCESS,
              message		:	res.__("front.user.link_has_been_sent_on_your_registered_email"),
              result    : {validate_string : validateString},
              error		  :	[],
            });
          }else{
            /*** return error */
            return res.send({
              status		:	API_STATUS_ERROR,
              message		:	res.__("front.user.email_does_not_exist_in_our_database"),
              result    : {},
              error		  :	[],
            });
          }
        });
      }).catch(next);
    }else{
      /*** return error */
      return res.send({
        status		:	API_STATUS_ERROR,
        message		:	'',
        result    : {},
        error		  :	errors,
      });
    }
  }




  /**
   * Function for get country data list
   *
   * @param req  As Request Data
   * @param res  As Response Data
   * @param next As Next Data
   *
   * @return render/json
  */
  this.getCountryData = async(req, res,next)=>{
      req.body        = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
      const country  = db.collection("country");      
      asyncParallel({
            countryPhoneCodeList : (callback) => {
              country.aggregate([
              {$project:{
                _id   : 0,
                label : "$phonecode",
                value : "$id",
              }}
              ]).toArray((err, result) => {
                callback(err, result);
              });
            },
            countryCurrencyList : (callback) => {
              country.aggregate([
              {$project:{
                _id   : 0,
                currency : "$currency",
                currency_symbol : "$currency_symbol",
                value : "$id",
              }}
              ]).toArray((err, result) => {
                let newArray  = []
              
                asyncEach(result, async (records, childCallback) =>{
                  newArray.push({
                    label : records.currency+' ('+records.currency_symbol+')',
                    value : records.value
                  })
                   return childCallback();
                }, function() {
                  callback(err, newArray)

                });
              });
            },
            countryCurrencyNameList : (callback) => {
              country.aggregate([
              {$project:{
                _id   : 0,
                currency : "$currency",
                currency_symbol : "$currency_symbol",
                value : "$id",
              }}
              ]).toArray((err, result) => {
                let newArray  = []
              
                asyncEach(result, async (records, childCallback) =>{
                  newArray.push({
                    label : records.currency,
                    value : records.value
                  })
                   return childCallback();
                }, function() {
                  callback(err, newArray)

                });
              });
            },
            countryList : (callback) => {
              country.aggregate([
              { $lookup:
                 {
                   from: "state",
                   let: { countryId: "$id"},
                   pipeline: [
                        { $match:
                            { $expr:
                                { $and:
                                    [
                                       { $eq: ["$country_id", "$$countryId" ] }
                                    ]
                                }
                            }
                        },
                        {$project:{
                            _id   : 0,
                            label : "$name",
                            value : "$id",
                        }},
                        { $lookup:
                             {
                               from: "city",
                               let: { stateId: "$value"},
                               pipeline: [
                                    { $match:
                                        { $expr:
                                            { $and:
                                                [
                                                   { $eq: ["$state_id", "$$stateId" ] }
                                                ]
                                            }
                                        }
                                    },
                                    {$project:{
                                        _id   : 0,
                                        value : "$id",
                                        label : "$name",
                                    }},
                                ],
                                as: "children"
                                }
                         }
                    ],
                    as: "states"
                    }
              },
              {$project:{
                _id   : 0,
                label : "$name",
                value : "$id",
                children:"$states"
              }}
              ]).toArray((err, result) => {
                callback(err, result);
              });
            }
        },(err,response) => {
            if(err) return next(err);

            /** send response **/
            return res.send({
                status        : API_STATUS_SUCCESS,
                message       : '',
                result                  : (response.countryList)   ? response.countryList : [],
                countryCurrencyList     : (response.countryCurrencyList)   ? response.countryCurrencyList : [],
                countryCurrencyNameList     : (response.countryCurrencyNameList)   ? response.countryCurrencyNameList : [],
                countryPhoneCodeList    : (response.countryPhoneCodeList)       ? response.countryPhoneCodeList : []
            })  
        });


  };//End getCountryData()



  /** Function is used to reset password **/
  this.resetPassword = async (req, res,next)=> {
    req.body            = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
    let validateString  = (req.body.validate_string)  ? req.body.validate_string : '';
    let password        = (req.body.password)         ? req.body.password : '';
    let confirmPassword = (req.body.confirm_password) ? req.body.confirm_password : '';

    if(!validateString) return res.send({
      status		:	API_STATUS_ERROR,
      message		:	res.__("front.user.invalid_request"),
      result    : {},
      error		  :	[],
    });

    req.checkBody({	
      "password":{
        isLength		:{
          options    : {min : PASSWORD_MIN_LENGTH , max : PASSWORD_MAX_LENGTH},
          errorMessage:res.__("admin.user.password_should_be_6_characters_long")
        },
        matches	 : {
          options    	: PASSWORD_ALPHANUMERIC_REGEX,
          errorMessage:res.__("admin.user.password.it_should_be_alphanumeric")
        },
        notEmpty		:true,
        errorMessage	:res.__("admin.user.please_enter_password")
      },
      "confirm_password":{ 
        isLength		:{
          options    : {min :PASSWORD_MIN_LENGTH,  max : PASSWORD_MAX_LENGTH},
          errorMessage:res.__("admin.user.password.it_should_be_6_characters_long")
        },
        matches	 : {
          options    	: PASSWORD_ALPHANUMERIC_REGEX,
          errorMessage:res.__("admin.user.password.it_should_be_alphanumeric")
        },
        notEmpty : true,
        errorMessage	:res.__("admin.user.please_enter_confirm_password")	
      },
    });

    /** Match password with confirm password */
    if (password && confirmPassword) {
      req.checkBody("confirm_password", "admin.user.password_does_not_matched").equals(req.body.password);
    }

    let encryptPassword 	= bcrypt.hashSync(password, BCRYPT_PASSWORD_SALT_ROUNDS);
    let errors  = parseValidationFront(req.validationErrors());
    errors      = (errors && Object.keys(errors).length>0) ? errors :  {};

    if(Object.keys(errors).length == 0){

        /** search condition */
      let conditionSearch = { 
        is_deleted  : NOT_DELETED, 
        is_active   : ACTIVE,
        validate_string : validateString
      };
  
      /** update condition */
      let conditionUpdate = {password : encryptPassword};

      let collection = db.collection('users');
      collection.updateOne(conditionSearch,{$set:conditionUpdate},(err, result)=>{
        if(!err && result && result.modifiedCount > NOT){
          return res.send({
            status		:	API_STATUS_SUCCESS,
            message		:	res.__("Password has been changed successfully."),
            result    : {},
            error		  :	[],
          });
        }else{
          return res.send({
            status		:	API_STATUS_ERROR,
            message		:	res.__("Something went wrong please try again later")	,
            result    : {},
            error		  :	[],
          });
        }
      });
    }else{
      return res.send({
        status		:	API_STATUS_ERROR,
        message		:	'',
        result    : {},
        error		  :	errors,
      });
    }
  }

  /**
   * Function for get User Detail
   *
   * @param req  As Request Data
   * @param res  As Response Data
   * @param next As Next Data
   *
   * @return render/json
  */
  this.getUserDetail = (req, res,next)=>{
      const users     = db.collection("users");
      req.body        = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
      let userId      = (req.body.user_id) ? req.body.user_id : '';
      users.findOne({ "_id" : ObjectId(userId)},async (err, result)=>{
          if(!err){
              /**Render edit profile page*/
              return res.send({
                status    : API_STATUS_SUCCESS,
                message   : '',
                result    : result,
              });
          }else{
              /** Send error response **/
              return res.send({
                status    : API_STATUS_ERROR,
                message   : res.__("admin.front.something_went_wrong_please_try_again_later") ,
                result    : {},
              });
          }
      })
  };//End editProfile()


  /**
   * Function for update User Profile
   *
   * @param req  As Request Data
   * @param res  As Response Data
   * @param next As Next Data
   *
   * @return render/json
  */
  this.updateUserDetail = async (req, res, next)=> {
    req.body   = sanitizeData(req.body, NOT_ALLOWED_TAGS_XSS);
    let userId = (req.body.user_id) ? req.body.user_id : '';

    if(userId == ''){
      /*** return success */
      return res.send({
        status    : API_STATUS_SUCCESS,
        message   : 'Invalid Request!',
        result    : {},
        errors    : {},
      });
    }

    
    req.checkBody({ 
      "full_name":{ 
        notEmpty : true,
        errorMessage  :"Please enter full name"
      },
      "email":{ 
        notEmpty : true,
        errorMessage  : "Please enter email"
      }
    });



    let errors  = parseValidationFront(req.validationErrors());
    errors      = (errors && Object.keys(errors).length>0) ? errors :  {};

    if(Object.keys(errors).length == 0){
      /** search condition */
      let conditionSearch = { 
        // is_deleted  : NOT_DELETED, 
        // is_active   : ACTIVE,
        _id         : ObjectId(userId)
      };

      /** update condition */
      let conditionUpdate = {
        full_name    : (req.body.full_name) ? req.body.full_name : '',
        email        : (req.body.email) ? req.body.email : '',
      };

      /** File uploading on s3 AWS */
      if(req.files){
        /** Read content from the file */
        let brandLogo=  (req.files.brand_logo) ? req.files.brand_logo : {};

        /** AWS server configuration */
        const AWS = require('aws-sdk');
        const s3 = new AWS.S3({
          accessKeyId: AWS_S3_ID,
          secretAccessKey: AWS_S3_SECRET
        });

        /**  Setting up S3 upload parameters */
        const params = {
            Bucket: 'quibblerm-assets',
            Key: ''+userId+''+brandLogo.name, // File name you want to save as in S3
            Body: brandLogo.data,
            ACL : 'public-read'
        };
    
        /**  Uploading files to the bucket*/
        s3.upload(params, function(err, data) {
            if (err) throw err;
            if(data.Location) conditionUpdate['brand_logo'] = data.Location;
            editProfile(req, res, conditionSearch, conditionUpdate)
            //console.log(`File uploaded successfully. ${data.Location}`);
        });
      }else{
        editProfile(req, res, conditionSearch, conditionUpdate)
      }
    }else{
      return res.send({
        status    : API_STATUS_ERROR,
        message   : '',
        result    : {},
        errors     : errors,
      });
    }
  }// End updateUserProfile

  /** Update user profile */
  editProfile = (req, res, conditionSearch, conditionUpdate)=>{
    let collection = db.collection('users');
      collection.findOneAndUpdate(conditionSearch,{$set:conditionUpdate},async(err, result)=>{
        if(!err && result && result.lastErrorObject.updatedExisting  == true){

          return res.send({
            status    : API_STATUS_SUCCESS,
            message   : "Profile has been updated successfully",
            result    : req.body,
            error     : [],
          });
        }else{
          return res.send({
            status    : API_STATUS_ERROR,
            message   : "Something went wrong please try again later" ,
            result    : {},
            error     : [],
          });
        }
      });
  }
}
module.exports = new Auth();