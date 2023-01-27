import express from "express";
import * as passRegController from "../controller/signup";
const router = express.Router();

router.post("/register", passRegController.register);
router.post("/login", passRegController.login);

export default router;
    