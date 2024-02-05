import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";

const server=express();
server.use(bodyParser.json());
//for all requests releated to product, redirect to product routes
server.use("/api/products", ProductRouter);

server.get('/',(req,res)=>{
    res.send("Welcome to E-com Api");
})


server.listen(3200,()=>{
    console.log("Server is Listining on Port 3200");
})