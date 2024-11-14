const express = require('express');
const passport = require('passport');
const loginRouter = express.Router();


loginRouter.post('/', passport.authenticate('local', {
  failureFlash: true, 
}), (req, res) => {
  console.log(req.user);
  if (req.user) {  
    return res.status(200).json({
      user: req.user,  
    });

  }
 
  return res.status(401).json({ message: 'Invalid username or password' });
});

module.exports = loginRouter;











