import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, Checkout } from './components'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { InitCart } from './utils/cartServices'

const App = () => {
  const [products, setProducts] = useState([])

  // get the products from the products api
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  useEffect(() => {
    InitCart()
    fetchProducts()
  }, [])
  
  return (
    <Router>
        <div className="App">
          <Navbar />
          {/* Switch route other than Navbar */}
          <Switch>
            {/* Default route products */}
            <Route exact path="/">
              <Products products={products}/>
            </Route>
            {/* Route to cart */}
            <Route exact path="/cart">
              <Cart/>
            </Route>
            {/* Checkout route */}
            <Route exact path="/checkout">
              <Checkout/>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App
