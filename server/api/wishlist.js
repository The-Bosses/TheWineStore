const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');
const { addToWishList, getWishList, removeFromWishList } = require('../db/products');


app.post("/", isLoggedIn, async (req, res, next) => {
try {
    res.send(await addToWishList({...req.body, user_id: req.user.id}))
} catch (error) {
    next(error)
};

}); 

app.get("/", isLoggedIn, async (req, res, next) => {
    try {
        res.send(await getWishList(req.user.id));
    } catch (error) {
        next(error)
    }
})

app.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        console.log(req.params.id)
        res.send(await removeFromWishList({product_id: req.params.id, user_id: req.user.id}));
    } catch (error) {
        next(error)
    }
})


module.exports = app;



