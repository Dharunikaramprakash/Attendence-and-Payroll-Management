import express from 'express'
import { createEmployee,updateEmployee,viewAttendance,approvePayroll,getAllEmployees,getAllPayrolls,getEmployeeAttendance,getEmployeePayroll } from '../controller/admincontroller.js';


const router = express.Router()
router.post("/employee", createEmployee);
router.put("/employee/:id", updateEmployee);
router.get("/attendance",viewAttendance);
router.put("/payroll/:id/approve",approvePayroll);
router.get("/employees", getAllEmployees);
router.get("/payrolls", getAllPayrolls);
router.get("/attendance/:id", getEmployeeAttendance);
router.get("/payroll/:id", getEmployeePayroll);


export default router
