import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  register_user,
  login_user,
  logout_user,
  get_current_user,
} from "../controller/auth.controller.js";

const router = express();

router.post("/register", register_user);
router.post("/login", login_user);
router.post("/logout", logout_user);
router.get("/me", authMiddleware, get_current_user);

export default router;
