import axios from 'axios';

const getHeaders = () => {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async (setProducts) => {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchOrders = async (setOrders) => {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchLineItems = async (setLineItems) => {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const createLineItem = async ({ product, cart, lineItems, setLineItems }) => {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const updateLineItem = async ({ lineItem, cart, lineItems, setLineItems }) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id === response.data.id ? response.data : lineItem));
};

const deleteLineItem = async ({ lineItem, cart, lineItems, setLineItems }) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity - 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id === response.data.id ? response.data : lineItem));
};

const updateOrder = async ({ order, setOrders }) => {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const removeFromCart = async ({ lineItem, lineItems, setLineItems }) => {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter(_lineItem => _lineItem.id !== lineItem.id));
};

const attemptLoginWithToken = async (setAuth) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch (ex) {
      if (ex.response.status === 401) {
        window.localStorage.removeItem('token');
      }
    }
  }
};

const login = async ({ credentials, setAuth }) => {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
};

const logout = (setAuth) => {
  window.localStorage.removeItem('token');
  setAuth({});
};

const fetchUsers = async (setUsers) => {
  const response = await axios.get('/api/admin/users', getHeaders());
  setUsers(response.data);
};
// const editUsers = async (args) => {

const editUsers = async ({editedUser, setUser}) => {
  try {
    const response = await axios.put(`/api/users/${editedUser.id}`, getHeaders());
    console.log(editedUser)
    setUser(editedUser);
  } catch (error) {
    console.error('Error editing user:', error.message);
    throw error; 
  }
}


const fetchAdminProducts = async (setProducts) => {
  console.log('1.1')
  const response = await axios.get('/api/admin/products', getHeaders());
  setProducts(response.data);
  console.log('1.67')
};

const createProduct = async (productData) => {
  await axios.post('/api/admin/add-product', productData, getHeaders());
};

const markProductVIP = async (productId) => {
  await axios.put(`/api/admin/mark-product-as-vip/${productId}`, {}, getHeaders());
};

const makeUserVIP = async (userId) => {
  await axios.post(`/admin/make-user-vip/${userId}`, {}, getHeaders());
};

const makeUserAdmin = async (userId) => {
  await axios.post(`/admin/make-user-admin/${userId}`, {}, getHeaders());
};


const api = {
  login,
  logout,
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  removeFromCart,
  attemptLoginWithToken,
  fetchUsers,
  editUsers,
  createProduct,
  markProductVIP,
  makeUserAdmin,
  makeUserVIP,
  fetchAdminProducts
};

export default api;
