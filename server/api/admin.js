const {
    makeUserVIP,
    makeUserAdmin,
    makeUsernotAdmin,
    makeUsernotVIP,
    fetchUsers
  } = require('../db/auth');
const { markProductVIP, createProduct, fetchAdminProducts } = require('../db/products');


const express = require('express');
const { isLoggedIn, isAdmin } = require('./middleware');
const app = express.Router();

app.get('/users', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const users = await fetchUsers();
      res.send(users);
    } catch (ex) {
      next(ex);
    }
  });

app.get('/products', isLoggedIn, isAdmin, async (req, res, next) => {
  console.log('1.3');
  try {
    const products = await fetchAdminProducts();
    console.log('2.3');
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});

app.put('/users/make-user-vip/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await makeUserVIP(userId);
      res.send(user);
    } catch (ex) {
      next(ex);
    }
  });

  app.put('/users/make-user-not-vip/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await makeUsernotVIP(userId);
      res.send(user);
    } catch (ex) {
      next(ex);
    }
  });
  
app.put('/users/make-user-admin/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await makeUserAdmin(userId);
      res.send(user);
    } catch (ex) {
      next(ex);
    }
  });

  app.put('/users/make-user-not-admin/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await makeUsernotAdmin(userId);
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