import prisma from "../db";
export const createSeller = async (req, res) => {
  const { user_id, company_name, bio, contact_info } = req.body;

  try {
    const seller = await prisma.seller.create({
      data: {
        user_id: user_id,
        company_name: company_name,
        bio: bio,
        contact_info: contact_info,
      },
    });

    res.json({ seller: seller });
  } catch (error) {
    console.log("Error creating seller", error);
    res.status(500).json({ error: "Error creating seller" });
  }
};

export const getSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await prisma.seller.findUnique({
      where: {
        id: id,
      },
      include: {
        Product: true,
      },
    });

    res.json({ seller: seller });
  } catch (error) {
    console.log("Error getting seller", error);
    res.status(500).json({ error: "Error getting seller" });
  }
};

export const getSellers = async (req, res) => {
  try {
    const sellers = await prisma.seller.findMany({
      include: {
        Product: {
          take: 3,
        },
      },
    });

    res.json({ sellers: sellers });
  } catch (error) {
    console.log("Error getting all sellers", error);
    res.status(500).json({ error: "Error getting all sellers" });
  }
};

export const updateSeller = async (req, res) => {
  const { id } = req.params;
  const { user_id, company_name, bio, contact_info } = req.body;

  try {
    const seller = await prisma.seller.update({
      where: {
        id: id,
      },
      data: {
        user_id: user_id,
        company_name: company_name,
        bio: bio,
        contact_info: contact_info,
      },
    });

    res.json({ seller: seller });
  } catch (error) {
    console.log("Error updating seller", error);
    res.status(500).json({ error: "Error updating seller" });
  }
};

export const deleteSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await prisma.seller.delete({
      where: {
        id: id,
      },
    });

    res.json({ seller: seller });
  } catch (error) {
    console.log("Error deleting seller", error);
    res.status(500).json({ error: "Error deleting seller" });
  }
};
