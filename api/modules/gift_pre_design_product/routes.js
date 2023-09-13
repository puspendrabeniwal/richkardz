/** Model file path for current plugin **/
const modelPath     =	__dirname+"/model/product";
const products	    =   require(modelPath);

/** Routing is used to get products*/
routes.all(API_URL+"products",(req, res)=>{
    products.productList(req, res);
});

/** Routing is used to get products*/
routes.all(API_URL+"product/add",(req, res)=>{
    products.addProduct(req, res);
});

/** Routing is used to edit product detail*/
routes.all(API_URL+"product/edit/:id",(req, res)=>{
    products.editProduct(req, res);
});

/** Routing is used to get product detail*/
routes.all(API_URL+"product/view/:id",(req, res)=>{
    products.viewProduct(req, res);
});

/** Routing is used to update product status*/
routes.all(API_URL+"product_status",(req, res)=>{
    products.updateProductStatus(req, res);
});

