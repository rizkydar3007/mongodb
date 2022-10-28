const router = require("express").Router();
const productController = require("./controller");

router
    .get("/product", productController.getAllProductsWithQuery)
    .get("/product/:id", productController.getDetailProduct)
    .post("/product", productController.insertProduct)
    .put("/product/:id", productController.updateProduct)
    .delete("/product/:id", productController.deleteProduct);

module.exports = router;
