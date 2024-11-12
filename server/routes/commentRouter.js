const { Router } = require("express");
const commentRouter = Router();


commentRouter.post("/", (req, res) => {
    const { data } = req.body;
    const comment = { data };
    console.log(comment);
  
});

module.exports = commentRouter;