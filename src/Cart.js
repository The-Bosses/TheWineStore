import React from "react";


const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, updateLineItem, deleteLineItem })=> {

  const totalCost = sumCart();

  function sumCart() {
    let sum = 0;
    {
      lineItems
        .filter((lineItem) => {
          return lineItem.order_id === cart.id;
        })
        .map((lineItem) => {
          const product =
            products.find((product) => product.id === lineItem.product_id) ||
            {};
          return (sum += product.price * lineItem.quantity);
        });
    }
    return sum;
  }
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {lineItems
          .filter((lineItem) => lineItem.order_id === cart.id)
          .map((lineItem) => {
            const product =
              products.find((product) => product.id === lineItem.product_id) ||
              {};
            return (
              <li key={ lineItem.id }>
                { product.name }
                ({ lineItem.quantity })
                <button onClick={() => updateLineItem(lineItem)}>+</button>
                <button onClick={()=> deleteLineItem(lineItem)}>-</button>
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>

              </li>
            );
          })}
      </ul>
      {lineItems.filter((lineItem) => lineItem.order_id === cart.id).length ? (
        <div>
          <div>Total Cost: ${totalCost.toFixed(2)}</div>
          <button
            onClick={() => {
              updateOrder({ ...cart, is_cart: false });
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
