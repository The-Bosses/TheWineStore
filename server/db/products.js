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

const fetchAdminProducts = async () => {
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

const editProduct = async (product) => {
  const SQL = `
  UPDATE products
  SET name = $1, type = $2, price = $3, location = $4, alcohol_percent = $5, description = $6, is_vip = $7
  WHERE id = $8
  RETURNING *
  `;
  const response = await client.query(SQL, [product.name, product.type, product.price, product.location, product.alcohol_percent, product.description, product.is_vip, product.id]);
  return response.rows[0];
};

const addToWishList = async (product) => {
  const SQL = `
  INSERT INTO wish_list (id, product_id, user_id) VALUES ($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), product.id, product.user_id]);
  return response.rows[0];
}

const removeFromWishList = async (product) => {
  const SQL = `
  DELETE FROM wish_list
  WHERE id = $1
  RETURNING *
  `;
  await client.query(SQL, [product.id]);
}

module.exports = {
  fetchProducts,
  createProduct,
  editProduct,
  fetchAdminProducts,
  addToWishList,
  removeFromWishList
};
