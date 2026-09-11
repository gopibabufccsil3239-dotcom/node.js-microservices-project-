const productRepository = require("../repositories/productRepository");

const productService = {
    createProduct: async (productData) => {
        const { name, price, stock } = productData;

        if (!name || name.trim() === "") {
            throw new Error("Product name is required");
        }

        if (price === undefined || price === null || price < 0) {
            throw new Error("Product price must be zero or greater");
        }

        if (stock === undefined || stock === null || stock < 0) {
            throw new Error("Product stock must be zero or greater");
        }

        return productRepository.create({
            name: name.trim(),
            price,
            stock
        });
    },

    getAllProducts: async () => {
        return productRepository.findAll();
    },

    getProductById: async (id) => {
        const product = await productRepository.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    },

    updateProduct: async (id, productData) => {
        const product = await productRepository.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        if (productData.price !== undefined && productData.price < 0) {
            throw new Error("Product price must be zero or greater");
        }

        if (productData.stock !== undefined && productData.stock < 0) {
            throw new Error("Product stock must be zero or greater");
        }

        return productRepository.update(id, productData);
    },

    deleteProduct: async (id) => {
        const product = await productRepository.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        await productRepository.delete(id);

        return {
            message: "Product deleted successfully"
        };
    }
};

module.exports = productService;