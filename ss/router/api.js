import express from "express";
import userController from "../controller/userController.js";

const router = express.Router()

router.post('/signUp',userController.postSingUp)


export default router