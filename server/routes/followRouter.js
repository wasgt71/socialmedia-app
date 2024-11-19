const { Router } = require("express");
const followRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

followRouter.post("/requests", async (req, res) => {
  const username = req.body;
  const user = req.user;
  const client = user.username;

  const followRequest = await prisma.userinfo.update({
    where: { username: username },
    data: {
      requests: client,
    },
  });

  console.log(followRequest);
  return res.json(req.user);
});

module.exports = followRouter;
