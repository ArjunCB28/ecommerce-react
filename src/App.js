import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, Checkout } from './components'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { initCart } from './store/cart.store'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [shippingMethods, setShippingMethods] = useState({})

  const cartFromStore = useSelector((state) => state.cart.value)
  const dispatch = useDispatch()

  // get the products from the products api
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  // get the last saved state of the cart
  const fetchCart = async () => {
    const response = await commerce.cart.retrieve()
    console.log('app.js fetchCart response', response)
    setCart(response)
    // dispatch(initCart(response))
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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
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
            {/* Checkout route */}
            <Route exact path="/checkout">
              <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>
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