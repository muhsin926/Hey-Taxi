import { RequestHandler } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import jwt from "jsonwebtoken";
import env from "../utility/validateEnv";

export const authCheck: RequestHandler = async (req, res, next) => {
  try {
    //   get the token from the authorization header
    if (!req.headers.authorization)
      return next(createHttpError(401, "Invalid request!"));
    const token: string = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(JSON.parse(token), env.JWT_SECRET);
    res.locals.decodedToken = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};
