import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import "dotenv/config"

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    }
})

const generateJwtToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
}

const User=mongoose.model('user',userSchema)
export {User,generateJwtToken}