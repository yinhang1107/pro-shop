import express from "express";

import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/top", getTopProducts);
router.get("/:id", getProduct);
router.post("/", [auth, admin], createProduct);
router.post("/:id/reviews", [auth], createProductReview);
router.put("/:id", [auth, admin], updateProduct);
router.delete("/:id", [auth, admin], deleteProduct);

export default router;
