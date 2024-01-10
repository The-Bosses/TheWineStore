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
      alcohol_percent DECIMAL(3,1), 
      description TEXT,
      price DECIMAL(4,2),
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

  const [ben, parker, sam, robert] = await Promise.all([
    createUser({ username: 'ben', password: 'bboss', name: 'Ben Boss', email: 'bb@icloud.com', birth_date:'1998-03-09', address_1: '123 Ypsilanti Dr', address_2: '', city: 'Ypsilanti', state: 'Michigan', country: 'United States', postal_code: '48197', is_vip: true, is_admin: true }),
    createUser({ username: 'parker', password: '1234', name: 'Parker', email: 'e@me.com', birth_date: '1900-01-01', address_1: '234 Lane', address_2:'', city: 'Detroit', state: 'Michigan', country: "United States", postal_code: '12345', is_vip: true, is_admin: true}),
    createUser({ username: 'sam', password: '1234', name: 'Sam', email: 'e@me.com', birth_date: '1900-01-01', address_1: '234 Lane', address_2:'', city: 'Detroit', state: 'Michigan', country: "United States", postal_code: '12345', is_vip: true, is_admin: true}),
    createUser({ username: 'robert', password: '1234', name: 'Robert', email: 'e@me.com', birth_date: '1900-01-01', address_1: '234 Lane', address_2:'', city: 'Detroit', state: 'Michigan', country: "United States", postal_code: '12345', is_vip: true, is_admin: true})
    
  ]);
  const [oh_schist, enchanted_garden, foo, bar] = await Promise.all([
    createProduct({ name: 'Oh Schist', type: 'Riesling', location: 'Germany', alcohol_percent: 9.5, description: 'Overflowing with lively citrus aromas and a tantalizing hint of white florals. Its zesty acidity intertwines seamlessly with juicy peach and tangy lemon notes, balanced by a subtle sweetness. This White Riesling is a vibrant, versatile delight that harmonizes beautifully with any occasion. It pairs well with Asian food.', price: 8.99, reviews: '', is_vip: false }),
    createProduct({ name: 'Echanted Garden of the Eden Valley', type: 'Riesling', location: 'Australia', alcohol_percent: 11.8, description: 'The “Enchanted Garden” was planted in 1910 and thrives to this day, a seven-acre Eden Valley Vine Garden lovingly tended by Sue and Stuart Woodman. The “La Niña” year in 2022 brought cooler, more mild temperatures, particularly at night, which helped to retain acidity since the respiration of acids occurs to a greater degree when temperatures are warmer. The main notes are honetsuckle, sherbet, and citrus. Pairs very well with deep fruit flavors.', price: 21.99, reviews: '', is_vip: false }),
    createProduct({ name: 'foo', type: 'Riesling', location: 't', alcohol_percent: 3, description: 'y', price: 9, reviews: 'y', is_vip: false }),
    createProduct({ name: 'bar', type: 'Riesling', location: 't', alcohol_percent: 3, description: 'y', price: 9, reviews: 'y', is_vip: false }),
  ]);
  let orders = await fetchOrders(parker.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: oh_schist.id});
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
