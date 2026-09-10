const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

const { DataTypes } = require("sequelize");
const Product = require("./models/Product")(sequelize, DataTypes);//these all are the packages.

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Product Service is running");
});

sequelize.authenticate() //test the database connection
    .then(() => { //if connection or username or evrything is ok then it execute the console.
        console.log("Database connected successfully");//showing in the terminal.

        return sequelize.sync();//sync the db tables.
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