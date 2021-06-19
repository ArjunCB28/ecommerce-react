import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import { Link } from 'react-router-dom'

import Review from './Review'
import AddressForm from './AddressForm'
import { commerce } from '../../lib/commerce'

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    console.log('cart Checkout', cart)
    const classes = useStyles()
    const steps = ['Shipping address', 'Review']
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [shippingMethod, setShippingMethod] = useState([])
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        console.log('shippingData', data)
        setShippingData(data)
        nextStep()
    }

    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ))
    
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        )
      }

    useEffect(() => {
        console.log('cart', cart)
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                const method = await commerce.checkout.getShippingOptions(token.id, { country: 'CA', region: 'ON' })
                setCheckoutToken(token)
                setShippingMethod(method)
                console.log('token, method ', token, method)
            }
            catch (error) {
                console.log('error', error)
            }
        }
        generateToken()
    }, [cart])

    return (
        <div className={classes.toolbar}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 2 ? <Confirmation/> : activeStep === 0 ? <AddressForm next={next}/> : <Review checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} shippingMethod={shippingMethod}/>}
                </Paper>
            </main>
        </div>
    )
}

export default Checkout
