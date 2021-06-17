import React from 'react';
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles';

// const productsList = [
//     { id: 1, name: 'Shoes', price: '$5.99', description: 'Casual Shoes', image: 'https://5.imimg.com/data5/WY/SF/LR/IOS-36216371/product-jpeg-500x500.png'},
//     { id: 2, name: 'Adidas Shoes', price: '$5.99', description: 'Sports Shoes', image: 'https://5.imimg.com/data5/NG/DV/TO/ANDROID-85453630/product-jpeg-500x500.jpg' }
// ]

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();
    console.log('products', products)
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map(product => {
                    return <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                })}
            </Grid>
        </main>
    )
}

export default Products;