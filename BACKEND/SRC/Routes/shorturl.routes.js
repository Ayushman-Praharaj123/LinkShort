import express from 'express';
const router = express.Router();
import { createShortUrl, getUserUrls, deleteUserUrl } from '../controller/short_url.controller.js';

// Create short URL
router.post("/", createShortUrl);

// Get user's URLs (authenticated route)
router.get("/urls", getUserUrls);

// Delete user's URL (authenticated route)
router.delete("/urls/:id", deleteUserUrl);

export default router;