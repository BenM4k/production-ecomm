import express from "express";
import { body } from "express-validator";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../handlers/handleCategories";
import { handleInputErrors } from "../middlewares/validate";
import { isAdmin } from "../utils/auth";

const router = express.Router();

router.get("/categories", getCategories);
router.post(
  "/categories",
  body("name").isString(),
  handleInputErrors,
  isAdmin,
  createCategory
);
router.get("/categories/:id", getCategory);
router.put(
  "/categories/:id",
  body("name").optional().isString(),
  handleInputErrors,
  isAdmin,
  updateCategory
);
router.delete("/categories/:id", isAdmin, deleteCategory);

export default router;
