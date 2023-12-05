import prisma from "../db";

export const addToCart = async (req, res) => {
    const {
        user_id,
        product_id,
        quantity,
    } = req.body;

    const cart = await prisma.cart.create({
        data: {
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
        }
    });

    res.json({ cart: cart });
};

export const getCart = async (req, res) => {
    const { id } = req.params;
    const carts = await prisma.cart.findMany({
        where: {
            user_id: id,
        },
    });

    res.json({ carts: carts });
};

export const deleteCart = async (req, res) => {
    const { id } = req.params;
    const cart = await prisma.cart.delete({
        where: {
            id: id,
        }
    });

    res.json({ cart: cart });
};

export const updateCart = async (req, res) => {
    const { id } = req.params;
    const {
        user_id,
        product_id,
        quantity,
    } = req.body;

    const cart = await prisma.cart.update({
        where: {
            id: id,
        },
        data: {
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
        }
    });

    res.json({ cart: cart });
};

export const getCartTotal = async (req, res) => {
    const carts = await prisma.cart.findMany();

    res.json({ carts: carts });
};