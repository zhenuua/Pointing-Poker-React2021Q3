import { nanoid } from "nanoid";
import { lobbiesData } from "./lobbiesData.js";

const lobbyIds = [];
const generateLobbyId = () => {
  !lobbyIds.length ? lobbyIds.push(1) : lobbyIds.push(lobbyIds[lobbyIds.length - 1] + 1);
  return lobbyIds[lobbyIds.length - 1];
};


const lobbyDummy = [
  {
    lobbyId: '1',
    admin: {token: 'akj', id: 'kjkakkajsdfkj', username: 'name', lastName: 'lastName', jobPosition: 'lead', role: 'admin'},
    users: [
      {token: 'akj', id: 'kjkakkajsdfkj', name: 'name', lastName: 'lastName', jobPosition: 'jun', role: 'player/spectator'},
    ],
  },
];

export const createLobby = () => {
  const lobbyId = `${generateLobbyId()}`;
  const adminToken = nanoid();
  lobbiesData.push({
    lobbyId,
    adminToken,
    users: [],
    gameSettings: null,
    issues: [],
  });
  return { lobbyId, adminToken };
};

export const createUser = (data, lobbiesArr) => {
  const { roomId } = data;
  lobbiesArr.find((lobby) => lobby.lobbyId == roomId).users.push(data);
  console.log('-------------');
  console.log(lobbiesArr.find((lobby) => lobby.lobbyId == roomId));
  console.log('-------------');
};