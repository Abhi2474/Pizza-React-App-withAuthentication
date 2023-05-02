import React, { useState, useEffect, useContext } from 'react'
import  Product  from '../components/Product'
import axios from 'axios'
import { TokenContext } from '../context'

function Products({ accessToken }) {

    const [products, setProducts] = useState([])
    const { setAuthenticated } = useContext(TokenContext)

    useEffect(() => {
      if(accessToken){
        axios.get('http://localhost:5000/api/productslogin', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => {
          // console.log(response.data);
          setProducts(response.data)
          setAuthenticated(true)
        })
        .catch(error => {
          console.log(error);
        })
      }
      else{
        setProducts([])
      }
      
    }, [accessToken])


    return (
        <>
            <div className="container mx-auto pb-24">
                <h1 className='my-8 font-bold text-lg'>Products</h1>
                <div className="grid grid-cols-5 my-8 gap-24">
                    {
                        products.map((product) => <Product key={product._id} product={product} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Products