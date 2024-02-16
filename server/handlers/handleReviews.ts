import prisma from "../db";

export const createReview = async (req, res) => {
  const { user_id, product_id, rating, comment } = req.body;

  const review = await prisma.review.create({
    data: {
      user_id: user_id,
      product_id: product_id,
      rating: rating,
      comment: comment,
    },
  });

  res.json({ review: review });
};

export const getReview = async (req, res) => {
  const { id } = req.params;
  const review = await prisma.review.findUnique({
    where: {
      id: id,
    },
  });

  res.json({ review: review });
};

export const getReviews = async (req, res) => {
  const reviews = await prisma.review.findMany({
    include: {
      user: {
        select: {
          first_name: true,
          last_name: true,
          email: true,
        },
      },
    },
  });
  const totalReviews = await prisma.review.count();
  res.json({ total: totalReviews, reviews: reviews });
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { user_id, product_id, rating, comment } = req.body;

  const review = await prisma.review.update({
    where: {
      id: id,
    },
    data: {
      user_id: user_id,
      product_id: product_id,
      rating: rating,
      comment: comment,
    },
  });

  res.json({ review: review });
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await prisma.review.delete({
    where: {
      id: id,
    },
  });

  res.json({ review: review });
};
