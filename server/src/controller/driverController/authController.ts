import driverModel from "../../model/driver/driverModel";
import { RequestHandler } from "express";
import bcrypt from 'bcrypt'
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import env from "../../utility/validateEnv";


// Token Generate Function
const generateToken = (user: { _id: ObjectId; name: string }) => {
    return jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: "24h" });
  };

// Driver Registration 
export const register: RequestHandler = async (req, res) => {
    const { user, email, pwd} = req.body;
    try{
        const exist = await driverModel.findOne({email})
        if (exist){
            return res.status(200).json({status:false, error:"Email already taken"})
        }else{
            const hashedPassword = await bcrypt.hash(pwd, 10);
            new driverModel({
                name:user,
                email,
                password: hashedPassword,
            })
            .save()
            .then((user) => {
                const token = generateToken(user)
                res.status(200).json({status:true, msg:"User registration successfully", token})

            })
            .catch((error) => res.status(500).json({error, status : false}))
        }
    }catch ( error ){
        res.status(500).send(error)
    }
};

// Driver Login 
export const login:RequestHandler = async(req,res) => {
    const { email, password } = req.body;
    try{
        const exist = await driverModel.findOne({email})
        if(!exist) return res.status(500).send({status:false,msg:"Email not found"})
        const hashPass = await bcrypt.compare(password, exist.password)       
        if(!hashPass) return res.status(500).send({status:false, msg:"Password does not match"})
        const token = generateToken(exist)
        return res.status(200).json({status: true, msg: "Login successful", token, userName:exist.name})
    }catch(error){
        res.json(error)
    }
}