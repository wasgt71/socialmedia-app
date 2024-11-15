const { Router } = require("express");
const profileRouter = Router();


profileRouter.post("/", (req, res) => {
    
     return res.json(req.user);

});










module.exports = profileRouter;