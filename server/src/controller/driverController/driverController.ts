import vehicleModel from "../../model/driver/vehicleModel";
import { RequestHandler } from "express";
import fileUploader from "./fileUploader";

export const addVehicle: RequestHandler = async (req,res) => {
    const {image} = req.body
    fileUploader(image)
    .then((image) =>{
        new vehicleModel({
            license: image
        })
        .save() 
        res.status(200).json({status: true})
    }).catch((error) => {
        console.log(error);
        res.status(400).json({status: false})
    })
}

export const available: RequestHandler = (req,res) => {
    res.status(200).json({status:true})
}