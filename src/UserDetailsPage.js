import React from "react";
import { useParams } from "react-router-dom";

const UserDetailsPage = ({ users, orders, products, lineItems }) => {
  const params = useParams();
  const userId = params.userId;
  
  const user = users.find((user) => {
    return user.id === userId;
  });

  return (
    <div>
      <h2> Admin Dashboard</h2>
      <h2>Account Details:</h2>
          <ul>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>
              Address: {user.address_1}, {user.city}, {user.state}{" "}
              {user.postal_code}
            </li>
            <li>VIP: {user.is_vip ? "Yes" : "No"}</li>
            <li>Admin: {user.is_admin ? "Yes" : "No"}</li>
          </ul>
      
      <div>
        <h2>Orders</h2>
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
                  <span>Total Cost: ${order.total_cost}</span>
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
                            ""
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
    </div>
  );
};

export default UserDetailsPage;
