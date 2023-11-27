import { Request, Response, NextFunction } from 'express';
import { ResponseCode, StatusCode } from '../@types';
import { UserService } from '../service';
import { Toolbox } from '../utils';
import { userValidations } from '../validations';

const { verifyToken } = Toolbox;

const UserMiddleware = {
  async inspectCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userValidations.validateCreateUser(req.body);
      const { email, username } = req.body;
      const { token } = req.params;
      const decoded: any = await verifyToken(token);

      if (!decoded)
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.FAILURE,
          message: 'Token validation failed',
        });

      if (decoded.email !== email)
        return res.status(StatusCode.BAD_REQUEST).json({
          status: !!ResponseCode.FAILURE,
          message: 'Token validation failed. Wrong email used.',
        });

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

  async inspectOnboardingRequest(req: Request, res: Response, next: NextFunction) {
    try {
      await userValidations.validateOnboardingRequest(req.body);
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
