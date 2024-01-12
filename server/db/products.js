const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchProducts = async () => {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async (product) => {
  const SQL = `
    INSERT INTO products (id, name, type, location, alcohol_percent, description, price, is_vip) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name, product.type, product.location, product.alcohol_percent, product.description, product.price, product.is_vip]);
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  createProduct,
};
