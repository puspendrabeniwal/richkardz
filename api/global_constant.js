/** Website root directory path */
process.env.PWD     =   process.cwd();
WEBSITE_ROOT_PATH	=	process.env.PWD + "/";
SITE_TITLE 			=	process.env.SITE_TITLE || "quibblerm";


/** Website Header Auth Key for api */
WEBSITE_HEADER_AUTH_KEY	= 	process.env.API_HEADER_AUTH_KEY;
PORT = process.env.PORT || 5000;
process.env.PORT = PORT;
BASE_URL = (process.env.URL) ? process.env.URL+":"+PORT+"/" : "https://..com/"
BASE_API_URL = (process.env.URL) ? process.env.URL+":"+PORT+"/api" : "https://..com/api"

/** Website/API Url*/
WEBSITE_URL			=	BASE_URL;
WEBSITE_API_URL		=	BASE_API_URL;

/** Front end name **/
FRONT_END_NAME          = "/";
/** Admin name **/
ADMIN_NAME              = "admin";
/** Front end folder name */
FRONT_END_FOLDER_NAME   = "/";
/** Admin folder name */
ADMIN_FOLDER_NAME       = "admin";

/** Website public directory path */
WEBSITE_PUBLIC_PATH 			= 	WEBSITE_URL + "public/";
/** Website public folder path of front end*/
WEBSITE_FILES_URL				= 	WEBSITE_URL + FRONT_END_FOLDER_NAME+"/";
/** Js file path for front pages of website */
WEBSITE_JS_PATH 				= 	WEBSITE_FILES_URL + "js/";
/** Js Path for specific pages */
WEBSITE_JS_PAGE_PATH			= 	WEBSITE_JS_PATH + "pages/";
/** Css file path for front pages of website*/
WEBSITE_CSS_PATH 				= 	WEBSITE_FILES_URL + "css/";
/** vendor file path for front pages of website*/
WEBSITE_VENDOR_PATH 			= 	WEBSITE_FILES_URL + "vendor/";
/** Website images directory url */
WEBSITE_IMG_URL 				= 	WEBSITE_FILES_URL + "images/";
/** Website public images directory url */
WEBSITE_PUBLIC_IMG_URL			= 	WEBSITE_PUBLIC_PATH + FRONT_END_FOLDER_NAME+'/';
/**Js plugin directory path */
WEBSITE_JS_PLUGIN_PATH			= 	WEBSITE_FILES_URL + "plugins/";
/** Website Modules root path */
WEBSITE_MODULES_PATH		    = 	WEBSITE_ROOT_PATH + "modules/";
/** Front layout root path */
WEBSITE_LAYOUT_PATH				= 	WEBSITE_ROOT_PATH + "modules/"+FRONT_END_FOLDER_NAME+"/layouts/";

/** Time Configurations */
DAYS_IN_A_WEEK				= 	7;
HOURS_IN_A_DAY				= 	24;
MINUTES_IN_A_HOUR 			= 	60;
SECONDS_IN_A_MINUTE 		= 	60;
MILLISECONDS_IN_A_SECOND	=	1000;
SECONDS_IN_A_HOUR			= 	3600;
DAY_IN_A_MONTH				= 	30;
HOURS_IN_A_YEAR				= 	HOURS_IN_A_DAY*365;

/** Time stamp of one day*/
ONE_DAY_TIMESTAMP = HOURS_IN_A_DAY*MINUTES_IN_A_HOUR*SECONDS_IN_A_MINUTE*MILLISECONDS_IN_A_SECOND;


/** Commonly used status **/
ACTIVE 			=	1;
DEACTIVE 		= 	0;
VERIFIED 		= 	1;
NOT_VERIFIED	= 	0;
DELETED			= 	1;
NOT_DELETED		= 	0;
NOT             =   0;

/** Type of Flash messages */
STATUS_SUCCESS 	= "success";
STATUS_ERROR 	= "error";

/** Show / Hide "Stay Signed In" Option in admin */
ALLOWED_ADMIN_TO_SET_COOKIE	=	DEACTIVE;


/** Not allowed html tags list*/
NOT_ALLOWED_TAGS_XSS = [/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*/gi];

/** Allow iframe in add/edit product (Youtube embedded code) **/
NOT_ALLOWED_TAGS_XSS_WITHOUT_IFRAME = [/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi];

/** Date Formats  for server side (node js) **/
DATABASE_DATE_TIME_FORMAT	= 	"yyyy-mm-dd HH:MM:ss";	// 2019-01-01 00:00:00
DATABASE_DATE_FORMAT		= 	"yyyy-mm-dd"; 			// 2019-01-01
DATE_FORMAT_EXPORT 			=	"dd/mm/yyyy";
DATE_FORMAT_RESERVATION 	=	"mm/dd/yyyy";
EXPIRY_DATE_FORMAT	 		=	"dd/mm/yyyy";
DATE_TIME_FORMAT_EXPORT 	=	"dd/mm/yyyy hh:MM TT"; // 01/01/2019 11:00 AM
DATE_OF_BIRTH_FORMAT		= 	"yyyy-mm-dd"; 			// 2019-01-01
AM_PM_FORMAT_WITH_DATE 		= 	"yyyy-mm-dd hh:MM TT"; 	// 2019-01-01 11:00 AM
API_DATE_TIME_FORMAT		= 	"yyyy-mm-dd HH:MM:ss";	// 2019-01-01 00:00:00
API_DATE_FORMAT				= 	"yyyy-mm-dd";	// 2019-01-01 00:00:00

START_DATE_TIME_FORMAT		= 	"00:00:00";	// 2019-01-01 00:00:00

/**Date formats For client side only */
FRONT_DATE_FORMAT			= 	"DD/MM/YYYY hh:MM A"; 			// 31/01/2018 00:00 PM
DATATABLE_DATE_TIME_FORMAT	=	"DD/MM/YYYY hh:mm a";
DATATABLE_DATE_FORMAT		=	"DD/MM/YYYY";
DATE_FORMAT_HTML			=	"DD/MM/YYYY";
GRAPH_DATE_FORMAT			=	"dd/MM/yyyy";

CURRENTDATE_START_DATE_FORMAT	=	"yyyy-mm-dd 00:00:00";
CURRENTDATE_END_DATE_FORMAT		=	"yyyy-mm-dd 23:59:59";


/** Time zone used in html **/
DEFAULT_TIME_ZONE	= process.env.TZ;

/** Datatable configurations **/
SORT_DESC	 	= 	-1;
SORT_ASC	 	= 	1;
DEFAULT_SKIP	=	0;


/** Password length configuration **/
PASSWORD_MIN_LENGTH					= 	6;
PASSWORD_MAX_LENGTH					= 	12;
PASSWORD_ALPHANUMERIC_REGEX         =   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{6,12}$/;
PASSWORD_LENGTH_VALIDATION			=	{};
PASSWORD_LENGTH_VALIDATION["min"]	=	PASSWORD_MIN_LENGTH;
PASSWORD_LENGTH_VALIDATION["max"]	=	PASSWORD_MAX_LENGTH;
PASSWORD_LENGTH						=	[PASSWORD_LENGTH_VALIDATION];



/** Email and Mobile validation regular expression (use in login function for front) **/
/** Email and 10 digit mobile number validation */
EMAIL_AND_MOBILE_REGULAR_EXPRESSION					= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10,11})+$/;
EMAIL_AND_MOBILE_REGULAR_EXPRESSION_FOR_CLIENT_SIDE	= "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10,11})+$";

EMAIL_REGULAR_EXPRESSION					= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


/** Round precision (default number of decimal digits to round to) **/
ROUND_PRECISION = 2;

VALIDATE_STRING_ROUND = 10;

/** to ignore Case sensitive searching/sorting in mongo collections  **/
COLLATION_VALUE		=	{ locale: "en_US", caseLevel: true};


/** Not allowed characters in regular expresssion **/
NOT_ALLOWED_CHARACTERS_FOR_REGEX = ['(',')','+','*','?','[',']'];

/**Not deletable role */
NOT_DELETABLE_ROLE	= 1;
ADMIN_ROLE          = "admin";

/** Two show only subadmin */
IS_SUBADMIN	= 1;

/**To genrate random numbers */
DEFAULT_RANDOM_NUMBER_LENGTH = 6;


/** Used for genrate password */
BCRYPT_PASSWORD_SALT_ROUNDS = 1;



/*** Accounting World */
API_STATUS_SUCCESS = true;
API_STATUS_ERROR   = false;


/** JWT config */
JWT_CONFIG = {
    algorithm   : 'RS256',
    private_key : 'richKardz1233456789',
    expire_time : '24h'
}

API_URL		=	"/api/";
API_LISTING_LIMIT = 10;

USER_VERIFICATION_TYPE_EMAIL    = 'email';
USER_VERIFICATION_TYPE_MOBILE   = 'phone';
