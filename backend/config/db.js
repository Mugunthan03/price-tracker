const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_DB);
        console.log('DB connected');
    } catch (error) {
        console.error('Connection failed', error);
    }
};

module.exports = connectDB;
