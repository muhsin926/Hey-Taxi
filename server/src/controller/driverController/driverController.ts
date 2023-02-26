import vehicleModel from "../../model/driver/vehicleModel";
import driverModel from "../../model/driver/driverModel";
import { RequestHandler } from "express";
import fileUploader from "../../cloudinery/fileUploader";
import requestModel from "../../model/passenger/requestModel";

export const addVehicle: RequestHandler = async (req, res) => {
  const { image, index, vehicleCategory, model, reg } = req.body;
  if (index == 0) {
    fileUploader(image)
      .then(async (image) => {
        const updated = await driverModel.updateOne({
          license: image,
        });
        updated && res.status(200).json({ status: true });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ status: false });
      });
  } else if (index == 1) {
    fileUploader(image)
      .then(async (image) => {
        const updated = await vehicleModel.updateOne({
          RC: image,
        });
        updated && res.status(200).json({ status: true });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ status: false });
      });
  } else if (index == 2) {
    fileUploader(image)
      .then(async (image) => {
        const updated = await vehicleModel.updateOne({
          insurence: image,
        });
        updated && res.status(200).json({ status: true });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ status: false });
      });
  } else {
    const updated = await vehicleModel.updateOne({
      category: vehicleCategory,
      model,
      reg_no: reg,
    });
    updated && res.status(200).json({ status: true });
  }
};

export const available: RequestHandler = async (req, res) => {
  const { userId } = res.locals.decodedToken;
  const driver = await driverModel.findOne({ _id: userId });
  driver &&
    (await driverModel.updateOne(
      { _id: userId },
      { available: !driver.available }
    ));
  res.status(200).json({ status: true });
};

export const getVehicles: RequestHandler = async (req, res) => {
  const vehicles = await vehicleModel.find({});
  return res.status(200).json({ vehicles: vehicles });
};

export const add_vehicle: RequestHandler = async (req, res) => {
  const { category, model, reg_no } = req.body.values;
  const { img } = req.body;
  const { userId } = res.locals.decodedToken;
  let RC = img[0];
  let insurance = img[1];

  try {
    fileUploader(img[0]).then((image) => {
      RC = image;
      fileUploader(img[1]).then(async (image) => {
        insurance = image;
        const updated = await new vehicleModel({
          category,
          model,
          reg_no,
          RC,
          insurance,
          driverId: userId,
        }).save();
        updated &&
          (await driverModel.updateOne(
            { _id: userId },
            { $push: { vehicles: userId } }
          ));
        res.status(200).json({ status: true });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteVehicle: RequestHandler = async (req, res) => {
  const { vehicleId } = req.query;
  await vehicleModel.deleteOne({ _id: vehicleId });
  return res.status(200).json({ status: true });
};

export const updateVehicle: RequestHandler = async (req, res) => {
  const { category, model, reg_no } = req.body.values;
  const { img } = req.body;
  const { vehicleId } = req.query;
  let RC = img[0];
  let insurance = img[1];
  try {
    fileUploader(img[0]).then((image) => {
      RC = image;
      fileUploader(img[1]).then(async (image) => {
        insurance = image;
        const updated = await vehicleModel.updateOne(
          { _id: vehicleId },
          {
            category,
            model,
            reg_no,
            RC,
            insurance,
          }
        );
        updated && res.status(200).json({ status: true });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRequest: RequestHandler = async (req, res) => {
  try {
    const requests = await requestModel
      .find({ accepted: { $ne: true } })
      .sort("-1")
      .populate("sender");
    res.status(200).json({ requests });
  } catch (err) {
    console.log(err);
  }
};

export const requestAccept: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = res.locals.decodedToken;
    await requestModel.findOneAndUpdate(
      { _id: id },
      { $set: { accepted: true, receiver: userId } }
    );
    res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
  }
};

export const getBookedTrips: RequestHandler = async (req, res) => {
  try {
    const { userId } =  res.locals.decodedToken
    const requests = await requestModel
      .find({ receiver : { $eq: userId } })
      .sort("-1")
      .populate("sender");
    res.status(200).json({ requests });
  } catch (err) {
    console.log(err);
  }
};
