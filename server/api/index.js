const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));

const adminRoutes = require('./admin');
app.use('/admin', isAdmin, adminRoutes);

app.use('/admin/users', require('./admin'));
app.use('/admin/products', require('./admin'));
app.use('/admin/add-product', require('./admin'));
app.use('/admin/make-user-admin/:userId', require('./admin'));
app.use('/admin/make-user-vip/:userId', require('./admin'));
app.use('/admin/mark-product-as-vip/:productId', require('./admin'));


module.exports = app;
