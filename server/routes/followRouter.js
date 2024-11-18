const { Router } = require("express");
const followRouter = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();





module.exports = followRouter;