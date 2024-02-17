import prisma from "../db";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        name: name,
        description: description,
      },
    });

    res.json({ category: category });
  } catch (err) {
    console.log("Error creating category", err);
    res.status(500).json({ error: "Error creating category" });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
      include: {
        Product: true,
      },
    });
    res.json({ category: category });
  } catch (error) {
    console.log("Error getting category", error);
    res.status(500).json({ error: "Error getting category" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    const totalCategories = await prisma.category.count();

    res.json({ total: totalCategories, categories: categories });
  } catch (error) {
    console.log("Error getting all the categories", error);
    res.status(500).json({ error: "Error getting all the categories" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
      },
    });

    res.json({ category: category });
  } catch (error) {
    console.log("Error updating category", error);
    res.status(500).json({ error: "Error updating category" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    });

    res.json({ category: category });
  } catch (error) {
    console.log("Error deleting category", error);
    res.status(500).json({ error: "Error deleting category" });
  }
};
