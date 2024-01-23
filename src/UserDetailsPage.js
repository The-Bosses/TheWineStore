import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';

const UserDetailsPage = ({auth}) => {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        // Fetch user details
        const userData = await api.fetchUserDetails(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  // useEffect to fetch user orders when the "Fetch Orders" button is clicked
  useEffect(() => {
    const fetchUserOrdersData = async (userId) => {
      try {
        // Fetch user orders
        const ordersData = await api.fetchUserOrders(userId);
        setUserOrders(ordersData);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };
    const buttonClickEvent = document.getElementById('fetchOrdersButton');

    if (buttonClickEvent) {
      buttonClickEvent.addEventListener('click', fetchUserOrdersData);
    }

    return () => {
      // Remove the event listener on component unmount
      if (buttonClickEvent) {
        buttonClickEvent.removeEventListener('click', fetchUserOrdersData);
      }
    };
  }, [auth]); 

  const handleMakeAdmin = async (userId) => {
    try {
      await api.makeUserAdmin(userId);
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  const handleMakeVIP = async (userId) => {
    try {
      await api.makeUserVIP(userId);
    } catch (error) {
      console.error('Error making user VIP:', error);
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      await api.makeUsernotAdmin(userId);
    } catch (error) {
      console.error('Error removing admin privilege:', error);
    }
  };

  const handleRemoveVIP = async (userId) => {
    try {
      await api.makeUsernotVIP(userId);
    } catch (error) {
      console.error('Error removing VIP privilege:', error);
    }
  };

  return (
    <div>
      <h2>User Details - {user && user.username}</h2>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Address: {user.address}</p>
          <p>VIP: {user.is_vip ? 'Yes' : 'No'}</p>
          <p>Admin: {user.is_admin ? 'Yes' : 'No'}</p>
        </>
      )}
      {user && (
        <>
          {user.is_admin ? (
            <button onClick={handleRemoveAdmin}>Remove Admin Privileges</button>
          ) : (
            <button onClick={handleMakeAdmin}>Make Admin</button>
          )}
          {user.is_vip ? (
            <button onClick={handleRemoveVIP}>Remove VIP Privileges</button>
          ) : (
            <button onClick={handleMakeVIP}>Make VIP</button>
          )}
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
  
      <button id="fetchOrdersButton" onClick={fetchUserOrdersData}>
        Fetch Orders
      </button>
    </div>
  );
};

export default UserDetailsPage;
