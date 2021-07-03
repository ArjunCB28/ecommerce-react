import * as actionTypes from './actionTypes'
import store from './store'

export const SetCartValue = data => {
    store.dispatch({
        type: actionTypes.SET_CART,
        payload: {
          cart: data
        }
    })
}

export const SetOrder = data => {
  store.dispatch({
      type: actionTypes.SET_ORDER,
      payload: {
        order: data
      }
  })
}

// return object
// export const initCart = data => ({type:'',payload:{}})