import mongoose from 'mongoose'

const attendenceSchema=new mongoose.Schema({
    employeeID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    date:{
        type:Date,
        default:Date.now
    },
    loginTime:Date,
    logoutTime:Date,
    workingHours:Number
    
})

export default mongoose.model("Attendence",attendenceSchema)

