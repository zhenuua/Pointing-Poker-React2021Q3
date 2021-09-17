// import { lobbyIds } from 'lobby-ids.js';

import cors from 'cors';
import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import socketInit from './socket.js';
import { createLobby } from './lobby.js';
import { lobbiesData } from "./lobbiesData.js";


const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    // origin: 'http://localhost:8091/lobby-page/2',
    credentials: true,
  }
});

app.use(json());
app.use(cors());

app.get('/lobby/create', (req, res) => {
  res.status(200).json(createLobby());
});

app.get('/lobby/check', (req, res) => {
  const { lobbyId } = req.query;
  const responseData = {
    msg: `lobby #${lobbyId} successfully found, connecting...`,
    id: lobbyId,
  };
  lobbiesData.find(lobby => lobby.lobbyId == lobbyId) ?
    res.status(200).json(responseData) : 
    res.status(204).json('no lobby found');
});

// const post = {kek: 'lobby', lobby: lobbyId};
// if (lobbyIds.find(id => id == lobbyId)) {
//   res.status(200).json(`lobby #${lobbyId} successfully found`);
// } else {
//   res.status(204).json('no lobby found');
//   // console.log('no lobby found');
// }

server.listen(PORT, () => {
  console.log('listening on port ' + PORT);

  socketInit({ io });
});

// io.on('connection', (socket) => {
//   console.log(socket.id + ' connected to server');
//   socket.on('disconnect', () => {
//     console.log('user disconnected ' + socket.id);
//   });
// });
