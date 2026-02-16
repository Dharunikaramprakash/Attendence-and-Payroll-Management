import express from 'express'
import  { loginController } from '../controller/usercontroller.js'


const router = express.Router()


router.post("/login",loginController)


export default router