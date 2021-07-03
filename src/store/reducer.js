import * as actions from './actionTypes'

export default function reducer (state={}, action) {
    if (action.type === actions.SET_CART) {
        const tempState = {...state}
        tempState.cart = action.payload.cart
        state = tempState
    }
    else if (action.type === actions.SET_ORDER) {
        const tempState = {...state}
        tempState.order = action.payload.order
        state = tempState
    }
    return state
}