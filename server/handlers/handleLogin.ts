import { comparePassword, createJWT, createRefreshJWT } from "../utils/auth";
import prisma from "../db";

export const handleLogin = async (req, res) => {
  try {
    console.log(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      include: {
        Seller: true,
        Order: true,
        Cart: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: "User does not exist" });
      return;
    }
    const isValid = await comparePassword(req.body.password, user.password);

    if (!isValid) {
      res.status(400).json({ message: "Invalid user credentials" });
      return;
    }
    //create both tokens
    const token = createJWT(user);
    const refreshToken = createRefreshJWT(user);
    //save refresh token in db
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    const responseUser = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      Seller: user.Seller,
      Order: user.Order,
      Cart: user.Cart,
    };

    //create a secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: responseUser,
      token: token,
    });
  } catch (error) {
    console.log("Error logging in user", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

export default handleLogin;
