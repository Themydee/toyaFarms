import mongoose from 'mongoose'

export const db = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected successfully': ${connection.connection.host}`)
    } catch (error) {
         console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); 
    }
}