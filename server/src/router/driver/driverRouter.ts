import express from "express";
import * as driverAuthController from "../../controller/driverController/authController";
import * as driverController from "../../controller/driverController/driverController";
import { authCheck } from "../../middleware/authMiddleware";
const router = express.Router();

router.post("/register", driverAuthController.register);
router.post("/login", driverAuthController.login);
router.post("/docUpload", driverController.addVehicle);
router.route("/trips-booked").get(authCheck, driverController.getBookedTrips);

router
  .route("/available")
  .get(authCheck, driverController.getDriver)
  .post(authCheck, driverController.available);
router
  .route("/vehicle")
  .get(driverController.getVehicles)
  .post(authCheck, driverController.add_vehicle)
  .patch(driverController.updateVehicle)
  .delete(driverController.deleteVehicle);
router
  .route("/requests")
  .get(driverController.getRequest)
  .post(authCheck, driverController.requestAccept);
router
  .route("/ride-now")
  .get(authCheck, driverController.getRideNow)
  .patch(driverController.finishedRide);
router.route("/earnings").get(authCheck,driverController.getEarnings)

export default router;
