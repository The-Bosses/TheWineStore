const { findUserByToken } = require('../db');

const isLoggedIn = async(req, res, next)=> {
  try {
    const user = await findUserByToken(req.headers.authorization);
    req.user = user;
    next();
  }
  catch(ex){
    next(ex);
  }
};

const isAdmin = (req, res, next)=> {
  if(req.user && req.user.is_admin){
    next();
  }
  else {
    const error = Error('must be admin');
    error.status = 401;
    next(error);
  }
};

const isVIP = (req, res, next) => {
  if (req.user && req.user.is_vip) {
    next();
  } else {
    res.status(403).json({ error: 'You must be a Snotty Sommelier to continue' });
  }
};

module.exports = { isLoggedIn, isAdmin, isVIP }
