import { RequestHandler } from "express";
import categoryModel from '../../model/admin/vehicleCategoryModel';
import fileUploader from "../../cloudinery/fileUploader";

export const addCategory: RequestHandler = async(req,res) => {
    const {name,capacity,discription,img} = req.body;
    try{
    fileUploader(img)
    .then(async(image) => {
        const categories = await new categoryModel({
            name,
            capacity,
            discription,
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