import express from "express";
import * as passRegController from "../../controller/passengerController/authController";
import * as passController from "../../controller/passengerController/passengerController";
import { authCheck } from "../../middleware/authMiddleware";
const router = express.Router();

router.post("/register", passRegController.register);
router.post("/login", passRegController.login);
router.get("/carCategory", passRegController.getCategory);
router
  .route("/profile")
  .get(authCheck, passController.getPassenger)
  .patch(authCheck, passController.patchPassenger);

router.route("/ride-request").get(authCheck,passController.getAcceptedRequest).post( passController.sendRequest).patch(authCheck, passController.updateShowNoti)
router.route('/getScheduledRides').get(authCheck, passController.getScheduledRides)
router.route('/getRideHistory').get(authCheck, passController.getRideHistory)

export default router;
