import express from "express";
import * as passRegController from "../controller/signup";
const router = express.Router();

router.post("/register", passRegController.registration);

export default router;
    