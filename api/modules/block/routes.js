/** Model file path for current plugin **/
const modelPath = __dirname + "/model/block";
const adminBlock = require(modelPath);

/** Routing is used to get list **/
routes.all(API_URL + "blocks", (req, res, next) => {
  adminBlock.getBlockList(req, res, next);
});

/** Routing is used to add **/
routes.all(API_URL + "blocks/add", (req, res, next) => {
  adminBlock.addBlock(req, res, next);
});

/** Routing is used to edit  **/
routes.all(API_URL + "blocks/edit/:id", (req, res, next) => {
  adminBlock.editBlock(req, res, next);
});

routes.all(API_URL + "blocks/view/:id", (req, res, next) => {
  adminBlock.getBlock(req, res, next);
});
