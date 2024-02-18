import express from "express";
import { body } from "express-validator";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../handlers/handleOrders";
import { handleInputErrors } from "../middlewares/validate";
import { protect } from "../utils/auth";

const router = express.Router();

router.get("/orders", getOrders);
router.post(
  "/orders",
  body("total_amount").isNumeric(),
  handleInputErrors,
  createOrder
);
router.get("/orders/:id", protect, getOrder);
router.put(
  "/orders/:id",
  body("total_amount").optional().isNumeric(),
  body("order_status").optional().isString(),
  handleInputErrors,
  updateOrder
);
router.delete("/orders/:id", deleteOrder);

export default router;
