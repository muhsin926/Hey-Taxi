import { RequestHandler } from "express"
import vehicleCategoryModel from "../../model/admin/vehicleCategoryModel"


export const getCategory: RequestHandler = async(req,res) => {
    const categories = await vehicleCategoryModel.find({})
    return res.status(200).json({categories:categories})
  }
  export const deleteCategory: RequestHandler = async (req, res) => {
    const { id } = req.query;
    await vehicleCategoryModel.deleteOne({ _id: id });
    return res.status(200).json({ status: true });
  };