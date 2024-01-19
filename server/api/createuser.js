const express = require('express');
const { createUser } = require('../db/auth');
const app = express.Router();

app.post('/', async (req, res, next) => {
    try {

      res.send( await createUser(req.body));
    } catch (ex) {
     next(ex)
    }
  });
  
  module.exports = app;
  