import { RequestHandler } from "express";
import fileUploader from "../../cloudinery/fileUploader";
import passengerModel from "../../model/passenger/passengerModel";
import requestModel from "../../model/passenger/requestModel";


export const getPassenger: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.decodedToken;
    const user = await passengerModel.findOne({ _id: userId });
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
};

export const patchPassenger: RequestHandler = async (req, res) => {
  try {
    const { name, email, mob } = req.body.values;
    const { dp } = req.body;
    const { userId } = res.locals.decodedToken;
    // const profilePicter = fileUploader(dp)
    await passengerModel.updateOne(
      { _id: userId },
      {
        name,
        email,
        mobile: mob,
      }
    );
    res.status(200);
  } catch (err) {
    console.log(err);
  }
};

export const sendRequest: RequestHandler = async (req, res) => {
  console.log("requested");
  
  try {
    const { pickup, dropOff, userId } = req.body;
    // const { userId } = res.locals.decodedToken;

    await new requestModel({
      pickupLocation: pickup,
      destination: dropOff,
      sender: userId,
    }).save();
    res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
  }
};
