import express from 'express';
import * as driverAuthController from '../controller/driverController/authController'
const router = express.Router();


router.post('/register', driverAuthController.register )
router.post('/login',driverAuthController.login)

export default router