import { createSlice } from '@reduxjs/toolkit'
import { commerce } from '../lib/commerce'

export const cartStore = createSlice({
    name: 'cart',
    initialState: {
      value: {},
    },
    reducers: {
        // initCart is called when the cart has to be initialized
        initCart: (state, value) => {
            // const populateCart = async () => {
            //     try {
            //         const response = await commerce.cart.retrieve()
            //         state.value = {...response}
            //         console.log('store cart init')
            //     }
            //     catch(error) { console.log(error) }
            // }
            // populateCart()
            state.value = {...value}
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { initCart } = cartStore.actions
  
  export default cartStore.reducer