const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://anirudhhan:1%40nirudhhan@cluster0.tvnigrd.mongodb.net/anynotes?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB Atlas Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
