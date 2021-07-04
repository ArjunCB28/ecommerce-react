import React from 'react'
import { Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './styles'

const Confirmation = ({ order }) => {
    const classes = useStyles()
    return (
        <>
            { order?.customer ?
            (<>
                <div>
                    <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
                </div>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
            </>): (
                <div className={classes.spinner}>
                  <CircularProgress />
                </div>
            )
            } 
        </>
    )
}

export default Confirmation
