import express from 'express';
import { AuthController } from './auth.controller.js'

const router = express.Router();

router.route('/signup').post([AuthController.signUpController])
router.route('/signin').post([AuthController.signInController])

export { router as AuthRouterService }