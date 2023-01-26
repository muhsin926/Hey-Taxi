import "dotenv/config";
import env from "../utility/validateEnv";
import mongoose from "mongoose";

const serv = () => {
    mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch(console.error);
}


export default serv;