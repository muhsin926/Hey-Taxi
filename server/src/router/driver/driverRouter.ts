import express from "express";
import * as driverAuthController from "../../controller/driverController/authController";
import * as driverController from "../../controller/driverController/driverController";
import { authCheck } from "../../middleware/authMiddleware";
const router = express.Router();

router.post("/register", driverAuthController.register);
router.post("/login", driverAuthController.login);
router.post("/docUpload", driverController.addVehicle);
router.post("/available", authCheck, driverController.available);
router
  .route("/vehicle")
  .get(driverController.getVehicles)
  .post(authCheck,driverController.add_vehicle)
  .patch(driverController.updateVehicle)
  .delete(driverController.deleteVehicle);

export default router;
