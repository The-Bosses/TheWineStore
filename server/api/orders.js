const {
  fetchOrders,
  updateOrder,
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.put('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    if (req.user.id != req.body.user_id) {
      throw new Error('Current user id does not match the user id for this order')
    }
    res.send(await updateOrder({ ...req.body, id: req.params.id, total_cost: req.body.total_cost}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchOrders(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;
