import React, { useEffect, useState } from "react"
import { RegisterForm, LoginForm, Me, Navbar } from "./components"
import { Cart, Products, SingleProduct } from "./pages"
import { TokenContext } from "./context"
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const accessToken = localStorage.getItem('access_token');
  const refreshLocalToken = localStorage.getItem('refresh_token');
  // console.log(accessToken);
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([])
  const [totalSum, setTotalSum] = useState(0)

  useEffect(() => {
    const cart = window.localStorage.getItem('cart')
    setCart(JSON.parse(cart))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true)
    }
  }, [])

  return (
    <>
      <TokenContext.Provider value={{ cart, setCart, authenticated, setAuthenticated, products, setProducts, totalSum, setTotalSum }}>
        <BrowserRouter>
          <Navbar accessToken={accessToken} refreshLocalToken={refreshLocalToken} />
          <div className="flex justify-evenly my-5">
            <Routes>
              <Route path="/register" element={<RegisterForm />} />
              {
                !authenticated ?
                  <Route path="/login" element={<LoginForm />} />
                  :
                  <>
                  <Route path="/" element={<Products accessToken={accessToken} />} />
                  <Route path="/products/:_id" element={<SingleProduct accessToken={accessToken} />} />
                  <Route path='/cart' element={<Cart />} />
                  </>
              }
            </Routes>
          </div>
        </BrowserRouter>
      </TokenContext.Provider>
    </>
  )
}

export default App
