import { Request, Response, NextFunction } from 'express';
import { ResponseCode, StatusCode } from '../@types';
import { UserService } from '../service';
import { SAMSON_UTILS } from 'sm-pkjs/dist';
import { userValidations } from '../validations';

const {
  Toolbox: { verifyToken },
} = SAMSON_UTILS;

const UserMiddleware = {
  async inspectCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userValidations.validateCreateUser(req.body);
      const { email, username } = req.body;

      const userWithEmail = await UserService.getUserByEmail(email);

      const userWithUsername = await UserService.getUserByUsername(username);

      if (userWithEmail) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.FAILURE,
          message: 'Email already exists',
        });
      }

      if (userWithUsername) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.FAILURE,
          message: 'Username already exists',
        });
      }
      next();
    } catch (error: any) {
      return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
  async inspectUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userValidations.validateUpdateUser(req.body);
      next();
    } catch (error: any) {
      return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
};

export default UserMiddleware;
