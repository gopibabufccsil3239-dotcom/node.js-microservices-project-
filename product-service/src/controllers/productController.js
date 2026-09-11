const productService = require("../services/productService");

const productController = {
    createProduct: async (req, res) => {
        try {
            const product = await productService.createProduct(req.body);

            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    },

  getAllProducts: async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);

        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
},

    getProductById: async (req, res) => {
        try {
            const product = await productService.getProductById(req.params.id);

            res.status(200).json(product);
        } catch (error) {
            const statusCode = error.message === "Product not found" ? 404 : 500;//terenary operator.

            res.status(statusCode).json({
                message: error.message
            });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await productService.updateProduct(
                req.params.id,
                req.body
            );

            res.status(200).json(product);
        } catch (error) {
            const statusCode = error.message === "Product not found" ? 404 : 400;

            res.status(statusCode).json({
                message: error.message
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const result = await productService.deleteProduct(req.params.id);

            res.status(200).json(result);
        } catch (error) {
            const statusCode = error.message === "Product not found" ? 404 : 500;

            res.status(statusCode).json({
                message: error.message
            });
        }
    }
};
// deleteProduct is an async controller function. It receives request and response objects. It takes the product ID from req.params.id and passes that ID to the service layer. await waits for the service operation to complete. If deletion is successful, the controller returns 200 OK with the result. If the product is not found, it returns 404; for other server errors, it returns 500.

module.exports = productController;