import express from 'express';
const router = express.Router();
import { createShortUrl } from '../controller/short_url.controller.js';
router.post("/",createShortUrl);



export default router;