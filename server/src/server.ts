import "dotenv/config";
import env from "./utility/validateEnv";
import express from "express";
import serv from "./config/config";
import passRouter from "./router/passenger";
const app = express();

app.use(express.json())


app.use("/", passRouter )

const port = env.PORT;

try {
  serv();
  app.listen(port, () => {
    console.log("server running on " + port);
  });
} catch (error) {
  console.log(error);
}
