import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import colors from "colors";

import lobbyRouter from "./routers/lobbyRouter.js";
import usersRouter from "./routers/usersRouter.js";
import socketInit from "./socket.js";
import { createLobby } from "./z-unneccesary-files/lobby.js";
import { lobbiesData } from "./z-unneccesary-files/lobbiesData.js";

const PORT = process.env.PORT || 5000;
const MONGO_URL =
  "mongodb+srv://drPoker:drPoker123@cluster0.14vrg.mongodb.net/poiting-poker-rss?retryWrites=true&w=majority";
// const MONGO_URL = 'mongodb+srv://drPoker:<password>@cluster0.14vrg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    // origin: 'http://localhost:8091/lobby-page/2',
    credentials: true,
  },
});

app.use(json());
app.use(cors());

app.use("/lobby", lobbyRouter);
app.use("/users", usersRouter);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    server.listen(PORT, () => {
      console.log(` listening on port ${PORT} `.bgMagenta.white);
      socketInit({ io });
    });
  } catch (err) {
    console.log(err);
  }
};

start();

// app.get('/lobby/create', (req, res) => {
//   res.status(200).json(createLobby());
// });

// app.get('/lobby/check', (req, res) => {
//   const { lobbyId } = req.query;
//   const responseData = {
//     msg: `lobby #${lobbyId} successfully found, connecting...`,
//     id: lobbyId,
//   };
//   lobbiesData.find(lobby => lobby.lobbyId == lobbyId) ?
//     res.status(200).json(responseData) :
//     res.status(204).json('no lobby found');
// });

// const post = {kek: 'lobby', lobby: lobbyId};
// if (lobbyIds.find(id => id == lobbyId)) {
//   res.status(200).json(`lobby #${lobbyId} successfully found`);
// } else {
//   res.status(204).json('no lobby found');
//   // console.log('no lobby found');
// }

// io.on('connection', (socket) => {
//   console.log(socket.id + ' connected to server');
//   socket.on('disconnect', () => {
//     console.log('user disconnected ' + socket.id);
//   });
// });
