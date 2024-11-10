const { Router } = require("express");
const signUpRouter = Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const profile = [{name: "l"}];

signUpRouter.get("/", (req, res) => {
  return res.json(Object.values(profile));
  });


signUpRouter.post("/", async (req, res, next) => {
  const { username, email, password } = req.body;
  profile.push({ username, email, password });
  console.log(profile);

  async function main() {
   const newData = await prisma.userinfo.create({
      data: {
        email: email,
        username: username,
        password: password,
      }
    })
    console.log(newData);
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

});

module.exports = signUpRouter;
