const { Router } = require("express");
const likeRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

likeRouter.post("/", async (req, res) => {
  const arr = req.body;

  const likeData = req.user.username + "" + arr[0];
  const addLike = await prisma.userposts.update({
    where: { id: arr[1] },
    data: {
      likes: {
        push: likeData,
      },
    },
  });
  console.log("addlike:", addLike);
});

likeRouter.post("/remove", async (req, res) => {
  const arr = req.body;

  const findData = await prisma.userposts.findUnique({
    where: { id: arr[1] },
    select: {
      likes: true,
    },
  });

  const removeLike = findData.likes.filter(
    (like) => like !== req.user.username + "" + arr[0]
  );

  console.log("removeLike:", removeLike);

  const updateLike = await prisma.userposts.update({
    where: { id: arr[1] },
    data: {
      likes: {
        set: removeLike,
      },
    },
  });
  console.log("updateLike:", updateLike);
});

likeRouter.post("/status", async (req, res) => {
  const id = req.body[0];
  const user = req.user.username;
  const checkStatus = await prisma.userposts.findUnique({
where: { id: id },
select: {
  likes: true,
}
  })
 
  if(checkStatus.likes.includes(user + "Liked")){
    res.status(200).json(checkStatus);
    console.log("Approved");
  } else {
    res.status(404).json("not-found");
    console.log("Denied");
  }
 
})

module.exports = likeRouter;
