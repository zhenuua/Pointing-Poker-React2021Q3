export const lobbyIds = [];

export const generateLobbyId = () => {
  !lobbyIds.length ? lobbyIds.push(1) : lobbyIds.push(lobbyIds[lobbyIds.length - 1] + 1);
  return lobbyIds[lobbyIds.length - 1];
};
