import { commerce } from '../lib/commerce'
import { SetCartValue, SetOrder } from '../store/actions'

// get the last saved state of the cart
export const InitCart = async () => {
    const response = await commerce.cart.retrieve()
    SetCartValue(response)
}

export const AddProductToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    SetCartValue(cart)
}

export const UpdateProductQtyInCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    SetCartValue(cart)
}

export const RemoveProductFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)
    SetCartValue(cart)
}

export const EmptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    SetCartValue(cart)
}

export const CaptureCheckout = async (checkoutTokenId, newOrder) => {
    if (newOrder === undefined) return
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      SetOrder(incomingOrder)
      RefreshCart()
    } catch (error) {
      window.alert(error.data.error.message)
    }
}

export const RefreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    SetCartValue(newCart)
}
