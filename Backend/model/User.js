import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    employeeID:{
        type:String,
        unique:true
    },
    role:{
        type:String,
        enum:["admin","employee"],
        default:"employee",
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    
})

export default mongoose.model("User",userSchema)