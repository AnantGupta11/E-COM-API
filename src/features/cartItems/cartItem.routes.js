
import express from "express";
import {CartItemsController} from "./cartItem.controller.js";
//import CartItemsController from "./cartItem.controller.js";


const cartRouter=express.Router();

const cartItemsController= new CartItemsController();

cartRouter.post("/", (req,res,next)=>{
    cartItemsController.add(req,res,next)
});
cartRouter.get("/", (req,res,next)=>{
    cartItemsController.get(req,res,next)
});
cartRouter.delete("/:id", (req,res,next)=>{
    cartItemsController.delete(req,res,next)});

export default cartRouter;