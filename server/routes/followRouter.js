const { Router } = require("express");
const followRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

followRouter.post("/requests", (req, res) => {
    const username = req.body;
    const user = req.user;
    console.log(user);
    console.log({'requested to follow': username});
    
     return res.json(req.user);

});

module.exports = followRouter;