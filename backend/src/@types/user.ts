import Document from './imports';

export enum Gender {
  male = 'male',
  female = 'female',
  preferNotToSay = 'prefer not to say',
}

export interface UserInterface extends Document {
  firstname?: string;
  lastname?: string;
  username?: string;
  gender: Gender;
  email?: string;
  isActive: boolean;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  dob?: string;
  phoneNumber?: string;
  otp?: number;
  image?: string;
  role: {
    super?: boolean;
    admin?: boolean;
    user?: boolean;
    guest?: boolean;
  };
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  about?: string;
  token?: string;
}

export type RegisterType = {
  email: string;
  username: string;
  cohortId: string;
  firstname: string;
  lastname: string;
  dob: string;
  gender: Gender;
};

export type UpdateUserType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  gender?: Gender;
  email?: string;
  isActive?: boolean;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  dob?: string;
  phoneNumber?: string;
  otp?: number;
  image?: string;
  role?: {
    super?: boolean;
    admin?: boolean;
    user?: boolean;
    guest?: boolean;
  };
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  about?: string;
  token?: string;
};

export type UserQueryType = {
  role?: string;
  page?: number;
  limit?: number;
  requestStatus?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  isActive?: number;
  state?: string;
  country?: string;
  userId?: string;
};
