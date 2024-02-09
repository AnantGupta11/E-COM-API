import UserModel  from "./user.model.js";
import  Jwt  from "jsonwebtoken";

export default class UserController{

    signUp(req,res){
        const {name,email,password,type}=req.body;
        const user=UserModel.signUp(name,email,password,type);
        res.status(201).send(user);
    }
    signIn(req,res){
        const result=UserModel.signIn(
            req.body.email,
            req.body.password
        );
        if(!result){
            return res.status(400).send("Incorrect Credentials");
        }else{
            //1.create token
            const token=Jwt.sign({userId: result.id, email:result.email}, "Q0qy^a-ZT%v/!hevhwuOah",{
                expiresIn: '1h'
            });
            //2.send token
            res.status(200).send(token);
        }
    }
}