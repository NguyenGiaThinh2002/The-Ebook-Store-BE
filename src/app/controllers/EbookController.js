const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
require("dotenv").config();
const { getPrismaClient } = require("../../lib/prismaClients");

class EBookController {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const region = req.headers.region || "japan";
      const prisma = getPrismaClient(region);
      const existingUser = await prisma.users.findUnique({ where: { email } });

      if (existingUser) {
        res
          .status(400)
          .json({ message: "❌ Email already in use", error: err.message });
      }

      const newUser = await prisma.users.create({
        data: {
          name,
          email,
          password, // ⚠️ Hash passwords in production
          region,
        },
      });

      console.log("✅ User created:", newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      res
        .status(400)
        .json({ message: "❌ Failed to create user", error: err.message });
    }
  }

  // Add this function inside the same controller class or module
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const VietnamPrisma = getPrismaClient("vietnam");
      const JapanPrisma = getPrismaClient("japan");

      // Find user in Vietnam first
      const vietnamUser = await VietnamPrisma.users.findUnique({
        where: { email },
      });

      // If not found in Vietnam, try Japan
      const japanUser = vietnamUser
        ? null
        : await JapanPrisma.users.findUnique({
            where: { email },
          });

      const user = vietnamUser || japanUser;

      if (!user) {
        return res.status(404).json({ message: "❌ User not found" });
      }

      // Compare passwords (assuming plain-text, but you should hash this in real apps)
      if (user.password !== password) {
        return res.status(401).json({ message: "❌ Invalid credentials" });
      }

      // ✅ Successful login
      return res.status(200).json({
        message: "✅ Login successful",
        user,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ message: "❌ Failed to login", error: error.message });
    }
  }

  async getUserBalance(req, res) {
    try {
      const { id } = req.params;
      console.log("id", id);
      const region = req.headers.region || "japan";
      const prisma = getPrismaClient(region);
      const pointRecord = await prisma.points.findUnique({
        where: {
          user_id: parseInt(id),
        },
        select: {
          balance: true,
        },
      });

      if (!pointRecord) {
        return res
          .status(404)
          .json({ message: "User not found in points table" });
      }

      return res.status(200).json({ balance: pointRecord.balance });
    } catch (error) {
      console.error("Error fetching user balance:", error);
      return res.status(500).json({ message: "Error fetching user balance" });
    }
  }

  async updateUserBalance(req, res) {
    try {
      const { id } = req.params;
      const { point } = req.body;
      const region = req.headers.region || "japan";
      const prisma = getPrismaClient(region);

      if (typeof point !== "number") {
        return res
          .status(400)
          .json({ message: "Invalid 'point' value. It must be a number." });
      }

      const userId = parseInt(id);

      // Find current balance
      const pointRecord = await prisma.points.findUnique({
        where: {
          user_id: userId,
        },
        select: {
          balance: true,
        },
      });

      if (!pointRecord) {
        return res
          .status(404)
          .json({ message: "User not found in points table" });
      }

      const newBalance = pointRecord.balance + point;

      // Update balance
      await prisma.points.update({
        where: {
          user_id: userId,
        },
        data: {
          balance: newBalance,
        },
      });

      return res
        .status(200)
        .json({ message: "Balance updated successfully", balance: newBalance });
    } catch (error) {
      console.error("Error updating user balance:", error);
      return res.status(500).json({ message: "Error updating user balance" });
    }
  }

  async makePurchase(req, res) {
    try {
      const { user_id, ebook_id, paid_with_point } = req.body;
      console.log("MAKE PURCHASE", user_id, ebook_id, paid_with_point);

      const region = req.headers.region || "japan";
      const prisma = getPrismaClient(region);
      // Optional: Check if eBook exists
      const ebook = await prisma.ebooks.findUnique({
        where: { id: ebook_id },
      });

      if (!ebook) {
        return res.status(404).json({ message: "Ebook not found" });
      }

      if (paid_with_point === true) {
        // Fetch user point balance
        const userPoint = await prisma.points.findUnique({
          where: { user_id: user_id },
        });

        if (!userPoint || userPoint.balance < ebook.point_price) {
          return res.status(400).json({ message: "Insufficient points" });
        }

        // Deduct points
        await prisma.points.update({
          where: { user_id: user_id },
          data: {
            balance: {
              decrement: ebook.point_price,
            },
          },
        });
      }

      // Save the purchase
      const newPurchase = await prisma.purchases.create({
        data: {
          user_id: user_id,
          ebook_id: ebook_id,
          paid_with_point: paid_with_point,
          payment_method: paid_with_point ? "points" : "credit_card",
        },
      });

      return res
        .status(201)
        .json({ message: "Purchase successful", purchase: newPurchase });
    } catch (error) {
      console.error("Error making purchase:", error);
      return res.status(500).json({ message: "Error making purchase" });
    }
  }

  async getPurchasedBooks(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const region = req.headers.region || "japan";
      const prisma = getPrismaClient(region);

      // Step 1: Get ebook_ids from purchases
      const purchasedEbookIds = await prisma.purchases.findMany({
        where: { user_id: userId },
        select: { ebook_id: true },
      });

      const ebookIds = purchasedEbookIds.map((p) => p.ebook_id);

      if (ebookIds.length === 0) {
        return res.status(200).json([]); // user has no purchases
      }

      // Step 2: Get ebook data from ebooks table
      const purchasedBooks = await prisma.ebooks.findMany({
        where: {
          id: { in: ebookIds },
        },
      });

      return res.status(200).json(purchasedBooks);
    } catch (error) {
      console.error("Error fetching purchased books:", error);
      return res
        .status(500)
        .json({ message: "Error fetching purchased books" });
    }
  }

  async getAllBooks(req, res) {
    // const region = req.query.region || "default";
    // const prisma = getPrismaClient(region);
    const region = req.headers.region || "japan";
    const prisma = getPrismaClient(region);

    try {
      const books = await prisma.ebooks.findMany({
        select: {
          id: true,
          title: true,
          author: true,
          price: true,
          point_price: true, // May not exist in some schemas
          file_url: true,
          imgUrl: true,
        },
      });

      return res.status(200).json(books);
    } catch (err) {
      // Prisma error for missing column: P2022
      if (err.code === "P2022" && err.meta?.column === "ebooks.point_price") {
        console.warn(
          `⚠️ point_price column missing in region "${region}", skipping it`
        );

        const books = await prisma.ebooks.findMany({
          select: {
            id: true,
            title: true,
            author: true,
            price: true,
            file_url: true,
            imgUrl: true,
          },
        });

        return res.status(200).json(books);
      }

      // Other errors
      console.error(err);
      return res
        .status(500)
        .json({ message: "❌ Failed to get ebooks", error: err.message });
    }
  }

  // async getAllBooks(req, res) {
  //   try {
  //     // const { region } = req.body;
  //     const region = req.query.region;

  //     console.log("region", region);
  //     const regionPrisma = getPrismaClient(region);
  //     const books = await regionPrisma.ebooks.findMany();
  //     return res.status(200).json(books);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //     return res.status(500).json({ message: "Error fetching books" });
  //   }
  // }

  async getUserIpAndCountry() {
    try {
      const res = await fetch("https://api.db-ip.com/v2/free/self");
      const data = await res.json();

      return {
        ip: data.ipAddress,
        country: data.countryName,
        countryCode: data.countryCode,
      };
    } catch (error) {
      console.error("Failed to get IP info:", error);
      return { ip: "unknown", country: "unknown", countryCode: "XX" };
    }
  }

  async createBook(req, res) {
    try {
      const data = req.body;
      const region = req.headers.region || "japan";
      const prisma = getPrismaClient(region);

      const newBook = await prisma.ebooks.create({
        data: {
          title: data.title,
          author: data.author || null,
          price: data.price,
          point_price: data.point_price,
          file_url: data.file_url,
        },
      });

      console.log("New book created:", newBook);
      return res.status(201).json(newBook);
    } catch (error) {
      return res.status(400).json("Error creating book:", error);
    }
  }
}
module.exports = new EBookController();
