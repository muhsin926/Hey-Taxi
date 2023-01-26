import { RequestHandler } from "express";
import passengerModel from "../model/user";
import bcrypt from 'bcrypt';


export const registration: RequestHandler = async (req, res, next) => {
  try {
    console.log("set");
    
    const userSignup = {
      Status: false,
      message : "" ,
    };
    const { name, email } = req.body;
    let { password } = req.body;
    console.log(req.body);
    
    const user = await passengerModel.find({ email: email });    
    if (user.length == 0) {
      password = await bcrypt.hash(password, 10);
      passengerModel
        .create({
          name: name,
          email: email,
          password: password,
        })
        .then(() => {
          userSignup.Status = true;
          res.send({ userSignup });
        });
    } else {
      userSignup.message = "email already exists try login with this email";
      res.send({ userSignup });
    }
  } catch (error) {
    next(error);
  }
};
