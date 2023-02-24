import { RequestHandler } from "express";
import fileUploader from "../../cloudinery/fileUploader";
import passengerModel from "../../model/passengerModel";

export const rideRequest: RequestHandler = (req, res) => {
  try {
    const { pickup, dropoff } = req.body;
    const { userId } = res.locals.decodedToken;
    console.log(userId);
  } catch (err) {
    console.log(err);
  }
};

export const getPassenger: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.decodedToken;
    const user = await passengerModel.findOne({ _id: userId });
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
};

export const patchPassenger : RequestHandler = async(req,res) => {
    try{
        const { name, email, mob } = req.body.values
        const { dp } = req.body
        const { userId } = res.locals.decodedToken;
        // const profilePicter = fileUploader(dp)
        await passengerModel.updateOne({_id:userId},{
            name,
            email,
            mobile: mob,
        })
        res.status(200)
    }catch(err){
        console.log(err)
    }
}
