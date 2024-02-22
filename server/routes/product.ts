import express from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validate";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getStoreProducts,
  updateProduct,
} from "../handlers/handleProducts";
import { isAdmin } from "../utils/auth";

const router = express.Router();

router.get("/store-products", getStoreProducts);
router.get("/products", getProducts);
router.post(
  "/products",
  body("name").isString(),
  body("price").isNumeric(),
  body("description").isString(),
  body("image").isString(),
  body("quantity").isNumeric(),
  handleInputErrors,
  isAdmin,
  createProduct
);
router.get("/products/:id", getProduct);
router.put(
  "/products/:id",
  body("name").optional().isString(),
  body("price").optional().isNumeric(),
  body("description").optional().isString(),
  body("image").optional().isString(),
  body("quantity").optional().isNumeric(),
  handleInputErrors,
  isAdmin,
  updateProduct
);
router.delete("/products/:id", isAdmin, deleteProduct);

export default router;
