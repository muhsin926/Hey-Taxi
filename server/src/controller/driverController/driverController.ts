import vehicleModel from "../../model/driver/vehicleModel";
import driverModel from "../../model/driver/driverModel";
import { RequestHandler } from "express";
import fileUploader from "../../cloudinery/fileUploader";

export const addVehicle: RequestHandler = async (req,res) => {
    const {image, index,vehicleCategory,model,reg} = req.body
    if(index == 0){
        fileUploader(image)
        .then(async(image) =>{
         const updated =  await driverModel.updateOne({
                license: image
            })
            updated && res.status(200).json({status: true})
        }).catch((error) => {
            console.log(error);
            res.status(400).json({status: false})
        })
    }else if(index == 1){
        fileUploader(image)
        .then(async(image) =>{
         const updated =  await vehicleModel.updateOne({
                RC: image
            })
            updated && res.status(200).json({status: true})
        }).catch((error) => {
            console.log(error);
            res.status(400).json({status: false})
        })
    }else if(index == 2){
        fileUploader(image)
        .then(async(image) =>{
         const updated =  await vehicleModel.updateOne({
            insurence: image
            })
            updated && res.status(200).json({status: true})
        }).catch((error) => {
            console.log(error);
            res.status(400).json({status: false})
        })
    }else{
        const updated = await vehicleModel.updateOne({
            category: vehicleCategory,
            model,
            reg_no: reg
        })
        updated && res.status(200).json({status: true})
    }
}

export const available: RequestHandler = (req,res) => {
    res.status(200).json({status:true})
}