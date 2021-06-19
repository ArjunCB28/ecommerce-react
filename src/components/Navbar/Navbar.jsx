import React from 'react'
import{ AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import ReactImage from '../../assets/ReactImage.png'
import useStyles  from './styles'

const Navbar = ({ totalItems }) => {
    const classes = useStyles()
    const location = useLocation()
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" className={classes.title} color="inherit">
                        <img src={ReactImage} alt="Commerce.js" height="25px" className={classes.image}/>
                        E-Commerce React Shop
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        {location.pathname === '/' && (
                            <IconButton component={Link} to="/cart" aria-label="Shop cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default Navbar
