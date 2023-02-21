import express from "express";
import * as passRegController from "../../controller/passengerController/authController";
import * as passController from "../../controller/passengerController/passengerController"
import { auth } from "../../middleware/auth";
const router = express.Router();

router.post("/register", passRegController.register);
router.post("/login", passRegController.login);
router.get('/carCategory',passRegController.getCategory)
router.post('ride-request',auth,passController.rideRequest)

export default router;
    