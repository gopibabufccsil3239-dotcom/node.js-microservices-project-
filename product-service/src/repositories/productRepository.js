const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = require("../models/Product")(sequelize, DataTypes);


const productRepository = {           //teh create a product repository object.which is defined the
    create: async (productData) => {
        return Product.create(productData);
    },

    findAll: async ({
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "DESC"
} = {}) => {
    const offset = (page - 1) * limit;

    return Product.findAndCountAll({
        limit,
        offset,
        order: [[sortBy, order]]
    });
},
findAbovePrice: async (minimumPrice) => {
    const [products] = await sequelize.query(
        `
        SELECT *
        FROM products
        WHERE price > :minimumPrice
        ORDER BY price ASC
        `,
        {
            replacements: {
                minimumPrice
            }
        }
    );

    return products;
},

    findById: async (id) => {
        return Product.findByPk(id);
    },

    update: async (id, productData) => {
        const product = await Product.findByPk(id);

        if (!product) {
            return null;
        }

        return product.update(productData);
    },

    delete: async (id) => {
        const product = await Product.findByPk(id);

        if (!product) {
            return false;
        }

        await product.destroy();
        return true;
    }
};

module.exports = productRepository;