import prisma from "../db";

export const createPayment = async (req, res) => {
    const {
        user_id,
        order_id,
        date,
        amount,
    } = req.body;

    const payment = await prisma.payment.create({
        data: {
            user_id: user_id,
            order_id: order_id,
            date: date,
            amount: amount,
        }
    });

    res.json({ payment: payment });
};

export const getPayment = async (req, res) => {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
        where: {
            id: id,
        }
    });

    res.json({ payment: payment });
};

export const getPayments = async (req, res) => {
    const payments = await prisma.payment.findMany();

    res.json({ payments: payments });
};

export const updatePayment = async (req, res) => {
    const { id } = req.params;
    const {
        user_id,
        order_id,
        date,
        amount,
    } = req.body;

    const payment = await prisma.payment.update({
        where: {
            id: id,
        },
        data: {
            user_id: user_id,
            order_id: order_id,
            date: date,
            amount: amount,
        }
    });

    res.json({ payment: payment });
};

export const deletePayment = async (req, res) => {
    const { id } = req.params;
    const payment = await prisma.payment.delete({
        where: {
            id: id,
        }
    });

    res.json({ payment: payment });
};