const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

const { DataTypes } = require("sequelize");
const Product = require("./models/Product")(sequelize, DataTypes);

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Product Service is running");
});

sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");

        return sequelize.sync();
    })
    .then(() => {
        console.log("Database tables synchronized");

        app.listen(PORT, () => {
            console.log(`Product Service running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });