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

export interface IAddress {
  id: number;
  city: string;
  zip_code: string;
  address: string;
  default: boolean;
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
  address_user: IAddress[];
}
