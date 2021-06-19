import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import CustomFormInput from './CustomFormInput'

const AddressForm = ({ next }) => {
    const methods = useForm()

    const  submitData = (data) => {
        console.log('address form shippping data', data)
        next(data)
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(data => submitData({...data}))}>
                    <Grid container spacing={3}>
                        <CustomFormInput required name="firstName" label="First name" />
                        <CustomFormInput required name="lastName" label="Last name" />
                        <CustomFormInput required name="address1" label="Address line 1" />
                        <CustomFormInput required name="email" label="Email" />
                        <CustomFormInput required name="city" label="City" />
                        <CustomFormInput required name="zip" label="Zip / Postal code" />
                        <CustomFormInput required name="country" label="Country" />
                    </Grid>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>

        </>
    )
}

export default AddressForm
