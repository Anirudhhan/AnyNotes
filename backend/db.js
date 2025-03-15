const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/myDatabase"; // Specify database name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectToMongo;
