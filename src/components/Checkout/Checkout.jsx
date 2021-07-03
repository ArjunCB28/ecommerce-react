import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core'
import useStyles from './styles'

import Review from './Review'
import AddressForm from './AddressForm'
import Confirmation from './Confirmation'
import { commerce } from '../../lib/commerce'
import { connect } from 'react-redux'
import { CaptureCheckout } from '../../utils/cartServices'

const mapStateToProps = (state) => {
    return {
        cart: state?.cart,
        order: state?.order
    }
}

const Checkout = ({ cart, order }) => {
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

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart?.id, { type: 'cart' })
                const method = await commerce.checkout.getShippingOptions(token.id, { country: 'CA', region: 'ON' })
                setCheckoutToken(token)
                setShippingMethod(method)
            }
            catch (error) {
                console.log('error', error)
            }
        }
        generateToken()
    }, [])

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
                    {activeStep === 2 ? <Confirmation order={order}/> : activeStep === 0 ? <AddressForm next={next}/> : <Review checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={CaptureCheckout} shippingMethod={shippingMethod}/>}
                </Paper>
            </main>
        </div>
    )
}

export default connect(mapStateToProps)(Checkout)

