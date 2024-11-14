const { Router } = require("express");
const commentRouter = Router();
const passport = require('passport');


commentRouter.post("/", (req, res) => {
    const { data } = req.body;
    const user = req.user;
    console.log(req.user);
    const comment = { data };
     return res.json(req.user);

});

module.exports = commentRouter;

