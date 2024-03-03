import ProductModel from "./product.model.js";
import ProductRepository from './product.repository.js';
export default class ProductController{

    constructor(){
        this.productRespository= new ProductRepository();
    }
    async getAllProduct(req,res){
        try{
            const products=await this.productRespository.getAll();
            res.status(200).send(products);
        }catch(err){
            console.log(err);
            res.status(400).
            send("Something went wrong");
        }
        
    }
    async addProduct(req,res){
        // console.log(req.body);
        try{
            const {name,price,sizes}=req.body;
            const newProduct=new ProductModel(name,null,parseFloat(price),
            req.file.filename,null,sizes.split(','));
        
            const createdRecord=await this.productRespository.add(newProduct);
            res.status(201).send(createdRecord);
        }catch(err){
            console.log(err);
            // throw new ApplicationError();
            res.status(400).
            send("Something went wrong");
        }
        
    }
    async rateProduct(req,res,next){
        console.log(req.query);
        try{
            const userID=req.userID;
            const productID=req.body.productID;
            const rating=req.body.rating;
                await this.productRespository
                .rate(userID,productID,rating);
                //return res.status(400).send(err.message);
            return res
            .status(200)
            .send("Rating has been Added");
        }catch(err){
            console.log("Passing error to middleware");
            next();
        }
    }
    async getOneProduct(req,res){
        try{
            const id=req.params.id;
            const product=await this.productRespository.get(id);
            if(!product){
                res.status(404).send("Product not found");
            }else{
                return res.status(200).send(product);
            }
        }catch(err){
            console.log(err);
            // throw new ApplicationError();
            res.status(400).
            send("Something went wrong");
        }
        
    }

    async filterProduct(req,res){
        try{
            const minPrice=req.query.minPrice;
            const maxPrice=req.query.maxPrice;
            const category=req.query.category;
            const result=await this.productRespository.filter(minPrice,maxPrice,category);
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            // throw new ApplicationError();
            res.status(400).
            send("Something went wrong");
        }
        
    }
}