import { RequestHandler } from "express";

export const rideRequest:RequestHandler= (req,res) => {
    try{
        const {pickup, dropoff } = req.body
        const {userId} = res.locals.decodedToken;
        console.log(userId);
        
    }catch(err){
        console.log(err);
        
    }
}