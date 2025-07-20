import express from 'express';
import { register_user, login_user, logout_user } from '../controller/auth.controller.js';
import warpAsync from '../utils/tryCatchWrapper.js';
const router = express.Router();
router.post("/register", register_user);
router.post("/login", login_user);
router.post("/logout", logout_user);
export default router;