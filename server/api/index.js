const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));

app.use('/signup', require('./createuser'));


const userRoutes = require('./users');
app.use('/users', userRoutes);

app.use('/admin', require('./admin'));





module.exports = app;
