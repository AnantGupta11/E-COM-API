//Manage routes/paths to ProductController

//1. Import express
import express from "express";
import ProductController from "./product.controller.js";

//2. Initialize Express router
const ProductRouter=express.Router();

const productController = new ProductController();
//All the paths to controller methods.
ProductRouter.get("/", productController.getAllProduct);
ProductRouter.post("/",productController.addProduct);

export default ProductRouter;
