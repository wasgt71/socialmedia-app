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

followRouter.post("/requests/requested", async (req, res) => {
const otherUser = req.body;
const user = req.user.username;
console.log(otherUser.toString());

const confirmRequest = await prisma.userinfo.findUnique({
where: { username: otherUser.toString() },
select: {
requests: true,
},

});

if(confirmRequest.requests.includes(user)) {
  return res.status(200).json(req.body);
}

console.log(confirmRequest);
});



followRouter.post("/requests/accept", async (req, res) => {
  const { name } = req.body;
  const user = req.user.username;
  console.log(user);
  console.log(req.body.toString());

   // Finds users prisma model.
   const findModel = await prisma.userinfo.findUnique({
    where: { username: user },
  });

  // Removes Requests that return false to .filter.
  const removeRequest = findModel.requests.filter(
    (request) => request !== req.body.toString()
  );

  // Updates Requests array in prisma model, pushes request into followers.
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

// Update user from requested to follow user to following user.
const updateFollowing = await prisma.userinfo.update({
  where: { username: req.body.toString() },
  data: {
    following: {
      push: user,
    },
  },
});

  console.log(acceptRequest);
  console.log(updateFollowing);
});


// Locate prisma model and remove request.
followRouter.post('/requests/decline', async (req, res) => {
  const { name } = req.body;
  const user = req.user.username;

// Locates specific prisma model.
  const findModel = await prisma.userinfo.findUnique({
    where: { username: user },
  });

  // creates new request arr without initial request.
  const removeRequest = findModel.requests.filter(
    (request) => request !== req.body.toString()
  );

  // Updates prisma model with new requests arr.
  const updateRequest = await prisma.userinfo.update({
    where: { username: user },
    data: {
      requests: {
        set: removeRequest,
      },
    }
})

console.log(updateRequest);

});

module.exports = followRouter;
