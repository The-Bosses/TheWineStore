const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');
const { addToWishList } = require('../db/products');


app.post("/", isLoggedIn, async (req, res, next) => {
try {
    res.send(await addToWishList({...req.body, user_id: req.user.id}))
} catch (error) {
    next(error)
};

}); 



module.exports = app;



