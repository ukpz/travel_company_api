const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://ukpzoom4:9382492931@cluster0.ei9r8fx.mongodb.net/travel_company?retryWrites=true&w=majority&appName=Cluster0',
            {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
});

module.exports = connectDB;
