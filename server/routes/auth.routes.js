import express from 'express';
import { changePassword, editProfile, getProfile, login, logout, signup } from '../controllers/auth.controllers.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/edit-profile', protectedRoute, editProfile);
router.post('/change-password', protectedRoute, changePassword);
router.get('/logout', protectedRoute, logout);
router.get('/profile', protectedRoute, getProfile)

export default router;