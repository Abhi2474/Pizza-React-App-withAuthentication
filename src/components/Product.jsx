import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { TokenContext } from '../context'

function Product(props) {
    const [isAdding, setIsAdding] = useState(false)

    const { cart, setCart } = useContext(TokenContext)

    const addToCart = (event, product)=>{
        event.preventDefault()
        // console.log(product);
        let _cart = {...cart}
        if(!_cart.items){
            _cart.items = {}
        }
        if(_cart.items[product._id]){
            _cart.items[product._id] += 1
        }else{
            _cart.items[product._id] = 1
        }

        if(!_cart.totalItems){
            _cart.totalItems = 0
        }
        _cart.totalItems += 1

        setCart(_cart)
        setIsAdding(true)

        setTimeout(()=>{
            setIsAdding(false)
        }, 1000)

    }

    // console.log(props);
    const { product } = props
    return (
        <Link to={`/products/${product._id}`}>
            <img style={{ height: 180, width: 180 }}  src={product.image} alt="product" />
            <div className="text-center">
                <h2 className='text-lg font-bold py-2'>{product.name}</h2>
                <span className='bg-gray-200 py-1 rounded-full text-sm px-4'>{product.size}</span>
                <div className='flex items-center justify-between mt-4'>
                    <span>Rs {product.price}</span>
                    <button disabled={isAdding} onClick={(e)=> addToCart(e, product) } className={`${isAdding ?  `bg-green-500  hover:bg-green-600 ` : ` bg-yellow-500  hover:bg-yellow-600`} py-1 px-4 rounded-full font-bold`}>Add{isAdding ? 'ed':''}</button>
                </div>
            </div>
        </Link>
    )
}

export default Product