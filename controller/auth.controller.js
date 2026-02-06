import mongoose from "mongoose";
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {JWT_SECRET,JWT_EXPIRES_IN} from '../config/env.js';


export const SignUp = async(req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name,email,password } = req.body;

        //checking if user already exits
        const existingUser = await User.findOne({email}); 

        if(existingUser){
            const error = new Error('User Already Exists');
            error.statusCode = 409;
            throw error;
        }

        //HAsh password with namak(salt)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //creating new user 
        const newUsers = await User.create([{name,email,password:hashedPassword}],{session});

        const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

    res.status(201).json({
        success:true,
        message : 'User created successfulyy',
        data:{
            token,
            user:newUsers[0],
        }
    })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const SignIn = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        //check if user hai ki nahi
        if(!user){
            const error = new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            const error = new Error('Password galat hai');
            error.statusCode=401;
            throw error;
        }

        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        res.status(200).json({
            succes:true,
            message:"User sign-in successfully",
            data:{
                token,
                user,
            }
        });

    }catch(erorr){
        next(erorr);
    }
}

export const SignOut = async(req,res,next)=>{}

