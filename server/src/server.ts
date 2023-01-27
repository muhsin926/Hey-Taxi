import "dotenv/config";
import env from "./utility/validateEnv";
import express from "express";
import serv from "./config/config";
import passRouter from "./router/passenger";
import  cors from "cors"
const app = express();

app.use(express.json())

app.use(cors())
// app.use(cors({
//   origin: ['http://localhost:3001'],
//   methods:["GET","POST","PUT","PATCH","DELETE"],
//   credentials:true,
// }))

app.use("/api/passenger", passRouter )



const port = env.PORT;
try {
  serv();
  app.listen(port, () => console.log("server running on " + port));
} catch (error) {
  console.log(error);
}
