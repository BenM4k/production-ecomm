import prisma from "../db";

export const createProduct = async (req, res) => {
  const { name, description, price, image, quantity, category_id, seller_id } =
    req.body;
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
};

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      Review: true,
    },
  });

  const totalProducts = await prisma.product.count();
  res.json({ total: totalProducts, products: products });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      Review: true,
    },
  });

  res.json({ product: product });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, quantity, category_id, seller_id } =
    req.body;
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
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });

  res.json({ product: product });
};

export const getStoreProducts = async (req, res) => {
  const { page, pageSize } = req.query;
  console.log(page, pageSize);

  if (page && pageSize) {
    const offset = (page - 1) * pageSize;
    const totalProducts = await prisma.product.count();
    try {
      const storeProducts = await prisma.product.findMany({
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
