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

followRouter.post("/requests/accept", async (req, res) => {
  const user = req.user.username;


  const confusing = await prisma.userinfo.findUnique({
    where: { username: user },
    
  });

  const removeRequest = confusing.requests.filter(request => request !== "Christa");
  

  const acceptRequest = await prisma.userinfo.update({
    where: { username: user },
    data: {
      requests: {
        set: removeRequest,
      },
      followers: {
        push: "Christa",
      },
    },
  });

  console.log(acceptRequest);
});


module.exports = followRouter;
