import express from 'express';
import * as driverAuthController from '../controller/driverController/authController'
import * as driverController from '../controller/driverController/driverController'
const router = express.Router();


router.post('/register', driverAuthController.register )
router.post('/login',driverAuthController.login)
router.post('/docUpload', driverController.addVehicle)
router.post('/available', driverController.available)

export default router