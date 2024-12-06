const { Router } = require("express");
const messageRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

messageRouter.post("/", async (req, res) => {
    const user = req.user.username;
    const userId = req.user.id;
    const messageData = req.body;

    const createMessage = await prisma.messages.create({
        data: {
            sender: user,
            sentmessage: [messageData[1]],
            reciever: messageData[0],
            recievedmessage: [messageData[1]],
            userId: userId,
        },
    });
    console.log(createMessage);
    res.status(200).json(createMessage);
});


messageRouter.post("/display", async (req, res) => {
    const sender = req.user.username;
    const receiver = req.body;
    
    const displayMessage = await prisma.messages.findMany({
        where: {sender: sender, reciever: receiver.toString()},
    });
  console.log(displayMessage);

  const displayReceived = await prisma.messages.findMany({
    where: {sender: receiver.toString(), reciever: sender},
  })
  
    res.status(200).json([displayMessage, displayReceived]);
})

messageRouter.post("/inbox", async (req, res) => {
    const user = req.user.username;
    const inbox = await prisma.messages.findMany({
        where: { sender: user },
    });
    console.log(inbox)
    


   const messages = await prisma.messages.findMany({
    where: { reciever: user}, 
   });
   res.status(200).json([inbox, messages]);
})

module.exports = messageRouter;