import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../context'

function Cart() {

	let totalSum = 0

	const [products, setProducts] = useState([])
	const [priceFetched, togglepriceFetched] = useState(false)
	const { cart, setCart } = useContext(TokenContext)
	// console.log(cart);

	useEffect(() => {
		if (!cart.items) {
			return
		}

		if (priceFetched) {
			return;
		}

		fetch('http://localhost:5000/api/products/cart-items', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ids: Object.keys(cart.items) })
		})
			.then(res => res.json())
			.then(products => {
				setProducts(products)
				togglepriceFetched(true)
			})
	}, [cart])


	const Qty = (productId) => {
		return cart.items[productId]
	}

	const increment = (productId) => {
		const existingQty = cart.items[productId]
		const _cart = { ...cart };
		_cart.items[productId] = existingQty + 1
		_cart.totalItems += 1
		setCart(_cart)
	}

	const decrement = (productId) => {
		const _cart = { ...cart };
		if (_cart.items[productId] < 1) {
			return;
		}
		const existingQty = cart.items[productId]
		_cart.items[productId] = existingQty - 1
		_cart.totalItems -= 1
		setCart(_cart)
	}

	const getSum = (productId, productPrice) => {
		const sum = productPrice * Qty(productId)
		totalSum += sum
		return sum
	}

	const handleDelete = (productId) => {
		const _cart = { ...cart }
		const qty = _cart.items[productId]
		delete _cart.items[productId];
		_cart.totalItems -= qty
		const updatedProductsList = products.filter((product) => product._id !== productId)
		setProducts(updatedProductsList)
		setCart(_cart)
	}

	const handleOrderNow = function () {
		window.alert("Order Placed Successfully !!!")
		setCart({})
		setProducts([])
	}

	return (
		<>
			{
				!products.length
					? <img className='mx-auto w-1/2 mt-12' src="/images/logo.png" alt="" />
					:
					<div className="container mx-auto lg:w-1/2 w-full pb-24">
						<h1 className='my-12 font-bold'>Cart Items</h1>
						<ul>
							{
								products.map((products) => {
									return (
										<li key={products._id}>
											<div className='flex items-center justify-between mb-8'>
												<div className="flex items-center">
													{/* <img style={{ height: 70 }} src={products.image} alt="logo" /> */}
													<img style={{ height: 80, width: 80 }} src={products.image} alt="logo" />
													<span className='font-bold ml-4 w-48'>{products.name}</span>
												</div>
												<div className="">
													<button onClick={() => decrement(products._id)} className='rounded-full bg-yellow-500 leading-none px-4 py-2 hover:bg-yellow-600'>-</button>
													<span className='px-4'>{Qty(products._id)}</span>
													<button onClick={() => increment(products._id)} className='rounded-full bg-yellow-500 leading-none px-4 py-2 hover:bg-yellow-600'>+</button>
												</div>
												<span>{getSum(products._id, products.price)}</span>
												<button onClick={() => handleDelete(products._id)} className='rounded-full bg-red-600 hover:bg-red-700 text-white font-bold leading-none px-4 py-2'>Delete</button>
											</div>
										</li>
									)
								})
							}
						</ul>
						<hr className='my-6' />
						<div className='mb-4 text-right'>
							<b>Grand Total:</b> Rs {totalSum}
						</div>
						<div className='text-right'>
							<button onClick={() => handleOrderNow()} className='rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold leading-none px-4 py-2'>Order Now</button>
						</div>
					</div>
			}

		</>
	)
}

export default Cart