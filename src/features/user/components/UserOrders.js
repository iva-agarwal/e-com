import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from '../userSlice';

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  console.log('Orders from Redux store:', orders);


  return (
    <div>
      {orders && orders.map((order) => (
        <div key={order.id}>
          <div>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                 Order # {order.id}
                </h1>
                <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                  Order Status : {order.status}
                </h3>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                 { order.items &&
                        order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.id}>{item.title}</a>
                              </h3>
                              <p className="ml-4">₹{item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty :{item.quantity}
                              </label>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className=" px-4 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹ {order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{order.totalItems} items</p>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      ))}
       
    </div>
  );
}