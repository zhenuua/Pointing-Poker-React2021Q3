import React from 'react';

enum NickNames {
  NAGIBATOR_3000 = 'NAGIBATOR_3000',
  MAMKAEB_200IQ = 'MAMKAEB_200IQ',
}

interface IUser {
  name: string;
  secondName?: string;
}

interface IExtendedUser extends IUser {
  nickname?: NickNames;
}

type IReducedUser = Omit<IExtendedUser, 'secondName'>;

type NickNameTypes = NickNames.NAGIBATOR_3000 | NickNames.MAMKAEB_200IQ;

const makeUserFullName = ({ name, secondName, nickname }: IExtendedUser): string =>
  `${name}${nickname && ` ${nickname}`} ${secondName}`;
