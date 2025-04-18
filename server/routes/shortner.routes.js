import express from 'express';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { createShortURL, getShortURLs, redirectToShortLink } from '../controllers/shortner.controller.js';

const router = express.Router();

router.get('/get-all-short-urls', protectedRoute, getShortURLs);
router.post('/create-short-url', protectedRoute, createShortURL);
router.get("/:shortCode", redirectToShortLink);

export default router;