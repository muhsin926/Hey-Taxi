import "dotenv/config";
import env from "./utility/validateEnv";
import express from "express";
import http from "http";
import serv from "./config/config";
import passRouter from "./router/passenger/passengerRouter";
import driverRouter from "./router/driver/driverRouter";
import adminRouter from "./router/admin/adminRouter";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import morgan from "morgan";

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(cors());

// Fixing "413 Request Entity Too Large" Errors
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
);
app.use(morgan("dev"));

// Socket.io
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
const onlineDriver = new Map();
let passengerSocket: Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;
io.on("connection", (socket) => {
  // add user to onlineUsers if not already exist
  socket.on("addUser", (id) => {
    console.log("passenger");
    !onlineUsers.get(id) && onlineUsers.set(id, socket.id);
  });

  socket.on("addDriver", (id) => {
    console.log("driver");

    !onlineDriver.get(id) && onlineDriver.set(id, socket.id);
  });

  // send message to the client
  socket.on("send-request", (data) => {
    console.log(data, "passenger");
    passengerSocket = socket;
    socket.broadcast.emit("send-request", { data });
  });

  socket.on("ride-accept", (data) => {
    console.log(data, "Driver");

    if (passengerSocket) {
      // Emit a ride-accepted event to the specific passenger
      passengerSocket.emit("ride-accept", data);
    }
  });
});

const port = env.PORT;
try {
  serv();
  server.listen(port, () => console.log("server running on " + port));
} catch (error) {
  console.log(error);
}
