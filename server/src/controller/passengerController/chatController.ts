import { RequestHandler } from "express";
import driverModel from "../../model/driver/driverModel";
import chatModel from "../../model/passenger/chatModel";

export const sendMsg: RequestHandler = async (req, res) => {
  const { userId } = res.locals.decodedToken;
  const { chatInput, toDriverId } = req.body;
  const msg = new chatModel({
    sender: userId,
    receiver: toDriverId,
    message: chatInput,
    senderType: "Passenger",
  });
  try {
    await msg.save();
    res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};

export const getDrivers: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.decodedToken;
    const docs = await chatModel.distinct("receiver", {
      $or: [{ sender: userId }, { receiver: userId }],
    });
    const drivers = await driverModel.find({
      _id: {
        $in: docs,
      },
    });
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMsgs: RequestHandler = async (req, res) => {
  const { userId } = res.locals.decodedToken;
  const { driverId } = req.query;
  try {
    const chat = await chatModel.find({
      $and: [
        { $or: [{ sender: userId }, { receiver: userId }] },
        { $or: [{ sender: driverId }, { receiver: driverId }] },
      ],
    }).sort({time:1})
    res.status(200).json(chat)
  } catch (err) {
    res.status(500).json(err);
  }
};
