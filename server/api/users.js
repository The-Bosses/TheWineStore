const {
    findUserByToken
  } = require('../db');

  const { editUser } = require('../db/auth');


const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');


app.get('/', async(req, res, next)=> {
    try {
      res.send(await findUserByToken());
    }
    catch(ex){
      next(ex);
    }
  });

  app.put('/:id', isLoggedIn, isAdmin, async (req, res, next)=> {
    console.log(req.body)
    res.send(await editUser(req.body) );
  });


  module.exports = app;



