const { Router } = require("express");
const followRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//FUNCTION WORKS
followRouter.post("/", async (req, res) => {
  const otherUser = req.body;
  const user = req.user.username;
  console.log("otherUser", otherUser)
  console.log("User", user)
  //ADD FOLLOWER
  const followUser = await prisma.userinfo.update({
    where: { username: otherUser.toString() },
    data: {
      followers: {
        push: user,
      },
    },
    
  });
//ADD FOLLOWING
  const addFollower = await prisma.userinfo.update({
    where: { username: user },
    data: {
      following: {
        push: otherUser.toString(),
      },
    },
  });

console.log(followUser);
console.log(addFollower);
return res.status(200).json(req.body);
  
});


//Confirms user has requested to follow other user. Changes follow button
//Display to "requested".
followRouter.post("/status", async (req, res) => {
const otherUser = req.body;
const user = req.user.username;

const confirmFollow = await prisma.userinfo.findUnique({
  where: { username: user },
  select: {
    following: true,
  },
  });
  
  if(confirmFollow.following.includes(otherUser.toString())) {
    return res.status(200).json(req.body);
  }

  console.log(confirmFollow);
  
});



//GOOD FUNCTION
followRouter.post('/remove', async (req, res) => {
  const otherUser = req.body;
  const user = req.user.username;


  const findOtherUser = await prisma.userinfo.findUnique({
    where: { username: otherUser.toString() },
  });

  
  const removeFollow = findOtherUser.followers.filter(
    (follower) => follower !== user,
  );

  
  const updateFollowers = await prisma.userinfo.update({
    where: { username: otherUser.toString() },
    data: {
      followers: {
        set: removeFollow,
      },
    }
})
 
const findUser = await prisma.userinfo.findUnique({
  where: { username: user },
});

const removeFollowing = findUser.following.filter(
  (follow) => follow !== otherUser.toString(),
);

const updateFollowing = await prisma.userinfo.update({
  where: { username: user },
  data: {
    following: {
      set: removeFollowing,
    },
  }
})


console.log(updateFollowers);
console.log(updateFollowing)
return res.status(200).json(req.body);
});

module.exports = followRouter;
