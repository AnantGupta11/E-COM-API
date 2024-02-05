import ProductModel from "./product.model.js";

export default class ProductController{
    getAllProduct(req,res){
        const products=ProductModel.GetAll();
        res.status(200).send(products);
    }
    addProduct(req,res){
        console.log(req.body);
        console.log("This is a post request");
        res.status(200).send("Post Request Received");
    }
    rateProduct(req,res){

    }
    getOneProduct(req,res){
        
    }
}