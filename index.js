// 1 automatically load .emv file into the application
require('dotenv').config()

// 2 import express
const express =require('express')

// 6 import cors
const cors =require('cors')

// 9 import connection.js
require('./connection')

// 10 import router
const router = require('./routes/router')

// 3 create an application using the express
const server = express()

// 4  define the port number 
const PORT = 5000

// 7 use cors in server app 
server.use(cors())
server.use(express.json())

// 11 use server 
server.use(router)

//5 run the application
server.listen(PORT,()=>{
    console.log('listening on the port '+PORT);
})

// 8 define routes
server.get('/',(req,res)=>{
    res.status(200).json('Ecommerce Service Started')
})