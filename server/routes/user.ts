import express from "express";
import { body } from "express-validator";
import handleLogin from "../handlers/handleLogin";
import handleLogout from "../handlers/handleLogout";
import handleRefreshToken from "../handlers/handleRefresh";
import handleRegistration from "../handlers/handleRegister";
import { handleInputErrors } from "../middlewares/validate";
import { protect } from "../utils/auth";

const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  handleInputErrors,
  handleLogin
);
router.post("/logout", handleLogout);
router.get("/refresh", handleRefreshToken);
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  body("first_name").isLength({ min: 2 }).isString(),
  body("last_name").isLength({ min: 2 }).isString(),
  handleInputErrors,
  handleRegistration
);

export default router;
