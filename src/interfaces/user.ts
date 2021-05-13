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
  first_name: string;
  last_name: string;
  data_joined: Date;
  last_login: Date;
  profile: IUserProfile;
}
