import React from 'react'
import { Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';

const Review = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {

    const placeOrder = () => {
        const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
            shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: 'ON', postal_zip_code: shippingData.zip, country: 'CA' },
            fulfillment: { shipping_method: shippingData.shippingOption },
            payment: {
              gateway: 'CaseOnDelivery',
              stripe: {
                payment_method_id: 10001,
              }
            }
          }
    
        onCaptureCheckout(checkoutToken.id, orderData)
        nextStep()
    }
    // paymentform add the onCaptureCheckout and orderData
    return (
        <>
            <Typography variant="h6" gutterBottom>Review order</Typography>
            <List disablePadding>
                {checkoutToken?.live?.line_items.map((product) => (
                    <ListItem style={{ padding: '10px 0' }} key={product.name}>
                    <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                    <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                    {checkoutToken?.live?.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="button" variant="contained" color="primary" onClick={() => placeOrder()}>Place order</Button>
            </div>
        </>
    )
}

export default Review
