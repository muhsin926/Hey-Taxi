import { RequestHandler } from "express";
import chatModel from "../../model/passenger/chatModel";
import passengerModel from "../../model/passenger/passengerModel";

export const getPassengers: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.decodedToken;
    const docs = await chatModel.distinct("sender", {
      $or: [{ sender: userId }, { receiver: userId }],
    });
    const passenger = await passengerModel.find({
      _id: {
        $in: docs,
      },
    });
    res.status(200).json(passenger);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMsgs: RequestHandler = async (req, res) => {
  const { userId } = res.locals.decodedToken;
  const { passengerId } = req.query;
  try {
    const chat = await chatModel
      .find({
        $and: [
          { $or: [{ sender: userId }, { receiver: userId }] },
          { $or: [{ sender: passengerId }, { receiver: passengerId }] },
        ],
      })
      .sort({ time: 1 });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const sendMsg: RequestHandler = async (req, res) => {
  const { userId } = res.locals.decodedToken;
  const { chatInput, toUserId } = req.body;
  const msg = new chatModel({
    sender: userId,
    receiver: toUserId,
    message: chatInput,
    senderType: "Driver",
  });
  try {
    await msg.save();
    res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
