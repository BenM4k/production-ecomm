import prisma from "../db";

const handleLogout = async (req, res) => {
  try {
    const cookie = req.cookies.jwt;

    if (!cookie) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const refreshToken = cookie;

    const user = await prisma.user.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token: null,
      },
    });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Error logging out user", error);
    res.status(500).json({ error: "Error logging out user" });
  }
};

export default handleLogout;
