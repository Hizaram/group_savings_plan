import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
 
const connectDB: () => Promise<void> = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/group-savings-plan", {
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDB;