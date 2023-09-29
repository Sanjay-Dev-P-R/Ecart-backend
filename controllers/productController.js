// logic for getting all product from mongodb

// 1 import product collection
const products = require('../models/productSchema') 

// 2 create a function for getting all products
exports.getAllProducts = async(req,res)=>{
    try{
        const allProducts = await products.find()
        res.status(200).json(allProducts)//response send back to client 

    }
    catch(error){
        res.status(401).json(error)//error message send back to client

    }
}

// View particular product details 
exports.viewProducts=async(req,res)=>{

    const id= req.params.id;
    try{
    //    check if product id is present in the db 
    const product = await products.findOne({id})
    if(product){
        res.status(200).json(product)//send product details to client 
    }
    else{
        res.status(404).json("Product not found")
    }
    }
    catch(error){
         res.status(401).json(error)
    }
}