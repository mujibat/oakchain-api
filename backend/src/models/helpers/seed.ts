import User from '../user';
import { SAMSON_CONFIGS } from 'sm-pkjs/dist';
import { superAdmin, users } from '../../service';

const {
  env: { SUPER_ADMIN_EMAIL },
  logger,
} = SAMSON_CONFIGS;

export const seedSuperAdmin = async () => {
  try {
    const user = (await User.findOne({ email: SUPER_ADMIN_EMAIL })) as keyof typeof User;

    if (user) {
      logger('seedSuperAdmin', 'Super admin already exists');
      return;
    }

    await new User(superAdmin).save();

    logger('seedSuperAdmin', 'Super admin seeded successfully :)');
  } catch (err) {
    console.log(err); // leave this for debugging
    logger('seedSuperAdmin', 'Error seeding superAdmin :(');
  }
};

export const seedUsers = async () => {
  try {
    await User.deleteMany({});

    await User.insertMany(users);

    logger('seedUsers', 'Users seeded successfully :)');
  } catch (err) {
    console.log(err); // leave this for debugging
    logger('seedUsers', 'Error seeding users :(');
  }
};
