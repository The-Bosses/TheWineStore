const {
    fetchReviews,
    createReview
} = require('../db/reviews');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', async(req, res, next)=> {
    try {
        
      res.send(await fetchReviews());
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.put('/CreateReview', isLoggedIn, isAdmin, async (req, res, next)=> {
        res.send(await createReview(req.body));
    
  });
  
  
  module.exports = app;