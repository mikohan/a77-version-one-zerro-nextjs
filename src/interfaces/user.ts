export interface IAutoUser {
  userId: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface IUserProfile {
  id: number;
  image: string;
  phone: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dataJoined: Date;
  lastLogin: Date;
}
