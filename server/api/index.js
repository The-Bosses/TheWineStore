const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));

const userRoutes = require('./users');
app.use('/users', userRoutes);

const adminRoutes = require('./admin');
app.use('/admin', isAdmin, adminRoutes);


module.exports = app;
