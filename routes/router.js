// to define routes for client requests

// 1 import express
const express = require('express')

// 4 import product controller
const ProductController = require('../controllers/productController')

const wishlistController = require('../controllers/wishlistController')

const cartController= require('../controllers/cartController')


// 2 using express create a object for router class inorder to setup path
const router = new express.Router()

// 3 use another object to resolve client request
   
    // get all products api request

 router.get('/products/all-products',ProductController.getAllProducts)


//  get a particular product details
router.get('/products/view-product/:id',ProductController.viewProducts)

// add a new product to the wishlist
router.post('/wishlists/add-to-wishlist',wishlistController.addToWishlist)

// view all wishlist items
router.get('/wishlists/view-all-wishlists',wishlistController.getWishlistItems)

// delete a particular wishlist item 
router.delete('/wishlists/delete-wishlist-product/:id',wishlistController.deleteProduct)

// add to cart
router.post('/carts/add-to-cart',cartController.addToCart)

// getcart
router.get('/carts/get-cart',cartController.getCart)

// delete cart product
router.delete('/carts/delete-product/:id',cartController.deleteCartProduct)

// increment cart qunatity
router.get('/carts/increment-product/:id',cartController.incrementProductCount)

// decrement cart qunatity
router.get('/carts/decrement-product/:id',cartController.decrementProductCount)

//  5 export routes
module.exports = router;