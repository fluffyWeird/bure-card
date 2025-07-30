import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export async function connectdb(){
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.log('MONGO_URI not set, skipping database connection');
            return;
        }
        await mongoose.connect(mongoUri);
        console.log('db connection successful');
    } catch (error) {
        console.log('Database connection error:', error);
        console.log('Continuing without database connection...');
    }
}