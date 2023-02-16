import express from "express";
import { addCategory } from "../../controller/adminController/vehicleController";
const router = express.Router();

router.route("/").post(addCategory);

export default router;
