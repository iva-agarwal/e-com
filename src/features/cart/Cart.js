import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../navbar/Navbar';
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from './CartSlice';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);
  const totalAmount=items.reduce((amount,item)=>item.price*item.quantity+amount,0)
  const totalItems=items.reduce((total,item)=>item.quantity+total,0)
  const handleQuantity=(e, item)=>{
    dispatch( updateCartAsync({...item,quantity: +e.target.value}))
  }
  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }
  return (
    <div>
          {!items.length && <Navigate to='/' replace={true}></Navigate>}

      <Navbar />
      <div className="mx-auto mt-12 max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2 className='text-3xl'>Cart</h2>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.thumbnail} // Make sure 'thumbnail' is the correct property
                      alt={item.title} // Make sure 'title' is the correct property
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.href}>{item.title}</a>
                        </h3>
                        <p className="ml-4">₹{item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">Qty
                        <select onChange={(e)=>handleQuantity(e,item)}>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </select>
                      </div>
                      <div className="flex">
                        <button
                        onClick={(e)=>handleRemove(e,item.id)}
                          type="button"
                          className="font-medium text-black-600 hover:text-black-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Items</p>
            <p>{totalItems}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to='/checkout'
              className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or &nbsp;
              <Link to='/'>
                <button
                  type="button"
                  className="font-medium text-black-600 hover:text-black-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
