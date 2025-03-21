import { config } from "../Config/config";
import {connect} from "mongoose";


const connectDB = async () => {
    try {
        await connect(config.database.connectionURI);
        console.info('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error);
        process.exit(1); 
    }
};

export default connectDB;
