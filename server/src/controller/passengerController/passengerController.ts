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
  try {
    const { pickup, dropOff, userId, longitude, latitude, fare, paymentId } = req.body;
    await new requestModel({
      pickupLocation: pickup,
      destination: dropOff,
      sender: userId,
      longitude,
      latitude,
      fare,
      paymentId,
    }).save();
    res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
  }
};

export const getAcceptedRequest: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.decodedToken;
    const requests = await requestModel
      .find({ sender: { $eq: userId }, accepted: { $eq: true } })
      .sort("-1")
      .populate("receiver");
    res.status(200).json({ requests });
  } catch (err) {
    console.log(err);
  }
};
