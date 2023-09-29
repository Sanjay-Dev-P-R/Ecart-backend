const carts = require('../models/cartSchema')

// add to cart collection
exports.addToCart = async (req, res) => {
    // get product details form the requests
    const { id, title, price, image, quantity } = req.body

    // logic
    try {
        // check if the products is present
        const products = await carts.findOne({ id })
        if (products) {
            // product is present in the cart, update the quantity and price accordingly 
            products.quantity += 1;

            // update grand total
            products.grandTotal = products.price * products.quantity

            // save changes to the db
            products.save();

            // send response back to the client 
            res.status(200).json("Product details updated")
        }

        else {
            // the products is not present
            const newProduct = new carts({
                id, title, price, image, quantity, grandTotal: price
            })

            // save new product details
            newProduct.save();

            // send Response back to client
            res.status(200).json("Product added successfully")
        }

    }
    catch (error) {
        res.status(404).json(error)

    }
}


// get cart product
exports.getCart = async (req, res) => {
    // logic
    try {
        const allCart = await carts.find();
        res.status(200).json(allCart)
    }
    catch (error) {
        res.status(404).json(error)

    }

}


exports.deleteCartProduct = async (req, res) => {
    // logic
    // get id from path parameter
    const { id } = req.params
    try {
        const removeProduct = await carts.deleteOne({ id });
        // get remaining product details after deleting a particular product 
        if (removeProduct.deleteCount != 0) {//get al remaining product from the cart

            const allProducts = await carts.find()
            res.status(200).json(allProducts)
        }
    }
    catch (error) {

        res.status(400).json(error)
    }
}



// increment the cart product count
exports.incrementProductCount = async (req, res) => {
    const { id } = req.params
    // find product id 
    try {
        // if the product is already in the cart then quantity will be incremented by  1
        // then update the grand total 
        const product = await carts.findOne({ id });
        if (product) {
            product.quantity += 1;
            product.grandTotal = product.price * product.quantity;
            // save changes to the database
            await product.save()
            // after the product has been saved ,update the content into the client side 
            const allCart = await carts.find()
            res.status(200).json(allCart)
        }
        else {
            res.status(404).json("product not found")
        }

    }
    catch (error) {
        res.status(404).json(error)
    }
}


exports.decrementProductCount = async (req, res) => {
    const { id } = req.params
    // find product id 
    try {
        // if the product is already in the cart then quantity will be incremented by  1
        // then update the grand total 
        const product = await carts.findOne({ id });
        if (product) {
            product.quantity -= 1;
            if (product.quantity == 0) {
                // remove the product from the cart
                await carts.deleteOne({ id })
                // remaining product will be send back to client
                const allCart = await carts.find()
                res.status(200).json(allCart)
            }
            else { // update grand total
                product.grandTotal = product.price * product.quantity
                // save changes to the database
                await product.save()
                // after the product has been saved ,update the content into the client side 
                const allCart = await carts.find()
                res.status(200).json(allCart)
            }

        }
        else {
            res.status(404).json("product not found")
        }

    }
    catch (error) {
        res.status(404).json(error)
    }
}