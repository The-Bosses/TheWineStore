const {
    fetchReviews,
    createReview
} = require('../db/reviews');


  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  const { client } = require('../db');
  
  app.get('/', async(req, res, next)=> {
    try {
        const SQL =`
        SELECT *
        FROM reviews
        `
        const response = await client.query(SQL)
      res.send(response.rows); 
    } 
    catch(ex){
      next(ex)
    }
  });
  
  app.post('/createReview', async (req, res, next)=> {
    try {
       const review = req.body;
       const createdReview = await createReview(review);
        res.send(req.body);
        //console.log(req.body,"api")   
    }
    
    catch(ex){
        console.error('error creating review:', ex)
        next(ex)
    }
  });
  
  
  module.exports = app;