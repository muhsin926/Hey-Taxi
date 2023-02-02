import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import env from "../utility/validateEnv";


interface UserRequest extends RequestHandler {
  user: any;
}

export const authenticateToken:RequestHandler = (req, res, next) => {
 
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    //const decoded = jwt.verify(token, env.JWT_SECRET);
    //req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }



 
  // const token = req.body.token.split('=')[1]
  
  //   // const authHeader = req.headers['authorization']
  //   // const token = authHeader && authHeader.split(' ')[1]
  
  //   if (token == null) return res.status(401).json({status:false})
  
  //   jwt.verify(token, env.JWT_SECRET as string , (err: any, user: any) => {
  //     console.log(err)
  
  //     if (err) return res.status(403).json({status:false})
  
  //     return res.json({status:true})
  //     next()
  //   })
  }