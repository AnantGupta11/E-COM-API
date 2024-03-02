import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel{
    constructor( name, desc, price, imageUrl, category, sizes,id){
        this._id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
    }
    
    static rateProduct(userID,productID,rating){
      //1. validating user and product
      const user=UserModel.getAll().find((u)=>u.id==userID);
      if(!user){
        throw new ApplicationError("User not found",404);
      }

      // validating product
      const product=products.find((p)=>p.id==productID);
      if(!product){
        throw new ApplicationError("Product not found",400);
      }

      //2. check if there are any rating and if not then add ratings array
      if(!product.ratings){
        product.ratings=[];
        product.ratings.push({userID:userID, rating:rating});
      }else{
        //check if user rating already given
        const existingRatingIndex = product.ratings.findIndex(r=>r.userID==userID);
        if(existingRatingIndex >=0){
          product.ratings[existingRatingIndex]={
            userID:userID, rating:rating
          }
        }else{

          //if no existing rating then add rating
          products.ratings.push({userID:userID, rating:rating});
        }
      }

    }

} 

