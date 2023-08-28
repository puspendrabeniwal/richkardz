/** Load All required Modules */
const {createTransport}	= require("nodemailer");
const {renderFile} 	= require("ejs");
const moment 		= require('moment');
const {ObjectId}	= require("mongodb");
//const dateFormat	= require("dateformat");
const {generate} 	= require("randomstring");
const asyncEach     = require("async/each");
const asyncParallel = require("async/parallel");



/**
 * Function for parse validation
 *
 * @param validationErrors  As validationErrors Array
 * @param req				As Request Data
 *
 * @return array
 */
parseValidation = (validationErrors,req)=>{
	let usedFields 		= [];
	let newValidations 	= [];
	if(Array.isArray(validationErrors)){
		validationErrors.map((item)=>{
			if(usedFields.indexOf(item.param) == -1){
				usedFields.push(item.param);
				newValidations.push(item);
			}
		});
		return newValidations;
	}else{
		return false;
	}
}//End parseValidation();



/**
 * Function for parse validation
 *
 * @param validationErrors  As validationErrors Array
 * @param req				As Request Data
 *
 * @return object
 */
 parseValidationFront = (validationErrors,req)=>{
	let usedFields 		= [];
	let newValidations 	= {};
	if(Array.isArray(validationErrors)){
		validationErrors.map((item)=>{
			if(usedFields.indexOf(item.param) == -1){
				usedFields.push(item.param);
				let validation = {'name' : item.param, 'errors' : [item.msg]}
				Object.assign(newValidations, validation)
			}
		});
		return newValidations;
	}else{
		return false;
	}
}//End parseValidation();

/** Function is used to calculate days in a month
 * @param year as year
 * @param month as month
 * return last date of the month
 */
daysInMonths = (year, month)=> {
	return new Date(year, month, 0).getDate();
};


/** This function is used to convert amount */
convertCentToUSD = (amount)=> {
	return Number(amount)/100;
};

convertNZDToUSD = (amount)=> {
	return Number(amount * 0.60);
};


/** Function is uesed to get date after/before of the day
 * @param days as day
 * @param type as before/after day
 * return date
 */
getBeforeAfterDate = (days, type)=>{	
	var date = new Date();
	if(type == 'before') date.setDate(date.getDate() - days);
	if(type == 'after') date.setDate(date.getDate() + days);
	return finalDate = new Date(date.getFullYear()+'-'+ (date.getMonth()+1) +'-'+date.getDate());
}




/** User email and phone unique validation 
 * @options table_name as collection name
 * @options field_value as search value
 * @options field_name as collection column name
*/
checkUniqueValue = (options)=>{
	return new Promise(resolve=>{
	  let collectionName  = (options.table_name)     ? options.table_name : '';
	  let fieldValue      = (options.field_value)    ? options.field_value : '';
	  let fieldName       = (options.field_name)     ? options.field_name : '';
	  let oldId           = (options.old_id)         ? options.old_id : '';
	
	  /** Invalid */
	  if(!collectionName || !fieldValue || !fieldName) return resolve({status : STATUS_ERROR,result : {}})
  
	  /** Search condition */
	  let searchCondition = {};
	  if(oldId) searchCondition['_id'] = {$ne : ObjectId(oldId)};
  
	  if(fieldName == USER_VERIFICATION_TYPE_EMAIL){
		searchCondition['email'] = { $regex: new RegExp("^" + fieldValue, "i") } 
	  }
  
	  /** Search data in collection */
	  let collection = db.collection(String(collectionName));
	  collection.findOne(searchCondition,(err, result)=>{
		if(!err && !result){
		  return resolve({
			status  : STATUS_SUCCESS,
			result  : result
		  })
		}else{
		  return resolve({
			status : STATUS_ERROR,
			result : result
		  })
		} 
	  })
	})
  }


/**
 * Function to send Email
 *
 * @param to		As Recipient Email Address
 * @param repArray  As Response Array
 * @param action  	As Email Action
 *
 * @return array
 */
sendMail = (req,res,options)=>{
	try{

		let to				=	(options && options.to)			?	options.to			:"";
		let repArray		=	(options && options.rep_array)	?	options.rep_array	:"";
		let action			=	(options && options.action)		?	options.action		:"";
		let attachments		=	(options && options.attachments)?	options.attachments	:"";
		let subject			=	(options && options.subject)	?	options.subject		:"";

		let userEmail		=	'info@quibblerm.com';
		let emailHost		=	'smtp.gmail.com'
		let emailPassword	=	'R7<FmV&Z'
		let emailUserName	=	'info@quibblerm.com';
		let emailPort		=	587;

		const transporter 	= 	createTransport({
			host	: 	emailHost,
			port	: 	emailPort,
			secure	: 	(emailPort == 465) ? true : false, // true for 465, false for other ports
			auth	: 	{
				user: userEmail, // generated ethereal user
				pass: emailPassword // generated ethereal password
			},
			tls: {
				rejectUnauthorized: true
			}
		});

		/** get email layout **/
		renderFile(WEBSITE_LAYOUT_PATH + 'email.html','','',(err, html)=>{
			html 		= html.replace(RegExp('{{MESSAGE_BODY}}','g'),repArray[1]);
			let mailOptions = {
				from	: 	emailUserName,
				to		: 	to,
				subject	: 	subject,
				html	: 	html
			};

			/**Send email*/
			transporter.sendMail(mailOptions,(error, info)=>{
				/** Save email logs details **/
				const email_logs = db.collection("email_logs");
				mailOptions.is_sent = (error) ? false :true;
				mailOptions.error	= error;
				mailOptions.created = getUtcDate();
				email_logs.insertOne(mailOptions);

				if(error){
					return console.error(error);
				}
			});
		});

	}catch(e){
		console.log(e);
	}
};//end sendMail();

/**
 * Function to get date in any format with utc format
 * @param date 		as	Date object
 * @param format 	as 	Date format
 * @return date string
 */
getUtcDate = (date,format)=>{
	if(date){
		var now = new Date(date);
	}else{
		var now = new Date();
	}
	let changedDate = now.toLocaleString('en-US', {timeZone: process.env.TZ});
	if(format){
		return now
		//return dateFormat(now, format);
	}else{
		return now;
	}
};//end getUtcDate();

/**
 * Function to get date in any format
 *
 * @param date 		as	Date object
 * @param format 	as 	Date format
 *
 * @return date string
 */
newDate = (date,format)=>{
	if(date){
		var now = new Date(date);
	}else{
		var now = new Date();
	}
	if(format){
		return now
		//return dateFormat(now, format);
	}else{
		return now;
	}
};//end newDate();


newDateSplit = (date)=>{
	let dateArr= date.split('-');
if(dateArr.length > NOT){
let year = dateArr[0]
let month= dateArr[1];
let day= dateArr[2];
date = month+'/'+ day+'/'+ year
}
return date;
};//end newDate();



/**
 * Function for make string to title case
 *
 * @param str AS String
 *
 * @return string
 */
toTitleCase = (str)=>{
	return str.replace(/\w\S*/g,(txt)=>{return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};//end toTitleCase();



/**
 * Function for sanitize form data
 *
 * @param data				As Request Body
 * @param notAllowedTags	As Array of not allowed tags
 *
 * @return json
 */
sanitizeData = (data,notAllowedTags)=>{
	let sanitized = arrayStripTags(data,notAllowedTags);
	return sanitized;
};//End sanitizeData()

/**
 * Function to strip not allowed tags from array
 *
 * @param array				As Data Array
 * @param notAllowedTags	As Tags to be removed
 *
 * @return array
 */
arrayStripTags = (array,notAllowedTags)=>{
	if (array.constructor === Object){
		var result = {};
	}else{
		var result = [];
	}
	for(let key in array){
		let value = (array[key] != null) ? array[key] : '';
		if(value.constructor === Array || value.constructor === Object) {
			result[key] = arrayStripTags(value,notAllowedTags);
		}else{
			result[key] = stripHtml(value.toString().trim(),notAllowedTags);
		}
	}
	return result;
};//End arrayStripTags()

/**
 * Function to Remove Unwanted tags from html
 *
 * @param html				As Html Code
 * @param notAllowedTags	As Tags to be removed
 *
 * @return html
 */
stripHtml = (html,notAllowedTags)=>{
	let unwantedTags= notAllowedTags;
	for(let j = 0;j < unwantedTags.length;j++){
		html = html.replace(unwantedTags[j],'');
	}
	return html;
};//end stripHtml();

/**
 *  Function to Round the number
 *
 * @param value		As Number To be round
 * @param precision As Precision
 *
 * @return number
 */
round = (value, precision)=>{
	try{
		if(!value || isNaN(value)){
			return value;
		}else{
			precision = (typeof precision != typeof undefined && precision) ? precision :NOT;
			var multiplier = Math.pow(10, precision || 0);
			return Math.round(value * multiplier) / multiplier;
		}
	}catch(e){
		return value;
	}
}// end round()


/**
 * Function to add days in current date
 *
 * @param addDay AS Number Of Hours to be added
 *
 * @return date string
 */
addDate = (hours)=>{
	var	addDayTimestamp = hours * 60 * 60 * 1000;
	now	= new Date(Date.now() + addDayTimestamp);
	return now;
}//end addDate();

/**
 * Function to add days in given date
 *
 * @param hours AS Number Of Hours to be added
 *
 * @return date string
 */
addDaysToDate = (hours,date)=>{
	let addDayTimestamp = hours * 60 * 60 * 1000;
	let baseTimestamp	= (typeof date !== typeof undefined && date) ? new Date(date).getTime() : Date.now();
	now	= new Date(baseTimestamp + addDayTimestamp);
	return now;
}//end addDaysToDate();

/**
 * Function to subtract days in given date
 *
 * @param Hours AS Number Of Days to be subtracted
 *
 * @return date string
 */
subtractDate = (Hours)=>{
	var subtractHoursTimestamp = Hours * 60 * 60 * 1000;
	now 	= new Date(Date.now() - subtractHoursTimestamp);
	return now;
}//end subtractDate();

/**
 * Function to subtract minute in current date time
 *
 * @param minute AS minute to be subtracted
 *
 * @return date string
 */
subtractMinute = (minute)=>{
	var subtractMinuteTimestamp = minute * 60 * 1000;
	now 	= new Date(Date.now() - subtractMinuteTimestamp);
	return now;
}//end subtractMinute();

/**
 * Function to add minute in current date time
 *
 * @param minute AS minute to be subtracted
 *
 * @return date string
 */
addMinute = function(minute) {
	var addMinuteTimestamp = minute * 60 * 1000;
	now 	= new Date(Date.now() + addMinuteTimestamp);
	return now;
}//end addMinute();

/**
* Function to get difference in two dates in seconds
*
* @param startDate AS start date
* @param endDate AS end date
*
* @return difference between two days in seconds
*/
getDifferenceBetweenTwoDates = function(startDate,endDate) {
	startDate 	= new Date(startDate);
	endDate 	= (endDate) ? new Date(endDate) : new Date();
	var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
	var diffInSeconds =	Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
	return diffInSeconds;
}//end getDifferenceBetweenTwoDates();


/**
 * To check request method is post or get
 *
 * @param req	As Request Data
 * @param res	As Response Data
 *
 * @return boolean
 */
isPost = (req)=>{
	if(typeof req.body !== typeof undefined && Object.keys(req.body).length != 0){
		return true;
	}else{
		return false;
	}
}//End isPost()


/**
 * to replace /n with <br> tag
 *
 * @param html	As Html
 *
 * @return html
 */
nl2br = (html)=>{
	if(html){
		return html.replace(/\n/g, "<br />");
	}else{
		return html;
	}
}//end nl2br

/**
 * function is used to clear regular expression string
 *
 * @param regex	As Regular expression
 *
 * @return regular expression
 */
cleanRegex = (regex)=>{
	if(NOT_ALLOWED_CHARACTERS_FOR_REGEX && NOT_ALLOWED_CHARACTERS_FOR_REGEX.length>0){
		for(let i in NOT_ALLOWED_CHARACTERS_FOR_REGEX){
			regex = regex.split(NOT_ALLOWED_CHARACTERS_FOR_REGEX[i]).join('\\'+NOT_ALLOWED_CHARACTERS_FOR_REGEX[i]);
		}
		return regex;
	}else{
		return regex;
	}
}//end cleanRegex


/**
 *  Function to generate a random sting
 *
 * @param req 		As Request Data
 * @param res 		As Response Data
 * @param options	As options
 *
 * @return string
 */
 getRandomString = (req,res,options)=>{
	return new Promise(resolve=>{
		let srtingLength	= (options && options.srting_length) ? parseInt(options.srting_length) : DEFAULT_RANDOM_NUMBER_LENGTH;

		/**Generate random string **/
		let unique = generate({
			length			: srtingLength,
			charset			: 'alphanumeric',
			capitalization	: 'uppercase'
		});
		return resolve({
			status 	: 	STATUS_SUCCESS,
			result	:	unique
		});
    });
}//End getRandomString()

/**
 * Function to Remove html tags from string
 *
 * @param string As text string
 *
 * @return html
 */
stripTag = (string)=>{
	return string.replace(/(<([^>]+)>)/ig," ");
}//end stripTag();

/**
 * Function to get current timestamp
 *
 * @param null
 *
 * @return timestamp
 */
currentTimeStamp = ()=>{
	return new Date().getTime();
};//end currentTimeStamp();


/**
 * Function to convert Object to array
 *
 * @param array  	As Array
 *
 * @return json
 */
convertObjectToArray = (obj)=>{
	if(obj.constructor !== Object) return obj;
	let newArray = Object.keys(obj).map(objKey=>{return obj[objKey]});
	return newArray;
};

/**
 * Function to convert Object to array
 *
 * @param array  	As Array
 *
 * @return json
 */
convertArrayToObject = (arr,key)=>{
	if(arr.constructor !== Array) return arr;
	let newObj = {};
	arr.map(arrRecord=>{
		newObj[arrRecord[key]] = arrRecord;
	});
	return newObj;
};


/**
 * Function to use to print data in cmd panel
 *
 * @param message as printable data
 *
 * @return void
 */
logger = (message)=>{
	const debug	=	JSON.parse(process.env.DEBUG);
	if(debug){
		return console.log(message);
	}else{
		return;
	}
};// end logger()



/**
 * Function to get user data
 *
 * @param req		As	Request Data
 * @param res		As 	Response Data
 * @param options	As  object of data
 *
 * @return json
 **/
getUserData = (req,res,next,options) =>{
	return new Promise(resolve=>{
		let conditions	= (options.conditions)	? options.conditions	:{};
		let fields		= (options.fields)		? options.fields		:{};
		if(!conditions){
			/** Send error response **/
			return resolve({
				status	: STATUS_ERROR,
				message	: res.__("system.something_going_wrong_please_try_again")
			});
		}

		/** Get user details **/
		const users	= db.collection("users");
		users.findOne(conditions,{projection: fields},(err,result)=>{
			if(err){
				/** Send error response **/
				let response = {
					status	: STATUS_ERROR,
					message	: res.__("system.something_going_wrong_please_try_again")
				};
				return resolve(response);
			}

			/** Send success response **/
			if(!result)return resolve({status : STATUS_SUCCESS,result : {}});

			/** Send success response **/
			if(!result.profile_image)return resolve({status	: STATUS_SUCCESS,result : result});

			/** Set options for append image **/
			let imageOptions = {
				"file_url" 			: USERS_URL,
				"file_path" 		: USERS_FILE_PATH,
				"result" 			: [result],
				"database_field" 	: "profile_image"
			};

			/** Append image with full path **/
			appendFileExistData(imageOptions).then(fileResponse=>{
				/** Send success response **/
				resolve({
					status	: STATUS_SUCCESS,
					result 	: (fileResponse && fileResponse.result && fileResponse.result[0])	?	fileResponse.result[0]	:{}
				});
			});
		});
	}).catch(next);
};// end getUserData()

/**
 * Function is used to convert elements of array in object
 *
 * @param classes as a array
 *
 * @return class name
 */
arrayToObject = (arr)=>{
	if(!arr || arr.constructor !== Array || arr.length == 0) return [];
		return arr.map((arrayElem)=>{
		return ObjectId(arrayElem);
	});
}// arrayToObject();

/**
 * Function to use to currency format
 *
 * @param amount as data to format
 *
 * @return number
 */

formatter = (amount)=>{
	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	
		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

	return formatter.format(amount)
}
  

setErrorSuccessMessage = (req,res,next,type,message)=>{
	let messageType = "";
	if(type == STATUS_SUCCESS){
		messageType = STATUS_SUCCESS;
	}else if(type == STATUS_ERROR){
		messageType = STATUS_ERROR;
	}else{
		messageType = STATUS_OTHER;
	}
	req.session.message_content = message;
	req.session.message_type 	= messageType;
};// end setErrorSuccessMessage()

/** Generate JWT */
generateJWT =(data)=>{
	let jwt   = require('jsonwebtoken');
	let token = jwt.sign(data, JWT_CONFIG.private_key, { expiresIn: JWT_CONFIG.expire_time });
	return token;
}//End generateJWT


/*** This function is used to authenticate user profile */
isUserLogin = (req, res)=>{
	return new Promise((resolve)=>{
	  let token = (req.body.token) ? req.body.token : '';
	  if(!token) return res.send({
		status        : API_STATUS_ERROR,
		result        : {},
		statusCode 	  : "",
		message       : 'Invalid request, token does not exist'
	  });
  
	  /*** JWT verification */
	  let jwt   = require('jsonwebtoken');
	  jwt.verify(token, JWT_CONFIG.private_key, { expiresIn: JWT_CONFIG.expire_time},(err, decoded) =>{
		  
		if(err){
		  return res.send({
			status        : API_STATUS_ERROR,
			result        : {},
			statusCode    :	"token_expire",
			message       : err.name+', '+err.message,
		  })
		}else{
		  /*** User exist */
		  let userId  = (decoded.user_key) ? decoded.user_key : '';

		  let collection  = db.collection('users');
		  collection.findOne({_id : ObjectId(userId)},(err, result)=>{
			if(!err && result && Object.keys(result).length > 0){
			  let response = {
				status        : '',
				statusCode    : '',
				message       : '',
				result        : '',
				error         : '',
			  };


			//   if(result.is_deleted == DELETED) {
			// 	response['status']		    =	API_STATUS_ERROR; 
			// 	response['message']       = res.__("front.user.login.user_deleted");
			// 	res.send(response)
			//   }else if(result.is_active == DEACTIVE) {
			// 	response['status']		    =	API_STATUS_ERROR; 
			// 	response['message']       = res.__("front.user.login.account_deactivate_contact_to_admin");
			// 	res.send(response)
			//   }else 

			  if(result.emailVerified == NOT_VERIFIED){
				response['status']  	    =	API_STATUS_ERROR; 
				response['message']       = res.__("front.user.login.email_not_verified");
				res.send(response)
			  }else{
				return resolve()
			  }
			}else{
			  return res.send({
				status        : API_STATUS_ERROR,
				result        : {},
				statusCode    :	"user_authorized",
				message       : 'Not an authorized user',
			  })
			}
		  })
		}
	  });
	})
}


