import prisma from "../db";

export const createReview = async (req, res) => {
  const { user_id, product_id, rating, comment } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        user_id: user_id,
        product_id: product_id,
        rating: rating,
        comment: comment,
      },
    });

    res.json({ review: review });
  } catch (error) {
    console.log("Error creating review", error);
    res.status(500).json({ error: "Error creating review" });
  }
};

export const getReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: id,
      },
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

    res.json({ review: review });
  } catch (error) {
    console.log("Error getting review", error);
    res.status(500).json({ error: "Error getting review" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });
    const totalReviews = await prisma.review.count();
    res.json({ total: totalReviews, reviews: reviews });
  } catch (error) {
    console.log("Error getting all reviews", error);
    res.status(500).json({ error: "Error getting all reviews" });
  }
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { user_id, product_id, rating, comment } = req.body;

  try {
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
  } catch (error) {
    console.log("Error updating review", error);
    res.status(500).json({ error: "Error updating review" });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.delete({
      where: {
        id: id,
      },
    });

    res.json({ review: review });
  } catch (error) {
    console.log("Error deleting review", error);
    res.status(500).json({ error: "Error deleting review" });
  }
};
