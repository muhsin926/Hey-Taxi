import { RequestHandler } from "express";
import passengerModel from "../../model/passenger/passengerModel";

export const getPassenger: RequestHandler = async (req, res) => {
  const allPassenger = await passengerModel.find({});
  if (allPassenger) {
    return res.status(200).json({ passenger: allPassenger });
  }
};

export const deletePass: RequestHandler = async (req, res) => {
  const { id } = req.query;
  await passengerModel.deleteOne({ _id: id });
  return res.status(200).json({ status: true });
};

export const updatePass : RequestHandler = async (req,res) => {
  const { id } = req.query;
  const currentUser = await passengerModel.findOne({_id:id})
  await passengerModel.updateOne({_id:id},{
    block : !currentUser?.block
  })
  res.status(200).json({status: true})
}
