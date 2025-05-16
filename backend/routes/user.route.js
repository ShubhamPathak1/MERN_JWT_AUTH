import express from "express"
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, verifyEmail } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const userrouter = express.Router();

userrouter.get("/check-auth", verifyToken, checkAuth)

userrouter.post("/signup", signup)
userrouter.post("/login", login)
userrouter.post("/logout", logout)
userrouter.post("/verify-email", verifyEmail)
userrouter.post("/forgot-password", forgotPassword)
userrouter.post("/reset-password/:token", resetPassword)





export default userrouter;