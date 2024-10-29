const mongoose = require("mongoose");

exports.dbConnection = async () => {
    mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}?authSource=admin`)
        .then((res) => {
            console.log("--- Connected to Mongoose Successfully ---");
        })
        .catch((error) => {
            console.log(error, "--- Mongoose Can't Connect ---");
        });
};

