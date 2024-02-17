import ProductModel from "./product.model.js";

export default class ProductController{
    getAllProduct(req,res){
        const products=ProductModel.GetAll();
        res.status(200).send(products);
    }
    addProduct(req,res){
        // console.log(req.body);
        const {name,price,sizes}=req.body;
        const newProduct={
            name,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl:req.file.filename,
        }
        const createdRecord=ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }
    rateProduct(req,res){
        console.log(req.query);
        const userID=req.query.userID;
        const productID=req.query.productID;
        const rating=req.query.rating;
        try{
            ProductModel
            .rateProduct(userID,productID,rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
        
        return res
        .status(200)
        .send("Rating has been Added");
        
    }
    getOneProduct(req,res){
        const id=req.params.id;
        const product=ProductModel.getOneProduct(id);
        if(!product){
            res.status(404).send("Product not found");
        }else{
            return res.status(200).send(product);
        }
    }

    filterProduct(req,res){
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
        const result=ProductModel.filter(minPrice,maxPrice,category);
        res.status(200).send(result);
    }
}