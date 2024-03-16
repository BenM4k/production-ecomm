import prisma from "../db";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      quantity,
      category_id,
      seller_id,
    } = req.body;
    console.log(req.body);
    const product = await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        image: image,
        quantity: quantity,
        category_id: category_id,
        seller_id: seller_id,
      },
    });

    res.json({ product: product });
  } catch (error) {
    console.log("Error creating product", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        Review: {
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const totalProducts = await prisma.product.count();
    res.json({ total: totalProducts, products: products });
  } catch (error) {
    console.log("Error getting products", error);
    res.status(500).json({ error: "Error getting products" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        Review: {
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      res.status(400).json({ error: "Product not found" });
      return;
    }

    const suggestedProducts = await prisma.product.findMany({
      where: {
        category_id: product.category_id,
        NOT: {
          id: id,
        },
      },
      take: 4,
    });

    res.json({ product: product, suggestedProducts });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Error while getting product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      image,
      quantity,
      category_id,
      seller_id,
    } = req.body;
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        price: price,
        image: image,
        quantity: quantity,
        category_id: category_id,
        seller_id: seller_id,
      },
    });

    res.json({ product: product });
  } catch (error) {
    console.log("Error updating product", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    res.json({ product: product });
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

export const getStoreProducts = async (req, res) => {
  const { page, pageSize, range } = req.query;
  const productsRange = {
    all: {
      lt: 9000,
      gt: 0,
    },
    first: {
      lt: 200,
      gt: 0,
    },
    sec: {
      lt: 400,
      gt: 200,
    },
    third: {
      lt: 600,
      gt: 400,
    },
    fourth: {
      lt: 800,
      gt: 600,
    },
    fifth: {
      lt: 9000,
      gt: 800,
    },
  };

  if (page && pageSize && range) {
    const offset = (page - 1) * pageSize;
    const totalProducts = await prisma.product.count();
    try {
      const storeProducts = await prisma.product.findMany({
        where: {
          price: {
            gt: productsRange[range].gt,
            lt: productsRange[range].lt,
          },
        },
        skip: offset,
        take: parseInt(pageSize),
      });
      res.json({ total: totalProducts, products: storeProducts });
    } catch (e) {
      console.log("Error fetching products: ", e);
      res.status(500).json({ error: "Error fetching products" });
    }
  }
};
