import { env } from '../config';

const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_USERNAME } = env;

export const superAdmin = {
  email: SUPER_ADMIN_EMAIL,
  password: SUPER_ADMIN_PASSWORD,
  username: SUPER_ADMIN_USERNAME,
  role: {
    super: true,
    admin: true,
    user: false,
    guest: false,
  },
  requestStatus: 'approved',
  isActive: true,
  cohortId: 'Cohort I',
};

const usersList = [];

for (let i = 0; i < 120; i++) {
  usersList.push({
    email: `user${i + 1}@gmail.com`,
    password: 'password',
    username: `user${i + 1}`,
    role: {
      super: false,
      admin: false,
      user: i < 50 ? false : true,
      guest: true,
    },
    isActive: true,
  });
}

export const users = [...usersList];
