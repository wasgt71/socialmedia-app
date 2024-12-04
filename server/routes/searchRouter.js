const { Router } = require("express");
const searchRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

searchRouter.post("/", async (req, res) => {
  const allUsers = await prisma.userinfo.findMany({
    select: {
        username: true,
    }
  });
  res.status(200).json(allUsers);
});

module.exports = searchRouter;
