import express from "express";
import { body } from "express-validator";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../handlers/handleUsers";
import { handleInputErrors } from "../middlewares/validate";
import { isAdmin, protect } from "../utils/auth";

const router = express.Router();

router.get("/users", isAdmin, getUsers);
router.post(
  "/users",
  body("first_name").isString(),
  body("last_name").isString(),
  body("email").isEmail(),
  body("password").isString(),
  handleInputErrors,
  isAdmin,
  createUser
);
router.get("/users/:id", isAdmin, getUser);
router.put(
  "/users/:id",
  body("first_name").optional().isString(),
  body("last_name").optional().isString(),
  body("email").optional().isEmail(),
  body("password").optional().isString(),
  handleInputErrors,
  protect,
  updateUser
);
router.delete("/users/:id", protect, deleteUser);

export default router;
