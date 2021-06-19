import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart.store'

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
})