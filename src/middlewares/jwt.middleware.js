import  Jwt  from "jsonwebtoken";
const jwtAuth=(req,res,next)=>{
    //1. Read the token
    const token=req.headers["authorization"];
    //2. if no token return the error
    if(!token){
        return res.status(401).send("Unauthorized Access");
    }

    //3. check if token is valid.
    try{
        const payload=Jwt.verify(token,"Q0qy^a-ZT%v/!hevhwuOah");
        req.userID=payload.userId;
        console.log(payload);
    }catch(err){
        //4. return error
        console.log(err);
        return res.status(401).send("Unauthorized Access");
    }
    
    //5. call next middleware

    next();
}

export default jwtAuth;