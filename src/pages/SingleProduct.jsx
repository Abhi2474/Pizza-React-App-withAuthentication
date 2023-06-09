import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TokenContext } from '../context'

function SingleProduct() {

  const [isAdding, setIsAdding] = useState(false)
  const { cart, setCart } = useContext(TokenContext)
  const [product, setProduct] = useState([])

  const params = useParams()
  console.log(params);

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${params._id}`)
      .then(res => res.json())
      .then(product => {
        setProduct(product)
      })
  }, [params._id])

  const addToCart = (event, product) => {
    event.preventDefault()
    // console.log(product);
    let _cart = { ...cart }
    if (!_cart.items) {
      _cart.items = {}
    }
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1
    } else {
      _cart.items[product._id] = 1
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0
    }
    _cart.totalItems += 1

    setCart(_cart)
    setIsAdding(true)

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)

  }

  return (
    <div className='container mx-auto mt-12'>
      <button className='mb-12 font-bold' onClick={() => navigate(-1)}>Back</button>
      <div className="flex">
        <img className='w-1/4' src={product.image} alt="" />
        <div className='ml-16'>
          <h1 className='text-xl font-bold'>{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">{product.price}</div>
          <button disabled={isAdding} onClick={(e) => addToCart(e, product)} className={`${isAdding ? `bg-green-500  hover:bg-green-600 ` : ` bg-yellow-500  hover:bg-yellow-600`} py-1 px-4 rounded-full font-bold`}>Add{isAdding ? 'ed' : ''} to cart</button>
        </div>
      </div>

    </div>
  )
}

export default SingleProduct