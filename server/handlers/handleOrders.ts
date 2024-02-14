import prisma from "../db";

export const createOrder = async (req, res) => {
  const {
    user_id,
    order_date,
    total_amount,
    order_detail_data,
    shipping_data,
  } = req.body;

  const order = await prisma.order.create({
    data: {
      user_id: user_id,
      order_date: order_date,
      total_amount: total_amount,
      OrderDetail: {
        createMany: {
          data: order_detail_data,
        },
      },
      Shipping: {
        create: shipping_data,
      },
    },
  });

  res.json({ order: order });
};

export const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      OrderDetail: true,
      Shipping: true,
    },
  });
  const totalOrders = await prisma.order.count();

  res.json({ total: totalOrders, orders: orders });
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
    include: {
      OrderDetail: true,
    },
  });

  res.json({ order: order });
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { user_id, order_date, total_amount, order_status } = req.body;

  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      user_id: user_id,
      order_date: order_date,
      total_amount: total_amount,
      order_status: order_status,
    },
  });

  res.json({ order: order });
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.delete({
    where: {
      id: id,
    },
  });

  res.json({ order: order });
};
