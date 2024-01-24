import React from 'react';

const Orders = ({ orders, products, lineItems }) => {
  return (
    <div>
      <h2 Class="text-3xl font-bold underline">Orders</h2>
      <ul>
        {orders
          .filter((order) => !order.is_cart)
          .map((order) => {
            const orderLineItems = lineItems.filter(
              (lineItem) => lineItem.order_id === order.id
            );
            return (
              <li key={order.id}>
                ({new Date(order.created_at).toLocaleDateString()})
                <span> Total Cost: ${order.total_cost}</span>
                {order.address && <div>Address: {order.address}</div>}
                <ul>
                  {orderLineItems.map((lineItem) => {
                    const product = products.find(
                      (product) => product.id === lineItem.product_id
                    );
                    return (
                      <li key={lineItem.id}>
                        {product ? (
                          <div>
                            {product.name} ({lineItem.quantity} bottles)
                          </div>
                        ) : (
                          ''
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Orders;
