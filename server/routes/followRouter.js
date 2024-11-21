const { Router } = require("express");
const followRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

followRouter.post("/requests", async (req, res) => {
  const otherUser = req.body;
  const user = req.user.username;
  const followRequest = await prisma.userinfo.update({
    where: { username: otherUser.toString() },
    data: {
      requests: {
        push: user,
      },
    },
  });

  console.log(followRequest);
  return res.json(req.body);
});

followRouter.post("/requests/accept", async (req, res) => {
  const { name } = req.body;
  const user = req.user.username;
  console.log(user);
  console.log(req.body.toString());

   //Finds users prisma model.

   const findModel = await prisma.userinfo.findUnique({
    where: { username: user },
  });

  //Removes Requests that return false to .filter.

  const removeRequest = findModel.requests.filter(
    (request) => request !== req.body.toString()
  );

  //Updates Requests array in prisma model, pushes request into followers.

  const acceptRequest = await prisma.userinfo.update({
    where: { username: user },
    data: {
      requests: {
        set: removeRequest,
      },
      followers: {
        push: req.body.toString(),
      },
    },
  });

  console.log(acceptRequest);
  
});

module.exports = followRouter;
