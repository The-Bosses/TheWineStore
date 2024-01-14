const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));

app.use('/admin', require('./admin'));
app.use('/admin/users', require('./admin'));
app.use('/admin/products', require('./admin'));

module.exports = app;
