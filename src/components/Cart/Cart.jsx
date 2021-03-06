import React from 'react'
import { Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './styles';
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
import { UpdateProductQtyInCart, RemoveProductFromCart, EmptyCart } from '../../utils/cartServices'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        cart: state?.cart
    }
}

const Cart = ({ cart }) => {
    const classes = useStyles()
    console.log('cart cart.jsx', cart)
    const isCartEmpty = !cart?.line_items?.length
    const EmptyCartComponent = () => (
        <Typography variant="subtitle1">Cart is empty</Typography>
    )
    const CartWithItems = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item}
                        updateProductQtyInCart={UpdateProductQtyInCart}
                        removeProductFromCart={RemoveProductFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant="h6">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                    <div>
                        <Button className={classes.emptyButton} onClick={EmptyCart} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                        <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
                </Typography>
            </div>
        </>
    )
    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h6" gutterBottom>Your Shopping Cart</Typography>
            { isCartEmpty ? <EmptyCartComponent/> : CartWithItems() }
        </Container>
    )
}

export default connect(mapStateToProps)(Cart)
