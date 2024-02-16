import prisma from "../db";
import { hashPwd } from "../utils/auth";

export const createUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const newPwd = await hashPwd(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: newPwd,
        first_name: first_name,
        last_name: last_name,
      },
    });

    res.json({ user: user });
  } catch (error) {
    console.log("Error creating user", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        first_name: true,
        last_name: true,
        email: true,
        Review: true,
        Payment: true,
        Order: true,
      },
    });
    const totalUSers = await prisma.user.count();

    res.json({ total: totalUSers, users: users });
  } catch (error) {
    console.log("Error getting all users", error);
    res.status(500).json({ error: "Error getting all users" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        Review: true,
        Payment: true,
        Order: true,
      },
    });

    res.json({ user: user });
  } catch (error) {
    console.log("Error getting user", error);
    res.status(500).json({ error: "Error getting user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, first_name, last_name } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
      },
    });
    res.json({ user: user });
  } catch (error) {
    console.log("Error updating user", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    res.json({ user: user });
  } catch (error) {
    console.log("Error deleting user", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};
