import prisma from "../db";
export const createSeller = async (req, res) => {
    const {
        user_id,
        company_name,
        bio,
        contact_info
    } = req.body;

    const seller = await prisma.seller.create({
        data: {
            user_id: user_id,
            company_name: company_name,
            bio: bio,
            contact_info: contact_info,
        }
    });

    res.json({ seller: seller });
};

export const getSeller = async (req, res) => {
    const { id } = req.params;
    const seller = await prisma.seller.findUnique({
        where: {
            id: id,
        },
        include: {
            Product: true,
        }
    });

    res.json({ seller: seller });
};

export const getSellers = async (req, res) => {
    const sellers = await prisma.seller.findMany({
        include: {
            Product: {
                take: 3,
            }
        }
    });

    res.json({ sellers: sellers });
};

export const updateSeller = async (req, res) => {
    const { id } = req.params;
    const {
        user_id,
        company_name,
        bio,
        contact_info
    } = req.body;

    const seller = await prisma.seller.update({
        where: {
            id: id,
        },
        data: {
            user_id: user_id,
            company_name: company_name,
            bio: bio,
            contact_info: contact_info,
        }
    });

    res.json({ seller: seller });
};

export const deleteSeller = async (req, res) => {
    const { id } = req.params;
    const seller = await prisma.seller.delete({
        where: {
            id: id,
        }
    });

    res.json({ seller: seller });
};