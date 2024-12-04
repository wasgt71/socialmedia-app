const { Router } = require("express");
const editProfileRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

editProfileRouter.post("/user", async (req, res) => {
  const user = req.user.username;

  const findUser = await prisma.userinfo.findMany({
    where: { username: user },
  });

  console.log(findUser);
  return res.status(200).json(findUser);
});

editProfileRouter.post("/", async (req, res) => {
  const userInfo = req.body;
  const user = req.user.username;

  const saveUser = await prisma.userinfo.update({
    where: { username: user },
    data: {
      username: userInfo[0],
      name: userInfo[1],
      bio: userInfo[2],
    },
  });
  console.log(saveUser);
  res.status(200).json(req.user);
});
module.exports = editProfileRouter;
