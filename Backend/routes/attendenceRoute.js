import express from "express";
import { loginAttendance,logoutAttendance,myMonthlyAttendance } from "../controller/attendencecontroller.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router()

router.post("/login",verifyUser,loginAttendance);
router.post("/logout",verifyUser,logoutAttendance);
router.get("/my",verifyUser,myMonthlyAttendance);

export default router
