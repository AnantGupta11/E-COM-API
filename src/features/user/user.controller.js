import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel  from "./user.model.js";
import  Jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export default class UserController{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async signUp(req,res){
        try{
            const {name,email,password,type}=req.body;
            const hashedPassword= await bcrypt.hash(password,12);
            const user= new UserModel(name,email,hashedPassword,type);
            await this.userRepository.signUp(user);
            res.status(201).send(user);
        }catch(err){
            console.log(err);
            // throw new ApplicationError("Something went wrong",500);
        }
        
    }
    async signIn(req,res){
        try{
            const user= await this.userRepository.findByEmail(req.body.email);

            if(!user){
              return res.status(400)
              .send("Incorrect Credentials"); 
               
            }else{
                //compare password with hashed password.
                const result=await bcrypt.compare(req.body.password, user.password);

                if(result){
                    //1.create token
                    const token=Jwt.sign(
                        {userId: user._id,
                             email:user.email},
                              process.env.JWT_SECRET,{
                        expiresIn: '1h'
                    });
                    //2.send token
                    res.status(200).send(token);

                }else{
                    console.log(user.password);
                    return res.status(400).send("Incorrect Credentials");
                }
            }
        }catch(err){
            console.log(err);
            // throw new ApplicationError();
            res.status(400).send("Something went wrong");
        }
        
    }
}