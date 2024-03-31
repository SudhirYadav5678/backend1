import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
// database connection
const connectDB= async function(){
    try {
        const connectionInstances=await mongoose.connect(`${process.env.MONOGO_URI || 8000}/${DB_NAME}`);
        console.log(`MongoDB connected ${connectionInstances.connection.host}`);
    } catch (error) {
        console.log("Error  connecting to database: ", error);
        process.exit(1)
    }
}

export default connectDB