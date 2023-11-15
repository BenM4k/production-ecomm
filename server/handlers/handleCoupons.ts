import prisma from "../db";
export const createCoupon = async (req, res) => {
    const {
        code,
        discount,
        expiry_date,
        order_id,
        product_id,
    } = req.body;

    const coupon = await prisma.coupon.create({
        data: {
            code: code,
            discount: discount,
            expiry_date: expiry_date,
            order_id: order_id,
            product_id: product_id,
        }
    });

    res.json({ coupon: coupon });
};

export const getCoupon = async (req, res) => {
    const { id } = req.params;
    const coupon = await prisma.coupon.findUnique({
        where: {
            id: id,
        }
    });

    res.json({ coupon: coupon });
};

export const getCoupons = async (req, res) => {
    const coupons = await prisma.coupon.findMany();

    res.json({ coupons: coupons });
};

export const updateCoupon = async (req, res) => {
    const { id } = req.params;
    const {
        code,
        discount,
        expiry_date,
        order_id,
        product_id,
    } = req.body;

    const coupon = await prisma.coupon.update({
        where: {
            id: id,
        },
        data: {
            code: code,
            discount: discount,
            expiry_date: expiry_date,
            order_id: order_id,
            product_id: product_id,
        }
    });

    res.json({ coupon: coupon });
};

export const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    const coupon = await prisma.coupon.delete({
        where: {
            id: id,
        }
    });

    res.json({ coupon: coupon });
};