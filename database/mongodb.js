import mongoose from 'mongoose';

import {DB_URI,NODE_ENV} from '../config/env.js';

if(!DB_URI){
    throw new Error('DB_URI is not defined in environment varibales , check .env.<development/production>.local file');
}

//connect to mongodb 

const connectDB = async()=>{
    try{
        await mongoose.connect(DB_URI);
    }catch(error){
        console.error('Error connecting to mongodb',error);
        process.exit(1);
    }
}

export default connectDB;