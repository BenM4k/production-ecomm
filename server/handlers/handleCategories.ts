import prisma from "../db";

export const createCategory = async (req, res) => {
    const { name } = req.body;
    const category = await prisma.category.create({
        data: {
            name: name,
        }
    });

    res.json({ category: category });
};

export const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
    });

    res.json({ category: category });
};

export const getCategories = async (req, res) => {
    const categories = await prisma.category.findMany();

    res.json({ categories: categories });
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await prisma.category.update({
        where: {
            id: id,
        },
        data: {
            name: name,
        }
    });

    res.json({ category: category });
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await prisma.category.delete({
        where: {
            id: id,
        }
    });

    res.json({ category: category });
};
