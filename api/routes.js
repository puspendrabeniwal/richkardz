
/**
 * Web.js
 *
 * This file is required by index.js. It sets up event listeners
 *
 * NODE.Js (http://nodejs.org)
 * Copyright Linux Foundation Collaborative (http://collabprojects.linuxfoundation.org/)
 *
 * @copyright     Linux Foundation Collaborative (http://collabprojects.linuxfoundation.org/)
 * @link          http://nodejs.org NODE.JS
 * @package       routes.js
 * @since         NODE.JS Latest version
 * @license       http://collabprojects.linuxfoundation.org Linux Foundation Collaborative
 */

/** Including contants file */
require("./global_constant");

/** node cache module */
const NodeCache = require("node-cache");
	myCache 	= new NodeCache();

/** Including common function */
require("./custom_helper");

console.log("dsfdsfdsff")
/**
 * Export a function, so that we can pass the app and io instances from app.js
 *
 * @param router As Express Object
 * @param mongo As Mongo db Object
 *
 * @return void.
 */
module.exports = {
	configure: function(router,mongo) {
		db			= mongo.getDb();
		ObjectId	= require("mongodb").ObjectID;
		routes 		= router;

		/*******************Initialize csrf module***********************/
		const csrf = require('csurf');
		csrfProtection = csrf({ cookie: true });
		/*******************Initialize csrf module end ***********************/
		
		/** Include API Middleware **/
		require(WEBSITE_MODULES_PATH+"auth/routes");
		require(WEBSITE_MODULES_PATH+"cms/routes");
		require(WEBSITE_MODULES_PATH+"block/routes");
		require(WEBSITE_MODULES_PATH+"testimonials/routes");
		require(WEBSITE_MODULES_PATH+"products/routes");
		
	}
};

