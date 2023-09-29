// logic for wishlist 
// import wishlist from model 
 const wishlists = require('../models/wishlistSchema');
 

// logic for add wishlist 
exports.addToWishlist=async(req,res)=>{
    // get product details
    // req.body{
    //     id:98,
    //     title:'erfa',
    //     price:3444
    // }
    // destructuring
    const {id,title,price,image}=req.body;

    // logic
   try{
     // check if product already available in list
     const item = await wishlists.findOne({id})
     if(item){
         res.status(403).json("Product is already available in wishlists")
     }
     else{
         // add a new product to the wishlists
         const newProduct = new wishlists({id,title,price,image})
         // to store the new product in the wishlist
         await newProduct.save()
         // send response back to the client
         res.status(200).json("Product added successfully")
     }
   }
   catch(error){
    res.status(401).json(error)

   }
}


// get all wishlist products
exports.getWishlistItems=async(req,res)=>{
    // logic
    try{
        const allWishlist=await wishlists.find()
        res.status(200).json(allWishlist)//wishlist product details 

    }
    catch(error){
        res.status(404).json(error)

    }
}


// to delete products
exports.deleteProduct=async(req,res)=>{
    // logic
    // get id from path parameter
    const {id}=req.params
    try{
        const removeProduct=await wishlists.deleteOne({id});
        // get remaining product details after deleting a particular product 
        if(removeProduct){
            const allItems=await wishlists.find()
            res.status(200).json(allItems)
        }
    }
    catch(error){

        res.status(400).json(error)
    }
}