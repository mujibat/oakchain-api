import Document from './imports';

// gender enum
export enum Gender {
  male = 'male',
  female = 'female',
  preferNotToSay = 'prefer not to say',
}

export enum Cohort {
  'Cohort I' = 'Cohort I',
  'Cohort II' = 'Cohort II',
  'Cohort III' = 'Cohort III',
  'Cohort IV' = 'Cohort IV',
  'Cohort V' = 'Cohort V',
  'Cohort VI' = 'Cohort VI',
  'Cohort VII' = 'Cohort VII',
  'Cohort VIII' = 'Cohort VIII',
  'Cohort IX' = 'Cohort IX',
  'Cohort X' = 'Cohort X',
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
    student?: boolean;
  };
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  cohortId?: string;
  about?: string;
  isBlocked: boolean;
  token?: string;
  requestStatus?: 'pending' | 'approved' | 'rejected' | 'expired';
}

export type RegisterType = {
  email: string;
  username: string;
  cohortId: string;
  firstname: string;
  lastname: string;
  dob: string;
  gender: Gender;
  hasOnboarded?: boolean;
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
    student?: boolean;
  };
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  cohortId?: string;
  about?: string;
  isBlocked?: boolean;
  requestStatus?: 'pending' | 'approved' | 'rejected' | 'expired';
  token?: string;
};

export type UserQueryType = {
  role?: string;
  cohortId?: Cohort;
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
  isBlocked?: number;
  userId?: string;
};
