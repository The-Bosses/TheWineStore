import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({
  updateOrder,
  removeFromCart,
  lineItems,
  cart,
  products,
  updateLineItem,
  deleteLineItem,
}) => {
  const [address, setAddress] = useState(""); // State to manage the address input
  const [checkout, setCheckout] = useState(false);

  const totalCost = sumCart();

  function sumCart() {
    let sum = 0;
    lineItems
      .filter((lineItem) => lineItem.order_id === cart.id)
      .forEach((lineItem) => {
        const product =
          products.find((product) => product.id === lineItem.product_id) || {};
        sum += product.price * lineItem.quantity;
      });
    return sum.toFixed(2);
  }

  function sumLineItem(price, quantity) {
    const sum = quantity * price;
    return sum.toFixed(2);
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const addAddressToCart = () => {
    updateOrder({ ...cart, is_cart: false, total_cost: totalCost, address });
    setAddressFormVisible(false);
  };

  const handleCheckout = (event) => {
      event.preventDefault()
      setCheckout(!checkout)
  }

  const cartQuantity = lineItems.filter((lineItem) => lineItem.order_id === cart.id)

  return (
    <div className="p-4 bg-red-950">
      <h2 className="text-2xl text-red-50 font-bold mb-4">Cart</h2>
      {
        cartQuantity.length === 0 ? (
          <div className="bg-red-100 m-3 p-3 rounded-md">
          <h2 className="text-2xl text-red-950 font-bold mb-4">Your cart is empty!</h2>
          <h2 className="text-2xl text-red-950 font-bold mb-4">Please check out our products <Link to="/products"><button className="underline">HERE!</button></Link></h2>
          
        </div>
        ) : null
        
      }
      <ul>
        {lineItems
          .filter((lineItem) => lineItem.order_id === cart.id)
          .map((lineItem) => {
            const product =
              products.find((product) => product.id === lineItem.product_id) ||
              {};
            return (
              <div
                key={lineItem.id}
                className="m-4 border-b bg-gray-100 border-gray-300 rounded-md pb-4"
              >
                <li className="flex items-center">
                  <div>
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className="m-4 bg-white w-40 h-40 rounded-lg object-contain shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <Link to={`/product/${product.id}`}><p className="text-lg text-red-900 font-semibold underline">
                      {product.name} ({lineItem.quantity})
                    </p>
                    </Link>
                    <p className="text-base text-red-900 font-semibold">
                      Product total: $
                      {sumLineItem(product.price, lineItem.quantity)}
                    </p>
                    <div className="flex items-center text-lg mt-2">
                      <button
                        className="m-2 text-lg"
                        onClick={() => updateLineItem(lineItem)}
                      >
                        +
                      </button>
                      <p className="text-base text-red-900 font-semibold">
                        {lineItem.quantity}
                      </p>
                      <button
                        className="m-2 text-lg"
                        onClick={() =>
                          lineItem.quantity > 1
                            ? deleteLineItem(lineItem)
                            : removeFromCart(lineItem)
                        }
                      >
                        -
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(lineItem)}
                      className="mx-auto px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-xs sm:text-sm bg-red-900 text-red-50 hover:bg-red-950 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
                    >
                      Remove From Cart
                    </button>
                  </div>
                </li>
              </div>
            );
          })}
      </ul>
      {lineItems.filter((lineItem) => lineItem.order_id === cart.id).length ? (
        <div className="mt-4">
          <div className="text-lg font-semibold text-red-50">Subtotal: ${totalCost}</div>
          <div className="text-lg font-semibold text-red-50">Shipping: $0.00</div>
          <div className="text-lg font-semibold text-red-50">Tax: ${(totalCost * 0.06).toFixed(2)}</div>
          <div className="text-lg font-semibold text-red-50">Total Cost: ${(totalCost * 1.06).toFixed(2)}</div>
          <button
            onClick={(event) => {handleCheckout(event)}}
            className="mt-3 mx-auto px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-xs sm:text-sm bg-gray-100 text-red-950 hover:bg-gray-300 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
          >
            Continue to checkout
          </button>
          {checkout && (
            <div className="mt-4">
              <label className="text-lg font-semibold text-red-50">
                Address:
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  className="border p-2 w-full mt-2 text-black"
                />
              </label>
              <button
            onClick={() => {
              updateOrder({
                ...cart,
                is_cart: false,
                total_cost: totalCost,
                address,
              });
            }}
            className="mt-3 mx-auto px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-xs sm:text-sm bg-gray-100 text-red-950 hover:bg-gray-300 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
          >
            Place Order
          </button>
            </div>
          )}
          
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
