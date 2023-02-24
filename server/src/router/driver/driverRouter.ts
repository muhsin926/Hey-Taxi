import express from 'express';
import * as driverAuthController from '../../controller/driverController/authController'
import * as driverController from '../../controller/driverController/driverController'
import { authCheck } from '../../middleware/authMiddleware';
const router = express.Router();


router.post('/register', driverAuthController.register )
router.post('/login',driverAuthController.login)
router.post('/docUpload', driverController.addVehicle)
router.post('/available', authCheck, driverController.available)
router.get('/get-vehicles', driverController.getVehicles)
router.post('/add-vehicle',driverController.add_vehicle)

export default router