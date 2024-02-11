import CartItemModel from "./cartItem.model.js";
export class CartItemsController{

    add(req,res){
        //const { productID , quantity}=req.query;
        const productID=req.query.productID;
        const quantity=req.query.quantity;
        const userID=req.userID;
        console.log(userID);
        CartItemModel.add(productID,userID,quantity);
        res.status(201).send("Cart is updated");
    }
    get(req,res){
        const userID=req.userID;
        const items=CartItemModel.get(userID);
        return res.status(200).send(items);
    }
    delete(req,res){
        const userID=req.userID;
        const cartItemID=req.params.id;
        const error=CartItemModel.delete(cartItemID,userID);
        if(error){
            return res.status(404).send(error);
        }
        return res.status(200).send("CartItem deleted from cart");
    }
}