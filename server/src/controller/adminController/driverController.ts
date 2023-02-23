import { RequestHandler } from "express";
import driverModel from "../../model/driver/driverModel";

export const getDrivers: RequestHandler = async (req, res) => {
  const allDrivers = await driverModel.find({});
  if (allDrivers) {
    return res.status(200).json({ drivers: allDrivers });
  }
};

export const deleteDriver: RequestHandler =async (req,res) => {
  try{
      const { id } = req.query;
      await driverModel.deleteOne({_id:id})
      return res.status(200).json({status: true})
  }catch (err) {
      console.log(err)
  }
} 
