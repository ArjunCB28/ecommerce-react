// import { configureStore } from '@reduxjs/toolkit'
// import cartReducer from './cart.store'

import reducer from './reducer'

import { createStore } from 'redux';

const store = createStore(reducer)

export default store;

// export default configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// })