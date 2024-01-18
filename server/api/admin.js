const {editProduct} = require('../db')


const express = require('express');
const { isLoggedIn, isAdmin } = require('./middleware');
const app = express.Router();

app.put('/products/:id', isLoggedIn, isAdmin, async (req, res, next)=> {
  try {
    res.send(await editProduct({...req.body, id: req.params.id}) );
  } catch (error) {
    next(error)
  }
  
});


  module.exports = app;