import prisma from "../db";
export const getBanners = async (req, res) => {
  const banners = await prisma.banner.findMany();
  const totalBanners = await prisma.banner.count();

  res.json({ total: totalBanners, banners: banners });
};

export const createBanner = async (req, res) => {
  console.log(req);
  //   try {
  //     upload.single("image")(req, res, function (err) {
  //       if (err) {
  //         console.log("Error uploading file", err);
  //         res.status(500).json({ error: "Error uploading file" });
  //         return;
  //       }
  //     });

  //     const { title, desc } = req.body;
  //     const file = req.file;

  //     if (!file) {
  //       res.status(401).json({ error: "No image uploaded" });
  //       return;
  //     }

  //     const savedBanner = await prisma.banner.create({
  //       data: {
  //         title,
  //         desc,
  //         imageUrl: `../assets/${file.originalname}'`,
  //       },
  //     });
  //     console.log("Banner created and saved to db", savedBanner);
  //     res.json({ banner: savedBanner });
  //   } catch (e) {
  //     console.log("Error creating banner", e);
  //     res.status(500).json({ error: "Error creating banner" });
  //   }
};
