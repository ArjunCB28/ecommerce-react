import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart } from './components'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  // get the products fromm the products api
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  // get the last saved state of the cart
  const fetchCart = async () => {
    const response = await commerce.cart.retrieve()
    console.log('response', response)
    setCart(response)
  }

  // add products to the cart.
  // function is called when add product is selected
  const addProductsToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  // modify the quantity of the product in the cart
  // when - or + is selected from cart
  const updateProductQtyInCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }

  // remove the product from the cart
  const removeProductFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }

  // remove all products from the cart
  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])
  
  return (
    <Router>
        <div className="App">
          <Navbar totalItems={cart.total_items}/>
          {/* Switch route other than Navbar */}
          <Switch>
            {/* Default route products */}
            <Route exact path="/">
              <Products products={products} onAddToCart={addProductsToCart}/>
            </Route>
            {/* Route to cart */}
            <Route exact path="/cart">
              <Cart 
              cart={cart}
              updateProductQtyInCart={updateProductQtyInCart}
              removeProductFromCart={removeProductFromCart}
              emptyCart={emptyCart}
              ></Cart>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App


// Filter option for product type
// Search ahead
// Test suites