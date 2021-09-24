export type ButtonType = {
  text: string,
  onClick?: () => void,
};

export type FormType = {
  setActive: any,
  isConnect?: boolean,
  lobbyLink?: string,
};

export type IssueTabType = {
  status: string,
  isCurrent: boolean,
  priority: string,
};

export type LobbyTitleType = {
  isScrumMaster: boolean,
};

export type PersonalDataTabType = {
  userImage: string,
  userName: string,
  lastName?: string,
  userStaff?: string,
  isCurrentUser: boolean,
  isRemove: boolean,
  socketId?: string,
  deleteUser?: (id: string) => void,
};

export type PopUpType = {
  active: boolean,
  setActive: any,
};

export type ScoreTabType = {
  status: string,
};
