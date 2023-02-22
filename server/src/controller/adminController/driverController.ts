import { RequestHandler } from "express";
import driverModel from "../../model/driver/driverModel";

export const getDrivers: RequestHandler = async (req, res) => {
  const allDrivers = await driverModel.find({});
  if (allDrivers) {
    return res.status(200).json({ drivers: allDrivers });
  }
};
