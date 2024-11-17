const { Router } = require("express");
const allUsersRouter = Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


allUsersRouter.post("/", (req, res) => {
const { userData } = req.body;
  const allUsers = prisma.userinfo.findMany();

  return res.json( allUsers );
  
});

module.exports = allUsersRouter;
