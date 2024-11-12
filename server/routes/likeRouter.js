const { Router } = require("express");
const likeRouter = Router();

likeRouter.post("/", (req, res) => {
    const { value } = req.body;
    const data = { value };
    console.log(data);
  
});



module.exports = likeRouter;