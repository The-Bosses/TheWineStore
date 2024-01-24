const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));
app.use('/reviews', require('./reviews'));
app.use('/createReview', require('./reviews'));

app.use('/signup', require('./createuser'));

app.use('/wishlist', require('./wishlist'));

const userRoutes = require('./users');
app.use('/users', userRoutes);

app.use('/admin', require('./admin'));





module.exports = app;
