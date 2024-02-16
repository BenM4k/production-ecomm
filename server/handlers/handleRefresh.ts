import prisma from "../db";
import jwt from "jsonwebtoken";
import { createJWT } from "../utils/auth";

const handleRefreshToken = async (req, res) => {
  try {
    const cookie = req.cookies.jwt;

    if (!cookie) {
      res
        .status(401)
        .json({ message: "could not find a refresh token cookie" });
      return;
    }

    const refreshToken = cookie;
    const user = await prisma.user.findFirst({
      where: {
        refresh_token: refreshToken,
      },
      include: {
        Seller: true,
        Cart: true,
        Order: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid user Token" });
      return;
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
      if (err || user.email !== decoded.email) return res.sendStatus(403);
      const token = createJWT(user);
      const responseUser = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        Seller: user.Seller,
        Cart: user.Cart,
        Order: user.Order,
      };
      res.json({
        user: responseUser,
        token: token,
      });
    });
  } catch (error) {
    console.log("Error refreshing user", error);
    res.status(500).json({ error: "Error refreshing user" });
  }
};

export default handleRefreshToken;
