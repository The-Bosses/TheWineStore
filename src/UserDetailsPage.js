import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';

const UserDetailsPage = ({auth}) => {
  const [user, setUser] = useState(null);
  const [userOrders, setOrder] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    api.fetchUser(setUser);
  }, [auth]);

  useEffect(() => {
    api.fetchOrder(setOrder);
  }, [auth]);


 return (
    <div>
      {user && (
        <>
          <h2>User Details - {user.username}</h2>
          <p>Name: {user.name}</p>
          <p>Address: {user.address}</p>
          <p>VIP: {user.is_vip ? 'Yes' : 'No'}</p>
          <p>Admin: {user.is_admin ? 'Yes' : 'No'}</p>
        </>
      )}

      <h3>Orders</h3>
      <ul>
        {userOrders.map((order) => (
          <li key={order.id}>
            ({new Date(order.created_at).toLocaleDateString()})
            <span>Total Cost: ${order.total_cost}</span>
            <ul>
              {order.line_items.map((lineItem) => (
                <li key={lineItem.id}>
                  {lineItem.product ? (
                    <div>
                      {lineItem.product.name} ({lineItem.quantity} bottles)
                    </div>
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default UserDetailsPage;
