import { RequestHandler } from "express";
import categoryModel from '../../model/admin/vehicleCategoryModel';
import fileUploader from "../../cloudinery/fileUploader";
import vehicleModel from "../../model/driver/vehicleModel";

export const addCategory: RequestHandler = async(req,res) => {
    const {name,capacity,discription,img,rate} = req.body;
    try{
    fileUploader(img)
    .then(async(image) => {
        const categories = await new categoryModel({
            name,
            capacity,
            discription,
            rate,
            image,
        }).save()
        console.log(categories);
        
        if (categories){
            return res.status(200).json({status: true})
        }else{
            return res.status(200).json({status: false, err:'invalid please try again'})
        }
    })
    .catch((error) => {
       return res.status(200).json({status: false, err:error})
    })
}catch (err) {
    console.log(err);
    
}
}

export const getVehicles: RequestHandler = async (req, res) => {
    const allVehicle = await vehicleModel.find({}).populate('driverId');
    if (allVehicle) {
      return res.status(200).json({ vehicles: allVehicle });
    }
  };
  
  export const deleteVehicle: RequestHandler = async (req, res) => {
    const { id } = req.query;
    await vehicleModel.deleteOne({ _id: id });
    return res.status(200).json({ status: true });
  };
