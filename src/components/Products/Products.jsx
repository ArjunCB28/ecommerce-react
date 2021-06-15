import React from 'react';
import { Grid } from '@material-ui/core'
import Product from './Product/Product'

const productsList = [
    { id: 1, name: 'Shoes', price: '$5.99', description: 'Casual Shoes', image: 'https://5.imimg.com/data5/WY/SF/LR/IOS-36216371/product-jpeg-500x500.png'},
    { id: 2, name: 'Adidas Shoes', price: '$5.99', description: 'Sports Shoes', image: 'https://5.imimg.com/data5/NG/DV/TO/ANDROID-85453630/product-jpeg-500x500.jpg' }
]

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {productsList.map(product => {
                    return <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product}/>
                    </Grid>
                })}
            </Grid>
        </main>
    )
}

export default Products;