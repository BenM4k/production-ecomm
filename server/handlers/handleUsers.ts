import prisma from "../db";
import { hashPwd } from "../utils/auth";

export const createUser = async (req, res) => {
    const {
        email,
        password,
        first_name,
        last_name,
    } = req.body;

    const newPwd = await hashPwd(password);

    const user = await prisma.user.create({
        data: {
            email: email,
            password: newPwd,
            first_name: first_name,
            last_name: last_name,
        }
    });

    res.json({ user: user });
};

export const getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        include:{
            Review: true,
            Cart: true,
            Payment: true,
            Order: true,
        }
    });

    res.json({ users: users });
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include:{
            Review: true,
            Cart: true,
            Payment: true,
            Order: true,
        }
    });

    res.json({ user: user });
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        email,
        password,
        first_name,
        last_name,
    } = req.body;
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
        }
    });
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: id,
        }
    });

    res.json({ user: user });
};