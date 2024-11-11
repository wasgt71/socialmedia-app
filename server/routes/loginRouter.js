const express = require('express');
const passport = require('passport');
const loginRouter = express.Router();


loginRouter.post('/login', passport.authenticate('local', {
  failureFlash: true, 
}), (req, res) => {

  if (req.user) {
    return res.status(200).json({
      message: 'Login successful',
      user: req.user,  
    });
  }
 
  return res.status(401).json({ message: 'Invalid username or password' });
});

module.exports = loginRouter;











