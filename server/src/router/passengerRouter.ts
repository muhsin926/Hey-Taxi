import express from "express";
import * as passRegController from "../controller/authController";
import { authenticateToken } from "../middleware/auth";
const router = express.Router();

router.post("/register", passRegController.register);
router.post("/login", passRegController.login);
router.post("/authCheck", authenticateToken)
router.get('/carCategory',passRegController.getCategory)

export default router;
    