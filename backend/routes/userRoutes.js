import express from "express";

import {
  login,
  getUserProfile,
  register,
} from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/profile", auth, getUserProfile);

export default router;
