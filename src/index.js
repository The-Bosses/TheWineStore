import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import ProductDetail from "./ProductDetail";
import Homepage from "./Homepage";
import api from "./api"
import SearchBar from './SearchBar';
import Admin from './Admin';
import AdminUsers from './AdminUsers';
import AdminProducts from './AdminProducts';
import UserForm from './CreateUser';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import AdminProductEdit from './AdminProductEdit';
import AdminAddProduct from './AdminAddProduct';



const App = () => {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);

  const attemptLoginWithToken = async () => {
    await api.attemptLoginWithToken(setAuth);
  };



  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);


  const createUser = async(formData) => {
    await api.createUser({formData});
  };


  const createLineItem = async (product) => {
    await api.createLineItem({ product, cart, lineItems, setLineItems });
  };

  const updateLineItem = async (lineItem) => {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const deleteLineItem = async (lineItem) => {
    await api.deleteLineItem({ lineItem, cart, lineItems, setLineItems });
  };
  const updateOrder = async (order) => {
    await api.updateOrder({ order, setOrders });
  };

  const editProduct = async(product) => {
    await api.editProduct({product, setProducts});
  };

  const addProduct = async(product) => {
    await api.addProduct({product, setProducts});
  };

  const removeFromCart = async (lineItem) => {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const cart = orders.find((order) => order.is_cart) || {};

  const cartItems = lineItems.filter(
    (lineItem) => lineItem.order_id === cart.id
  );

  const cartCount = cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
  };

  const logout = () => {
    api.logout(setAuth);
  };

  const navigate = useNavigate();


  return (
    <div>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/products">Products ({products.length})</Link>
        <Link to="/signup">Sign Up!</Link>
        {auth.id ? <Link to="/orders">Orders ({orders.filter((order) => !order.is_cart).length})</Link> : null}
        {auth.id ? <Link to="/cart">Cart ({cartCount})</Link> : null}
        {auth.is_admin ? (
          <>
            <Link to="/admin">Admin</Link>
            
          </>
        ) : null}
        <span>
          Welcome {auth.username || 'Guest'}!
          {auth.id ? <button onClick={logout}>Logout</button> : null}
          {auth.id ? <Link to="/profile"><button>My Profile</button></Link> : null}
        </span>
      </nav>
  
      <h3>Search Items</h3>
      <SearchBar products={products} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage />
                {auth.id ? null : <Login login={login} />} {/* Render Login only for not logged-in users */}
                <Products
                  auth={auth}
                  products={products}
                  cartItems={cartItems}
                  createLineItem={createLineItem}
                  updateLineItem={updateLineItem}
                  deleteLineItem={deleteLineItem}
                  navigate={navigate}
                />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <Products
                auth={auth}
                products={products}
                cartItems={cartItems}
                createLineItem={createLineItem}
                updateLineItem={updateLineItem}
                navigate={navigate}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                lineItems={lineItems}
                products={products}
                updateOrder={updateOrder}
                removeFromCart={removeFromCart}
                updateLineItem={updateLineItem}
                deleteLineItem={deleteLineItem}
                navigate={navigate}
              />
            }
          />
          <Route
            path="/orders"
            element={<Orders orders={orders} 
            products={products} 
            lineItems={lineItems} 
            navigate={navigate} 
            />}
          />
          <Route
            path="/product/:productId"
            element={<ProductDetail 
              products={products} 
              navigate={navigate} 
              />}
          />
          <Route path="/admin" element={<Admin auth={auth}/>} />
          <Route path="/admin/users" element={<AdminUsers auth={auth} users={users} setUsers={setUsers}/>} />

          <Route path="/profile" element={<UserProfile user={auth} />}/>
          <Route path='/signup' element={<UserForm createUser={createUser}/>} />   

          <Route path="/admin/products" 
              element={<AdminProducts 
                        products={products} 
                        auth={auth}
                        /> } />
          <Route path="/admin/products/createnew" 
                element={<AdminAddProduct 
                          addProduct={addProduct}/>} />

          <Route path="/admin/products/:id" 
                element={<AdminProductEdit 
                          products={products}
                          editProduct={editProduct}
                          />} />

        </Routes>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
