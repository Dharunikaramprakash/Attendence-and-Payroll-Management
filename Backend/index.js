import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";

import userRoutes from './routes/userRoutes.js'
import attendenceRoute from './routes/attendenceRoute.js'
import payrollRoutes from './routes/payrollRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    })

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// Middleware
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true
}))

// API Routes
app.use("/user", userRoutes)
app.use("/attendence", attendenceRoute)
app.use("/payroll", payrollRoutes)
app.use("/admin", adminRoutes)

// Serve frontend build
app.use(express.static(path.join(__dirname, "../Frontend/dist")))

// ✅ FIXED: Catch-all route (IMPORTANT)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// Server
const port = 3000

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})