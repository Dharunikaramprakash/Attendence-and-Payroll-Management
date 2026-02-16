import express  from 'express'
import { generatePayroll,myPayroll } from '../controller/payrollController.js';
import { verifyUser } from '../middleware/auth.js';

const router=express.Router()
router.post("/generate",verifyUser, generatePayroll);
router.get("/my", verifyUser,myPayroll);

export default router
