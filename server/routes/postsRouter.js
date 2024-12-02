const express = require("express");
const postsRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


postsRouter.post("/", async (req, res) => {
  const user = req.user.username;
  

  const findUser = await prisma.userinfo.findUnique({
    where: {username: user},
    select: {
      following: true,
    }
  })
  

    const findPosts = await prisma.userposts.findMany({
    where: { username: {
      in: findUser.following,
   }
  }  
  })


  console.log(findPosts);
  
  return res.status(200).json(findPosts);
});


postsRouter.post("/new", async (req, res) => {
const arr = req.body;
console.log(arr[0]);

console.log(req.body);
  const newPost = await prisma.userposts.create({
    data: {
      username: arr[0],
      caption: arr[1],
    }
  });

 console.log(newPost);
return res.status(200).json()
});

module.exports = postsRouter;
