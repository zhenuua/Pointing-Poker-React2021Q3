import { UserRoles } from '../store/types/sliceTypes';

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
  handleIssueClick?: (issueTitle: string) => void,
};

export type LobbyTitleType = {
  isScrumMaster: boolean,
};

export type PersonalDataTabType = {
  userImage: string | undefined,
  userName: string,
  lastName?: string,
  userStaff?: string,
  isCurrentUser: boolean,
  isRemove: boolean,
  socketId?: string,
  userRole?: UserRoles,
  deleteUser?: (id: string, role: UserRoles) => void,
};

export type PopUpType = {
  active: boolean,
  setActive: any,
};

export type ScoreTabType = {
  status: string,
};

export type TLobbyChat = {
  name: string,
  message: string,
  ava: string,
  isCurrentUser: boolean,
  jobPosition: string,
};
