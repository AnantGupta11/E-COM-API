import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel  from "./user.model.js";
import  Jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js";

export default class UserController{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async signUp(req,res){
        try{
            const {name,email,password,type}=req.body;
            const user= new UserModel(name,email,password,type);
            await this.userRepository.signUp(user);
            res.status(201).send(user);
        }catch(err){
            console.log(err);
            // throw new ApplicationError("Something went wrong",500);
        }
        
    }
    async signIn(req,res){
        try{
            const result=await this.userRepository.signIn(
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
        }catch(err){
            console.log(err);
            // throw new ApplicationError();
            res.status(400).send("Something went wrong");
        }
        
    }
}