import { Router } from "express";
import {
  changePassword,
  getMe,
  login,
  logout,
  register,
  updateProfile,
} from "../../controllers/auth/auth.js";
import { protect } from "../../middlewars/authMiddlewares.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", protect, logout);
authRouter.get("/me", protect, getMe);
authRouter.put("/me", protect, updateProfile);
authRouter.put("/change-password", protect, changePassword);

export default authRouter;
