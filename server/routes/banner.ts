import express from "express";
import { getBanners, createBanner } from "../handlers/handleBanners";
import multer from "multer";
import path from "path";
import { isAdmin } from "../utils/auth";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../client/src/assets/banners"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/banners", isAdmin, getBanners);
router.post("/banners", isAdmin, upload.single("file"), createBanner);

export default router;
