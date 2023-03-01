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
    const {
      pickup,
      dropOff,
      userId,
      longitude,
      latitude,
      fare,
      paymentId,
      scheduleDate,
      scheduleTime,
      categoryId,
    } = req.body;
  
    await new requestModel({
      pickupLocation: pickup,
      destination: dropOff,
      sender: userId,
      longitude,
      latitude,
      fare,
      paymentId,
      category: categoryId,
      "schedule.date": scheduleDate,
      "schedule.time": scheduleTime,
      "schedule.scheduled": scheduleDate ? true : false,
    }).save();

    res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
  }
};

export const updateShowNoti: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body
    await requestModel
      .findOneAndUpdate({_id: id},{
        $set: {senderViewed: true}
      })
    res.status(200);
  } catch (err) {
    console.log(err);
  }
};

export const getAcceptedRequest: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.decodedToken;
    const requests = await requestModel
      .find({ sender: { $eq: userId }, accepted: { $eq: true }, senderViewed: {$eq: false} })
      .sort("-1")
      .populate("receiver");
    res.status(200).json({ requests });
  } catch (err) {
    console.log(err);
  }
};

export const getScheduledRides: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.decodedToken;
    console.log(userId);

    const rides = await requestModel
      .find(
        { sender: userId },
        { schedule: { $ne: "Ride now" }, finished: { $eq: false } }
      )
      .populate("receiver");
    res.status(200).json({ rides: rides });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export const getRideHistory: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.decodedToken;
    console.log(userId);

    const rides = await requestModel
      .find({
        sender: { $eq: userId },
        finished: { $eq: true },
      })
      .populate("receiver").populate('category')
    res.status(200).json({ rides: rides });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
