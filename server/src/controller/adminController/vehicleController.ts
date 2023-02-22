import { RequestHandler } from "express";
import categoryModel from '../../model/admin/vehicleCategoryModel';
import fileUploader from "../../cloudinery/fileUploader";
import driverModel from "../../model/driver/driverModel";

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

export const deleteDriver: RequestHandler =async (req,res) => {
    try{
        const { id } = req.query;
        await driverModel.deleteOne({_id:id})
        return res.status(200).json({status: true})
    }catch (err) {
        console.log(err)
    }
} 