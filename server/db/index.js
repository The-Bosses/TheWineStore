const client = require('./client')

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  createUser,
  authenticate,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      birth_date VARCHAR(50) NOT NULL,
      address_1 VARCHAR(120) NOT NULL,
      address_2 VARCHAR(120),
      city VARCHAR(100) NOT NULL,
      state VARCHAR(50) NOT NULL,
      country VARCHAR(50) NOT NULL,
      postal_code VARCHAR(16) NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      type VARCHAR(50) NOT NULL,
      location VARCHAR(50),
      alcohol_percent INTEGER, 
      description TEXT,
      price INTEGER NOT NULL,
      reviews TEXT,
      is_vip BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

  `;
  await client.query(SQL);

  const [ben, ethyl] = await Promise.all([
    createUser({ username: 'Ben', password: 'bboss', name: 'Ben Boss', email: 'bb@icloud.com', birth_date:'1998-03-09', address_1: '123 Ypsilanti Dr', address_2: '', city: 'Ypsilanti', state: 'Michigan', country: 'United States', postal_code: '48197', is_vip: true, is_admin: true }),
    createUser({ username: 'ethyl', password: '1234', name: 'Ethyl', email: 'e@me.com', birth_date: '1900-01-01', address_1: '234 Lane', address_2:'', city: 'Detroit', state: 'Michigan', country: "United States", postal_code: '12345', is_vip: true, is_admin: true})
  ]);
  const [bar, foo] = await Promise.all([
    createProduct({ name: 'bar', type: 'Merlot', location: 'Napa Valley', alcohol_percent: 10, description: 'yummy in my tummy', price: 9, reviews: 'incredible', is_vip: false }),
    createProduct({ name: 'foo', type: 'Merlot', location: 'Napa Valley', alcohol_percent: 10, description: 'yummy in my tummy', price: 9, reviews: 'incredible', is_vip: false })

  ]);
  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  seed,
  client
};
