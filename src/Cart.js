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
    return sum.toFixed(2);
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
              <div key={ lineItem.id }>
                <li >
                { product.name }
                ({ lineItem.quantity })
                <button onClick={() => updateLineItem(lineItem)}>+</button>
                <button onClick={()=> (lineItem.quantity > 1 ? deleteLineItem(lineItem) : removeFromCart(lineItem))}>-</button>
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
              </li>
              </div>
              
            );
          })}
      </ul>
      {lineItems.filter((lineItem) => lineItem.order_id === cart.id).length ? (
        <div>
          <div>Total Cost: ${totalCost}</div>
          <button
            onClick={() => {
              updateOrder({ ...cart, is_cart: false, total_cost: totalCost})
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
