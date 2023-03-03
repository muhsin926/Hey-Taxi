import { RequestHandler } from "express";
import driverModel from "../../model/driver/driverModel";

export const getDrivers: RequestHandler = async (req, res) => {
  const allDrivers = await driverModel.find({});
  if (allDrivers) {
    return res.status(200).json({ drivers: allDrivers });
  }
};

export const updateDriver : RequestHandler = async (req,res) => {
  const { id, block } = req.query;
  await driverModel.updateOne({_id:id},{
    block : !block,
})
  res.status(200).json({status: true})
}


export const deleteDriver: RequestHandler =async (req,res) => {
  try{
      const { id } = req.query;
      await driverModel.deleteOne({_id:id})
      return res.status(200).json({status: true})
  }catch (err) {
      console.log(err)
  }
} 
