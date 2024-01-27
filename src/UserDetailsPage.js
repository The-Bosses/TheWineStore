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
      <div className="bg-red-600 p-4 text-white">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">Account Details:</h2>
        <ul className="list-disc ml-6">
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>
            Address: {user.address_1}, {user.city}, {user.state} {user.postal_code}
          </li>
          <li>VIP: {user.is_vip ? 'Yes' : 'No'}</li>
          <li>Admin: {user.is_admin ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      <div className="p-4 mt-6">
        <h2 className="text-2xl font-bold mb-2">Orders</h2>
        <ul className="list-disc ml-6">
          {orders
            .filter((order) => !order.is_cart)
            .map((order, index) => {
              const orderLineItems = lineItems.filter((lineItem) => lineItem.order_id === order.id);
              const isEven = index % 2 === 0;
              const orderBackground = isEven ? 'bg-red-600 text-white' : 'bg-white text-black';

              return (
                <li key={order.id} className={`mb-4 ${orderBackground}`}>
                  <span className="text-lg font-bold">
                    ({new Date(order.created_at).toLocaleDateString()})
                  </span>
                  <span className="ml-2">Total Cost: ${order.total_cost}</span>
                  <ul className="list-disc ml-6">
                    {orderLineItems.map((lineItem) => {
                      const product = products.find((product) => product.id === lineItem.product_id);
                      return (
                        <li key={lineItem.id}>
                          {product ? (
                            <div className="flex items-center">
                              <span className="mr-2">{product.name}</span>
                              <span>({lineItem.quantity} bottles)</span>
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
    </div>
  );
};




export default UserDetailsPage;