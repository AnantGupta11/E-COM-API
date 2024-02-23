import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository{
    async signUp(newUser) {
        try{
          //Get the database
            const db=getDB();
  
            //get the collection
            const collection=db.collection("users");
            
            // newUser.id = users.length + 1;
            // users.push(newUser);
  
            //insert the document
            await collection.insertOne(newUser);
            return newUser;
        }catch(err){
          console.log(err);
          throw new ApplicationError("Something went wrong with database",500);
        }
        
    }


    async signIn(email,password) {
        try{
          //Get the database
            const db=getDB();
  
            //get the collection
            const collection=db.collection("users");
            
            //find the document
            return await collection.findOne({email,password});

        }catch(err){
          console.log(err);
          throw new ApplicationError("Something went wrong with database",500);
        }
        
    }

    async findByEmail(email) {
        try{
          //Get the database
            const db=getDB();
  
            //get the collection
            const collection=db.collection("users");
            
            //find the document
            return await collection.findOne({email});
            
        }catch(err){
          console.log(err);
          throw new ApplicationError("Something went wrong with database",500);
        }
        
    }
}

export default UserRepository;