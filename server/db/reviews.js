const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchReviews = async () => {
    const SQL = `
      SELECT *
      FROM reviews
    `;
    const response = await client.query(SQL);
    return response.rows;
  };

const createReview = async (review) => {
    const SQL = `
      INSERT INTO reviews (id, product_id, user_id, rating, comment ) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), review.product_id, review.user_id, review.user_id, review.rating, review.comment]);
    return response.rows[0];
  };

  module.exports = {
    fetchReviews,
    createReview,
  };