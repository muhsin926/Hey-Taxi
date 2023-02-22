import express from "express";
import { getDrivers } from "../../controller/adminController/driverController";
import { addCategory, deleteDriver } from "../../controller/adminController/vehicleController";
const router = express.Router();

router.route("/vehicle").post(addCategory);
router.route("/driver").get(getDrivers).delete( deleteDriver)

export default router;
