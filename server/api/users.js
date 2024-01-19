const {
    findUserByToken,
    editUser
  } = require('../db');

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

  app.put('/:id', async (req, res, next)=> {
    console.log(req.body)
    res.send({status: 'success'});
  });

  module.exports = app;

//   get user provided user info out of req obj
// pass info to function that can update user in db
// we need user id
