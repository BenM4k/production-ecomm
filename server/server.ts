import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import corsOptions from "./config/corsOptions";
import { protect } from "./utils/auth";

import userRoute from "./routes/user";
import apiUserRoute from "./routes/apiUser";
import cartRoute from "./routes/cart";
import categoryRoute from "./routes/category";
import couponRoute from "./routes/coupons";
import orderRoute from "./routes/order";
import paymentRoute from "./routes/payments";
import productRoute from "./routes/product";
import reviewRoute from "./routes/review";
import shippingRoute from "./routes/shipping";
import sellerRoute from "./routes/seller";
import bannerRoute from "./routes/banner";

dotenv.config();

const app = express();

//log requests
app.use(morgan("dev"));
//allow origins
app.use(cors(corsOptions));
//handle preflight requests
app.options("*", cors(corsOptions));
//allow json and urlencoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware for parsing cookies
app.use(cookieParser());

//routes
app.use("/", userRoute);
//api routes
app.use("/api/v1", apiUserRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", couponRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", reviewRoute);
app.use("/api/v1", shippingRoute);
app.use("/api/v1", sellerRoute);
app.use("/api/v1", bannerRoute);
//home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//catch all other routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Wrong URL | Check your method" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
