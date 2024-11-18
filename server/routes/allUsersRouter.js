const { Router } = require("express");
const allUsersRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

allUsersRouter.post("/", (req, res) => {
  async function main() {
    const allUsers = await prisma.userinfo.findMany({
   
    });
    console.log(allUsers);
    return res.json(allUsers);
  }
  main().then(async () => {
    await prisma.$disconnect();
  });
});

module.exports = allUsersRouter;
