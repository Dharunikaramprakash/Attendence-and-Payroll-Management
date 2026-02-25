import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoutes from './routes/userRoutes.js'
import attendenceRoute from './routes/attendenceRoute.js'
import payrollRoutes from './routes/payrollRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
     .then(()=>{
        console.log("mongoDB connected");
        })

    .catch((err)=>{
        console.log(err);
        
    })


    const app=express()
    app.use(express.json())

    app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials:true
}))
    app.use("/user",userRoutes)
    app.use("/attendence",attendenceRoute)
    app.use("/payroll",payrollRoutes)
    app.use("/admin",adminRoutes)


    const port=3000

    app.listen(port,()=>{
        console.log(`running on ${port}`);
        
    })