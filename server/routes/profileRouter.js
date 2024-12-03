const { Router } = require("express");
const profileRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

profileRouter.post("/", (req, res) => {
  return res.json(req.user);
});

profileRouter.post("/posts", async (req, res) => {
  const user = req.user.username;
  const userPosts = await prisma.userposts.findMany({
    where: { username: user },
    include: {
      comments: true,
    },
  });
  console.log(userPosts);
  res.status(200).json(userPosts);
});

module.exports = profileRouter;
