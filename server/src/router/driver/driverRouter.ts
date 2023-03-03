import express from "express";
import * as driverAuthController from "../../controller/driverController/authController";
import * as chatController from "../../controller/driverController/chatController";
import * as driverController from "../../controller/driverController/driverController";
import { authCheck } from "../../middleware/authMiddleware";
const router = express.Router();

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

router
  .route("/profile")
  .get(authCheck, driverController.getDriver)
  .patch(authCheck, driverController.updateDriver);

router
  .route("/chat")
  .get(authCheck, chatController.getMsgs)
  .post(authCheck, chatController.sendMsg);

router.route("/getChater").get(authCheck, chatController.getPassengers);
router.route("/earnings").get(authCheck, driverController.getEarnings);
router.route("/trip-history").get(authCheck, driverController.getTripHistory);
router.post("/register", driverAuthController.register);
router.post("/login", driverAuthController.login);
router.post("/docUpload", authCheck, driverController.addVehicle);
router.route("/trips-booked").get(authCheck, driverController.getBookedTrips);
export default router;
