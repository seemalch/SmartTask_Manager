import express from 'express';
    import { signup, login, logout, verifyEmail, checkAuth } from '../controllers/auth_controller.js';
    import { verifyToken } from "../middleware/verifyToken.js";

    const router = express.Router();
    router.get("/check-auth", verifyToken, checkAuth);
    router.post("/signup", signup);
    router.post("/login", login);
    router.post("/logout", logout);
    router.post("/verify-email", verifyEmail);
    export default router;