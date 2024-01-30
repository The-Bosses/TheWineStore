import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Link, HashRouter, Routes, Route } from "react-router-dom";
import Navigations from "./Navigations";
import Products from "./Products";
import Orders from "./Orders";
import Cart from "./Cart";
import Login from "./Login";
import ProductDetail from "./ProductDetail";
import Homepage from "./Homepage";
import api from "./api";
import Admin from "./Admin";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import AdminAddProduct from "./AdminAddProduct";
import UserForm from "./CreateUser";
import { useNavigate } from "react-router-dom";
import ReviewsList from "./Reviews";
import UserProfile from "./UserProfile";
import AdminProductEdit from "./AdminProductEdit";
import UserDetailsPage from "./UserDetailsPage";
import AgeVerificationModal from "./AgeVerificationModal";
import AboutUs from "./AboutUs";

import Navigation from "./Navigations";

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [isAgeVerificationCompleted, setIsAgeVerificationCompleted] =
    useState(false);

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

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchReviews(setReviews);
      };
      fetchData();
    }
  }, [auth]);

  const createReview = async (review) => {
    await api.createReview({ review, setReviews });
  };

  useEffect(() => {
    if (auth.id) {
      const fetchWishList = async () => {
        await api.getWishList(setWishList);
      };
      fetchWishList();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchUsers(setUsers);
      };
      fetchData();
    }
  }, [auth]);

  const createUser = async (formData) => {
    await api.createUser({ formData });
  };

  const handleAgeVerification = () => {
    setIsAgeVerificationCompleted(true);
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

  const editProduct = async (product) => {
    await api.editProduct({ product, setProducts });
  };

  const addProduct = async (product) => {
    await api.addProduct({ product, setProducts });
  };

  const removeFromCart = async (lineItem) => {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const addToWishList = async (product) => {
    await api.addToWishList({ product, setWishList });
  };

  const removeFromWishList = async (product) => {
    await api.removeFromWishList({ product, wishList, setWishList });
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
      {isAgeVerificationCompleted ? (
        <Navigations auth={auth} logout={logout} orders={orders} login={login}  />
      ) : (
        <AgeVerificationModal
          onClose={() => alert("Verification closed")}
          onVerify={handleAgeVerification}
        />
      )}
      {isAgeVerificationCompleted && (
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Homepage
                    isAgeVerificationCompleted={isAgeVerificationCompleted}
                    products={products}
                    onCloseAgeVerificationModal={() =>
                      alert("Verification closed")
                    }
                    onVerifyAge={handleAgeVerification}
                  />
                  {/* {auth.id ? null : <Login login={login} />} */}
                  {/* <Products
                    auth={auth}
                    products={products}
                    cartItems={cartItems}
                    createLineItem={createLineItem}
                    updateLineItem={updateLineItem}
                    deleteLineItem={deleteLineItem}
                    navigate={navigate}
                  /> */}
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
              element={
                <Orders
                  orders={orders}
                  products={products}
                  lineItems={lineItems}
                  navigate={navigate}
                />
              }
            />

            <Route path="/admin" element={<Admin auth={auth} />} />
            <Route
              path="/admin/users"
              element={
                <AdminUsers auth={auth} users={users} setUsers={setUsers} />
              }
            />

            <Route
              path="/profile"
              element={
                <UserProfile
                  user={auth}
                  wishList={wishList}
                  products={products}
                  removeFromWishList={removeFromWishList}
                  createLineItem={createLineItem}
                />
              }
            />

            <Route
              path="/admin/users/:userId"
              element={
                <UserDetailsPage
                  users={users}
                  orders={orders}
                  products={products}
                  lineItems={lineItems}
                />
              }
            />

            <Route
              path="/signup"
              element={<UserForm createUser={createUser} />}
            />

            <Route
              path="/admin/products"
              element={<AdminProducts products={products} auth={auth} />}
            />
            <Route
              path="/admin/products/createnew"
              element={<AdminAddProduct addProduct={addProduct} />}
            />
            <Route
              path="/admin/products/:id"
              element={
                <AdminProductEdit
                  products={products}
                  editProduct={editProduct}
                />
              }
            />

            <Route
              path="/product/:productId"
              element={
                <ProductDetail
                  products={products}
                  navigate={navigate}
                  auth={auth}
                  reviews={reviews}
                  createReview={createReview}
                  wishList={wishList}
                  removeFromWishList={removeFromWishList}
                  addToWishList={addToWishList}
                  setWishList={setWishList}
                  createLineItem={createLineItem}
                  updateLineItem={updateLineItem}
                  cartItems={cartItems}
                  setReviews={setReviews}
                />
              }
            />
            <Route
              path="/reviews"
              element={
                <ReviewsList
                  reviews={reviews}
                  auth={auth}
                  products={products}
                />
              }
            />

            <Route path="/about" element={<AboutUs navigate={navigate}/>} />
          </Routes>
        </main>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
