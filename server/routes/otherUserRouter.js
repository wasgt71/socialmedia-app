const { Router } = require("express");
const otherUserRouter = Router();

let userData = [

];

otherUserRouter.post("/", (req, res) => {
const value = req.body;
userData.push(value.toString());
console.log(userData);
return res.status(200).json(value);
})

otherUserRouter.post("/display", (req, res) => {
return res.status(200).json(userData);
});

otherUserRouter.post("/remove", (req, res) => {
userData = [];
console.log(userData)
})

module.exports = otherUserRouter;