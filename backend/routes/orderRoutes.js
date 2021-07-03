import express from "express";

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", [auth, admin], getOrders);
router.post("/", auth, addOrderItems);
router.get("/myorders", auth, getMyOrders);
router.get("/:id", auth, getOrderById);
router.put("/:id/deliver", [auth, admin], updateOrderToDelivered);
router.put("/:id/pay", auth, updateOrderToPaid);

export default router;
