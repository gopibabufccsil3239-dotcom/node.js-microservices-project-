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
     getAllProducts: async ({
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "DESC"
} = {}) => {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const sortOrder = String(order).toUpperCase();

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        throw new Error("Page must be a positive number");
    }

    if (!Number.isInteger(limitNumber) || limitNumber < 1 || limitNumber > 100) {
        throw new Error("Limit must be between 1 and 100");
    }

    const allowedSortFields = [
        "id",
        "name",
        "price",
        "stock",
        "createdAt",
        "updatedAt"
    ];

    if (!allowedSortFields.includes(sortBy)) {
        throw new Error("Invalid sort field");
    }

    if (!["ASC", "DESC"].includes(sortOrder)) {
        throw new Error("Order must be ASC or DESC");
    }

    const result = await productRepository.findAll({
        page: pageNumber,
        limit: limitNumber,
        sortBy,
        order: sortOrder
    });

    const products = result.rows.map((product) => product.toJSON());

    return {
        data: products,
        pagination: {
            totalItems: result.count,
            currentPage: pageNumber,
            pageSize: limitNumber,
            totalPages: Math.ceil(result.count / limitNumber)
        }
    };
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