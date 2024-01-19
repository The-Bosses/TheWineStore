const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findUserByToken = async(token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
      SELECT *
      FROM users
      WHERE id = $1
    `;
    const response = await client.query(SQL, [payload.id]);
    if(!response.rows.length){
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }

    return response.rows[0];
  }
  catch(ex){
    console.log(ex);
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

const authenticate = async(credentials)=> {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
  `;
  const response = await client.query(SQL, [credentials.username]);
  if(!response.rows.length){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(credentials.password, response.rows[0].password);
  if(!valid){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
};

const createUser = async(user)=> {
  if(!user.username.trim() || !user.password.trim()){
    throw Error('must have username and password');
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
    INSERT INTO users (id, username, password, name, email, birth_date, address_1, address_2, city, state, country, postal_code, is_vip, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), user.username, user.password, user.name, user.email, user.birth_date, user.address_1, user.address_2, user.city, user.state, user.country, user.postal_code, user.is_vip, user.is_admin ]);
  return response.rows[0];
};

const editUser = async(user) => {
  const SQL = `
  UPDATE users
  SET username = $1, email = $2
  WHERE id = $3
  RETURNING *
  `;
  const response = await client.query(SQL, [user.username, user.email, user.id]);
  return response.rows[0];
};

const makeUserVIP = async (userId) => {
  const SQL = `
  UPDATE users
  SET is_vip = true
  where id = $1
  RETURNING *
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows[0];
};

const makeUsernotVIP = async (userId) => {
  const SQL = `
  UPDATE users
  SET is_vip = false
  where id = $1
  RETURNING *
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows[0];
};

const makeUserAdmin = async (userId) => {
  const SQL = `
  UPDATE users
  SET is_admin = true
  WHERE id = $1
  RETURNING *
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows[0];
};

const makeUsernotAdmin = async (userId) => {
  const SQL = `
  UPDATE users
  SET is_admin = false
  WHERE id = $1
  RETURNING *
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows[0];
};


const fetchUsers = async () => {
  const SQL = `
    SELECT *
    FROM users
  `;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = {
  createUser,
  editUser,
  authenticate,
  findUserByToken,
  makeUserVIP,
  makeUserAdmin,
  fetchUsers,
  makeUsernotAdmin,
  makeUsernotVIP
};
