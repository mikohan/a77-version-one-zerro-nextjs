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
  zip_code: string | null;
  address: string;
  default: boolean;
  user: number;
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
  image: string;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
}
