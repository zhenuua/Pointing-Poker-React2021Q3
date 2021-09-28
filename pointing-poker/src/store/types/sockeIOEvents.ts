export const EVENTS = {
  connect: 'connect',
  disconnect: 'disconnect',
  CLIENT: {
    CREATE_LOBBY: 'CREATE_LOBBY',
    SEND_LOBBY_MESSAGE: 'SEND_LOBBY_MESSAGE',
    JOIN_LOBBY: 'JOIN_LOBBY',
    ACCESS_REQ: 'ACCESS_REQ',
    AUTH_ADMIN: 'AUTH_ADMIN',
    FORCE_DEL_USER: 'FORCE_DEL_USER',
    INIT_DEL_USER: 'INIT_DEL_USER',
    USER_DELETED: 'USER_DELETED',
    BAN_VOTE_SUPPORTED: 'BAN_VOTE_SUPPORTED',
    SEND_MESSAGE: 'SEND_MESSAGE',
    ADD_MESSAGE: 'ADD_MESSAGE',
    BANNED_USER_LEAVE: 'BANNED_USER_LEAVE',
    CANCEL_GAME: 'CANCEL_GAME',
    USER_LEAVE: 'USER_LEAVE',
    GAME_STARTING: 'GAME_STARTING',
  },
  SERVER: {
    LOBBIES: 'LOBBIES',
    JOINED_LOBBY: 'JOINED_LOBBY',
    LOBBY_MESSAGE: 'LOBBY_MESSAGE',
    PENDING_USER: 'PENDING_USER',
    USER_JOIN: 'USER_JOIN',
    USER_DELETED: 'USER_DELETED',
    USER_BAN_VOTE: 'USER_BAN_VOTE',
    GAME_CANCLED: 'GAME_CANCLED',
    FETCH_GAME_DATA: 'FETCH_GAME_DATA',
  },
};

const mapOfEvnetsServer = {
  USER_JOIN: ['lobbyPage'],
  USER_DELETED: ['lobbyPage'],
  USER_BAN_VOTE: ['banPoPUp', ''],
  GAME_CANCLED: ['lobbyMain'],
  ADD_MESSAGE: ['lobbyChat'],
};

const mapOfEvnetsClient = {
  JOIN_LOBBY: ['lobbyPage', ''],
  FORCE_DEL_USER: ['lobbyMembers', ''],
  INIT_DEL_USER: ['lobbyMembers', ''],
  BANNED_USER_LEAVE: ['lobbyMembers', ''],
  BAN_VOTE_SUPPORTED: ['banPoPUp', ''],
  CANCEL_GAME: ['lobbyMain', ''],
  USER_LEAVE: ['lobbyMain', ''],
  SEND_MESSAGE: ['lobbyChat'],
  GAME_STARTING: ['lobbyMain', ''],
  FETCH_GAME_DATA: ['lobbyMain', ''],
};
