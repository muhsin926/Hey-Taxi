import express from "express";
import * as dashboardController from "../../controller/adminController/dashboardController";
import * as driverController from "../../controller/adminController/driverController";
import * as passengerController from "../../controller/adminController/passengerController";
import * as vehicleCategory from "../../controller/adminController/vehicleCategoryController";
import * as vehicleController from "../../controller/adminController/vehicleController";
const router = express.Router();

router
  .route("/vehicle")
  .post(vehicleController.addCategory)
  .get(vehicleController.getVehicles)
  .delete(vehicleController.deleteVehicle);
router
  .route("/driver")
  .get(driverController.getDrivers)
  .delete(driverController.deleteDriver);
router
  .route("/passenger")
  .get(passengerController.getPassenger)
  .patch(passengerController.updatePass)
  .delete(passengerController.deletePass);
router
  .route("/vehicle_category")
  .get(vehicleCategory.getCategory)
  .delete(vehicleCategory.deleteCategory);

  router.route('/getShortInfo').get(dashboardController.getShortInfo)

export default router;
