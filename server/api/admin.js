const {
    makeUserVIP,
    makeUserAdmin,
    markProductVIP,
    getAllUsers
  } = require('../db/auth');


const express = require('express');
const { isLoggedIn, isAdmin } = require('./middleware');
const app = express.Router();

app.get('/users', async (req, res, next) => {
    try {
      const users = await getAllUsers();
      res.send(users);
    } catch (ex) {
      next(ex);
    }
  });
  
app.post('/make-user-vip/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await makeUserVIP(userId);
      res.send(user);
    } catch (ex) {
      next(ex);
    }
  });
  
app.post('/make-user-admin/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await makeUserAdmin(userId);
      res.send(user);
    } catch (ex) {
      next(ex);
    }
  });
  
app.post('/add-product', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const product = await createProduct(req.body);
      res.send(product);
    } catch (ex) {
      next(ex);
    }
  });
app.post('/mark-product-as-vip/:productId', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await markProductVIP(productId);
      res.send(product);
    } catch (ex) {
      next(ex);
    }
  });

  module.exports = app;