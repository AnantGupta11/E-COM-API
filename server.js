// 1. Import Exprerss
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItem.routes.js';
import apiDocs from './swagger.json' assert {type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import connectToMongoDB from './src/config/mongodb.js';

// 2. Create Server
const server = express();

// CORS policy configuration
server.use(cors());
// server.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","http://localhost:5500");
//   res.header("Access-Control-Allow-Headers",'*');
//   res.header("Access-Control-Allow-Methods",'*');
//   //return ok for preflight request
//   if(req.method=="OPTIONS"){
//     return res.sendStatus(200);
//   }
// })

server.use(express.json());

// for all requests related to product, redirect to product routes.
// localhost:3200/api/productss
server.use("/api-docs",swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);
server.use('/api/products', jwtAuth, productRouter);
server.use('/api/users', userRouter);
server.use('/api/cartItems',jwtAuth, cartRouter);
// 3. Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});

//Error handler middleware
server.use((err,req,res,next)=>{
  console.log(err);
  if(err instanceof ApplicationError){
    res.status(err.code).send(err.message);
  }

  //server errors
  res.status(500).send("Something went wrong, please try Later");

})

//4. middleware to handle 404 request
server.use((req,res,next)=>{
  res.status(404).send("API not found");
  next();
})

// 5. Specify port.
server.listen(3200,()=>{
  console.log('Server is running at 3200');
  connectToMongoDB();
});
