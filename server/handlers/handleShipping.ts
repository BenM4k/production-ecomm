import prisma from "../db";

export const createShipping = async (req, res) => {
    const {
        order_id,
        address,
        tracking_number,
    } = req.body;

    const shipping = await prisma.shipping.create({
        data: {
            order_id: order_id,
            address: address,
            tracking_number: tracking_number,
        }
    });

    res.json({ shipping: shipping });
};

export const getShipping = async (req, res) => {
    const { id } = req.params;
    const shipping = await prisma.shipping.findUnique({
        where: {
            id: id,
        }
    });

    res.json({ shipping: shipping });
};

export const getShippings = async (req, res) => {
    const shippings = await prisma.shipping.findMany();

    res.json({ shippings: shippings });
};

export const updateShipping = async (req, res) => {
    const { id } = req.params;
    const {
        order_id,
        address,
        tracking_number,
    } = req.body;

    const shipping = await prisma.shipping.update({
        where: {
            id: id,
        },
        data: {
            order_id: order_id,
            address: address,
            tracking_number: tracking_number,
        }
    });

    res.json({ shipping: shipping });
};

export const deleteShipping = async (req, res) => {
    const { id } = req.params;
    const shipping = await prisma.shipping.delete({
        where: {
            id: id,
        }
    });

    res.json({ shipping: shipping });
};