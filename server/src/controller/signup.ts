import e, { RequestHandler } from "express";
import passengerModel from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../utility/validateEnv";
import { ObjectId } from "mongoose";

const generateToken = (user: { _id: ObjectId; name: string }) => {
  return jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: "24h" });
};

export const register: RequestHandler = async (req, res) => {
  try {
    console.log(" ethi ");

    const { name, email, password, mobile } = req.body;

    const passenger = await passengerModel.findOne({ email });
    if (passenger) {
      return res.status(500).send({ error: "Email already taken" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      new passengerModel({
        name,
        email,
        mobile,
        password: hashedPassword,
      })
        .save()
        .then((user: any) => {
          const token = generateToken(user);
          res
            .status(201)
            .send({ msg: "User Register Successfully", status: true ,token});
        })
        .catch((error) => res.status(500).send({ error, status: false }));
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

//  Login Controll & Create JWT Token

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    passengerModel
      .findOne({ email })
      .then((user: any) => {
        bcrypt
          .compare(password, user.password)
          .then((checkPass) => {
            if (!checkPass)
              return res
                .status(400)
                .send({ status: false, error: "Password does not match" });

            const token = generateToken(user);

            return res.status(200).send({
              msg: " Login Successful...!",
              userName: user.name,
              token,
              status: true,
            });
          })
          .catch(() =>
            res
              .status(400)
              .send({ status: false, error: "Password does not match" })
          );
      })
      .catch(() =>
        res.status(404).send({ status: false, error: "Email not found" })
      );
  } catch (error) {
    console.log(error);
  }
};
