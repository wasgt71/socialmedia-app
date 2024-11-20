const { Router } = require("express");
const followRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

followRouter.post("/requests", async (req, res) => {
  const otherUser = req.body;
  
  
  const followRequest = await prisma.userinfo.update({
   where: { username: otherUser.toString() },
    data: {
      requests: {
       push: "Christa",
      },
    },
  });

  console.log(followRequest);
  return res.json(req.body);
});

module.exports = followRouter;

