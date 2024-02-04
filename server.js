import express from "express";


const server=express();



server.get('/',(req,res)=>{
    res.send("Welcome to E-com Api");
})


server.listen(3200,()=>{
    console.log("Server is Listining on Port 3200");
})