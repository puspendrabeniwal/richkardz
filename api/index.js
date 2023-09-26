/** Node express */
const express	= 	require('express');
const cors 		= require("cors");
const app 		=	express();
const path 		= require('path');

const qrcode = require('qrcode');
const fs = require('fs');
const jimp = require('jimp');

// URL you want to redirect to
const url = 'https://www.richkardz.com';

// Path to your image icon (replace with your own icon)
const iconPath = 'icon.png';

// Generate the QR code as a data URI
qrcode.toDataURL(url, (err, qrCodeData) => {
  if (err) {
    console.error('Error creating QR code:', err);
    return;
  }

  // Load the image icon
  jimp.read(iconPath, (err, iconImage) => {
    if (err) {
      console.error('Error loading icon image:', err);
      return;
    }

    // Create a new Jimp image from the QR code data URI
    jimp.read(Buffer.from(qrCodeData.split(',')[1], 'base64'), (err, qrImage) => {
      if (err) {
        console.error('Error creating QR code image:', err);
        return;
      }

      // Calculate the position for the icon in the center of the QR code
      const xPos = (qrImage.bitmap.width - iconImage.bitmap.width) / 2;
      const yPos = (qrImage.bitmap.height - iconImage.bitmap.height) / 2;

      // Composite the icon onto the QR code
      qrImage.composite(iconImage, xPos, yPos);

      // Save the final QR code with the icon as an image
      const outputFilePath = 'qrcode_with_centered_icon.png';
      qrImage.write(outputFilePath, (err) => {
        if (err) {
          console.error('Error saving QR code with centered icon:', err);
        } else {
          console.log(`QR code with centered icon saved as ${outputFilePath}`);
        }
      });
    });
  });
});


/**  Configure i18n options, this module is used for multi language site */
const i18n 	= require("i18n");
i18n.configure({
    locales:['en'],
    defaultLocale: 'en',
    directory: __dirname + '/locales',
    directoryPermissions: '755',
    autoReload: true,
    updateFiles: false
});
app.use(i18n.init);

/** Hide X Powered by (Secure Web) */
app.disable('x-powered-by');

/** required for Helmet (Secure Web) */
// const helmet = require('helmet');
// app.use(helmet());

/** required for Compression */
const compression = require('compression')

// ** Increase timeout for long process **//
// app.use(timeout('300000s'))
// app.use(haltOnTimedout)

/* compress all responses */
app.use(compression({
	level : 9,
	memLevel : 9
}));

// Add your haltOnTimedout

function haltOnTimedout (req, res, next) {
	if (!req.timedout) next()
}




const expressValidator = require('express-validator');
app.use(expressValidator());


const fileUpload = require('express-fileupload')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

/** bodyParser for node js */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true,
	limit	: '50mb',
    parameterLimit : 1000000
}));
app.use(bodyParser.json());

/**  read cookies (needed for auth) */
const cookieParser = require('cookie-parser');
app.use(cookieParser());


/** Set publically accessable folder */
// inside public directory.
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


/**  including .env file */
require('dotenv').config();

PORT = process.env.PORT || 5000;

MAX_EXECUTION_TIME = process.env.MAX_EXECUTION_TIME || 3000;

app.listen(PORT,()=>{
    console.log('Server listening on port ' + PORT);
});

const allowedOrigin = [
	'http://localhost:3000'
];

app.use(
	cors()
);
  
/** Function to get unhandled errors and prevent to stop nodejs server **/
process.on("uncaughtException", function (err) {
	console.log("error name ---------"+err.name);    // Print the error name
	console.log("error date ---------"+new Date());    // Print the error name
	console.log("error message ---------"+err.message); // Print the error message
	console.log("error stack ---------"+err.stack);   // Print the stack trace
	setTimeout(function(){
		process.exit(1);
	},1000);
});

/** Including mongo connection file */
const mongo	= require("./connection");
mongo.connectToServer(err=>{
    /** Including mongo connection file **/
	let db   = 	mongo.getDb();
	/** required for Session */
	const expressSession  	 = require('express-session');
	var sessionTimeInSeconds = 15 * 24 * 60 * 60;
	app.use(expressSession({
		name: 'session',
		resave: false,
		saveUninitialized: false,
		proxy:false,
		secret: 'NodeJs9799530SecretKey515',
		cookie : {
			maxAge: sessionTimeInSeconds*1000,
		},
    }));
	const routesFront = require('./routes');
	routesFront.configure(app,mongo);
});
