import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
const saltRounds=10;

export const signup=async (req,res)=>{
    const {username,email,password}=req.body;

    const hashedPassword=bcryptjs.hashSync(password,saltRounds);

    const newUser=new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json(`user created successfully!`)
    } catch (error) {
        res.status(500).json(error.message);
    }
};