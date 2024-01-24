import React, { useState } from "react";

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, updateLineItem, deleteLineItem }) => {
  const [address, setAddress] = useState(""); // State to manage the address input
  const [addressFormVisible, setAddressFormVisible] = useState(false);

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

  const showAddressForm = () => {
    setAddressFormVisible(true);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const addAddressToCart = () => {
    updateOrder({ ...cart, is_cart: false, total_cost: totalCost, address });
    setAddressFormVisible(false);
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {lineItems
          .filter((lineItem) => lineItem.order_id === cart.id)
          .map((lineItem) => {
            const product =
              products.find((product) => product.id === lineItem.product_id) || {};
            return (
              <div key={lineItem.id}>
                <li>
                  {product.name} ({lineItem.quantity})
                  <button onClick={() => updateLineItem(lineItem)}>+</button>
                  <button
                    onClick={() =>
                      lineItem.quantity > 1
                        ? deleteLineItem(lineItem)
                        : removeFromCart(lineItem)
                    }
                  >
                    -
                  </button>
                  <button onClick={() => removeFromCart(lineItem)}>
                    Remove From Cart
                  </button>
                </li>
              </div>
            );
          })}
      </ul>
      {lineItems.filter((lineItem) => lineItem.order_id === cart.id).length ? (
        <div>
          <div>Total Cost: ${totalCost}</div>
          <button onClick={showAddressForm}>Add Address</button>
          {addressFormVisible && (
            <div>
              <label>
                Address:
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                />
              </label>
              <button onClick={addAddressToCart}>Add Address to Cart and Checkout!</button>
            </div>
          )}
          <button
            onClick={() => {
              updateOrder({
                ...cart,
                is_cart: false,
                total_cost: totalCost,
                address,
              });
            }}
          >
            Create Order
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
