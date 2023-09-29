// connect node and mongodb
// 1 import mongoose
const mongoose = require ('mongoose')

// 2 add connection from .emv
const DB =process.env.DATABASE

// 3 connection code 
mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true ,
}).then(()=>{
    console.log('database connection established');
}).catch((err)=>{
    console.log(err);
})