import "dotenv/config";
import env from "./utility/validateEnv";
import express from "express";
import http from "http";
import serv from "./config/config";
import passRouter from "./router/passenger/passengerRouter";
import driverRouter from "./router/driver/driverRouter";
import adminRouter from "./router/admin/adminRouter";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(cors());
// app.use(cors({
//   origin: ['http://localhost:3001'],
//   methods:["GET","POST","PUT","PATCH","DELETE"],
//   credentials:true,
// }))

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use("/api/passenger", passRouter);
app.use("/api/driver", driverRouter);
app.use("/api/admin", adminRouter);

const onlineUsers = new Map();
const onlineDriver =new Map()
io.on("connection", (socket) => {
  // add user to onlineUsers if not already exist
  socket.on("addUser", (id) => {
    !onlineUsers.get(id) && onlineUsers.set(id, socket.id);
  });

  socket.on("addDriver", (id) => {
    !onlineDriver.get(id) && onlineDriver.set(id, socket.id);
  });

  // send message to the client
  socket.on("send-request", (data) => {
  console.log(data.message);
  
  });
});

const port = env.PORT;
try {
  serv();
  server.listen(port, () => console.log("server running on " + port));
} catch (error) {
  console.log(error);
}
