import User from '../models/user';
import { StatusCode, RegisterType, UpdateUserType, Cohort, UserQueryType } from '../@types';
import { ApiError } from '../utils';
import { Toolbox } from '../utils';

const { createQuery } = Toolbox;

class UserService {
  async createUser(userData: RegisterType) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'createUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserById(userId: string) {
    try {
      // const user = await User.findById(userId).populate('plans').populate('reports');
      const user = await User.findOne({ _id: userId });
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getUserById',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = User.findOne({ email });
      if (!user) return null;
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getUserByEmail',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = User.findOne({ username });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getUserByUsername',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateUser(userId: string, userData: UpdateUserType) {
    try {
      const user = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      if (!user) return null;
      return user;
    } catch (error) {
      console.log(error, 'from update user');
      throw new ApiError(
        'impact api',
        error as string,
        'updateUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  deleteUser = async (userId: string) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) return null;
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'deleteUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  getAllUsers = async (data: UserQueryType) => {
    try {
      const query = createQuery({}, data);
      const limit = Number(data.limit) || 10;
      const page = Number(data.page) || 0;

      const users = await User.find(query)
        .limit(limit)
        .skip(page * limit);

      return users;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getAllUsers',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  getUsersCount = async () => {
    try {
      const count = await User.count();

      return count;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getAllUsers',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}

export default new UserService();
