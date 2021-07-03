import express from "express";

import {
  login,
  getUserProfile,
  register,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", [auth, admin], getUsers);
router.post("/", register);
router.post("/login", login);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);
router.get("/:id", [auth, admin], getUserById);
router.put("/:id", [auth, admin], updateUser);
router.delete("/:id", [auth, admin], deleteUser);

export default router;
