const { Router } = require("express");
const commentRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


commentRouter.post("/", async (req, res) => {
    const commentData = req.body;
    const user = req.user.username;

const addComment = await prisma.comment.create({
    data: {
        username: user,
        text: commentData[0],
        postId: commentData[1],
    }
    })
    console.log(addComment);
    return res.status(200).json(addComment);
})
     
commentRouter.post("/delete", async (req, res) => {
    const commentData = req.body
    const user = req.user.username;

    const deleteComment = await prisma.comment.deleteMany({
        where: { id: Number(commentData) },
    });
    res.status(200).json(deleteComment);
})



module.exports = commentRouter;

