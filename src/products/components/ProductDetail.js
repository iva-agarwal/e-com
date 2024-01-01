
import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { fetchAllProductByIdAsync, selectProductById} from '../ProductSlice'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {selectLoggedInUser} from '../../features/auth/authSlice'
import { addToCartAsync } from '../../features/cart/CartSlice';
import Notification from './Notification';
const colors=[
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]
const sizes= [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true },
]
const highlights=[
  "180 GSM, 100% Cotton, Colour Block, Pre-Shrunk & Bio-Washed Fabric",
"Screen Printed",
"Oversize Fit",
"Colors may vary due to photography and your screen setting"
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[2])
  const user = useSelector(selectLoggedInUser)
  const product=useSelector(selectProductById);
  const dispatch= useDispatch();
  const params= useParams();
  const [showNotification, setShowNotification] = useState(false); // State to control whether to show the notification

const handleCart=(e,product)=>{
  console.log('abcd')
  e.preventDefault();
  const newItem={...product,quantity:1,user:user.id}
  delete newItem['id']
  dispatch(addToCartAsync(newItem))
  setShowNotification(true);

    // Hide the notification after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
}
useEffect(()=>{
 
  dispatch(fetchAllProductByIdAsync(params.id))
},[dispatch,params.id])

  return (
 <div className="bg-white">
   {product &&  (<div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs && product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
  {product.images.slice(0, 3).map((image, index) => (
    <div key={index} className={`aspect-h-5 aspect-w-4 ${index === 1 ? 'lg:aspect-h-4 lg:aspect-w-3' : ''} sm:overflow-hidden sm:rounded-lg`}>
      <img
        src={image}
        alt={product.title}
        className="h-full w-full object-cover object-center"
      />
    </div>
  ))}
</div>


        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">₹{product.price}</p>
  {/* Add Notification component */}
  {showNotification && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          Product added to cart
        </div>
      )}
            {/* Reviews */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating } out of 5 stars</p>
               
              </div>
            </div> */}

            <form className="mt-10">
              {/* Colors */}
              {/* <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

              {/* Sizes */}
              {product.category === 'Apparel'&& (
  <div className="mt-10">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-900">Size</h3>
      <a href="#" className="text-sm font-medium text-black-600 hover:text-black-500">
        Size guide
      </a>
    </div>

    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
      <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
        {sizes.map((size) => (
          <RadioGroup.Option
            key={size.name}
            value={size}
            disabled={!size.inStock}
            className={({ active }) =>
              classNames(
                size.inStock
                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                  : 'cursor-not-allowed bg-gray-50 text-gray-200',
                active ? 'ring-2 ring-black-500' : '',
                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                {size.inStock ? (
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-black-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-md'
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                  >
                    <svg
                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      stroke="currentColor"
                    >
                      <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                )}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  </div>
)}
  {product.category === 'Shirts (Hawaiian)'&& (
  <div className="mt-10">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-900">Size</h3>
      <a href="#" className="text-sm font-medium text-black-600 hover:text-black-500">
        Size guide
      </a>
    </div>

    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
      <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
        {sizes.map((size) => (
          <RadioGroup.Option
            key={size.name}
            value={size}
            disabled={!size.inStock}
            className={({ active }) =>
              classNames(
                size.inStock
                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                  : 'cursor-not-allowed bg-gray-50 text-gray-200',
                active ? 'ring-2 ring-black-500' : '',
                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                {size.inStock ? (
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-black-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-md'
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                  >
                    <svg
                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      stroke="currentColor"
                    >
                      <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                )}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  </div>
)}


            <button
  onClick={(e) => handleCart(e, product)}
  type="submit"
  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-black-200 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2"
>
  Add to cart
</button>

            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            
          </div>
        </div>
      </div>)}
    </div>
  )
}
export default ProductDetail;
