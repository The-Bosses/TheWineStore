import React from 'react';

const Orders = ({ orders, products, lineItems }) => {
  return (
    <div className='p-4 bg-red-950 mb-4'>
      <h2 className="text-3xl font-bold text-white underline mb-4">Orders</h2>
      <ul>
        {orders
          .filter((order) => !order.is_cart)
          .map((order) => {
            const orderLineItems = lineItems.filter(
              (lineItem) => lineItem.order_id === order.id
            );
            return (
              <div
              key={order.id}
              className='m-4 border-b bg-red-100 border-gray-300 rounded-md pb-4'
              >
                <li className='flex-items-center m-4'>
                  ({new Date(order.created_at).toLocaleDateString()})
                  <span className='text-red-500 font-extrabold'> Total Cost: ${order.total_cost}</span>
                  {order.address && <div className='text-black font-bold'>Address: {order.address}</div>}
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
              </div>
            );
          })}
      </ul>
      <h1 className='text-2xl text-center text-white font-bold mb-4'>We Appreciate your Business!</h1>
      <div className="flex justify-center mb-4">
              <img className="flex justify-center"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDW8_TYLy8eVx7Vd4Dk-j04prq_DbtWxciiQ&usqp=CAU" 
                alt="wine bottles" 
              />  
      </div>
    </div>
  );
};

export default Orders;
