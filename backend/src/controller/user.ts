import { Request, Response } from 'express';
import { GenericAnyType, ResponseCode, StatusCode, UserInterface, UserQueryType } from '../@types';
import { Toolbox, sendEmail } from '../utils';
import { env } from '../config';
import { UserService } from '../service';
import { customAlphabet } from 'nanoid';
import { numbers } from 'nanoid-dictionary';
import { verify } from '../mailTemplates/verify';

const nanoid = customAlphabet(numbers, 6);
const { createToken } = Toolbox;
const { FRONTEND_URL, NODE_ENV } = env;

export async function createUser(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const token = createToken({ email }, '48h');
    const link = `${FRONTEND_URL}/verify?token=${token}`;
    const user = await UserService.createUser({
      ...req.body,
    });

    // todo
    // send a welcome mail
    const message = `Welcome ${email}! `;

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'User created successfully',
    });
  } catch (error: GenericAnyType) {
    return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: error.message || 'Something went wrong',
    });
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;

    if (!otp)
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'Please enter OTP',
      });

    const user = (await UserService.getUserByEmail(email)) as unknown as UserInterface;

    const token = createToken({ email }, '48h');

    user.otp = undefined;
    user.token = token;
    await user.save();

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Logged in successfully',
      data: {
        token,
        user,
      },
    });
  } catch (error: GenericAnyType) {
    return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: error.message || 'Something went wrong',
    });
  }
}

export async function getOTP(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const user = await UserService.getUserByEmail(email as string);

    if (!user) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'User not found',
      });
    }

    const otp = nanoid();

    const message = `Hello ${email}, your OTP is ${otp}`;

    await sendEmail(email as string, 'Your otp is here', message); //  todo

    await UserService.updateUser(user._id.toString(), { otp: Number(otp) });

    setTimeout(async () => {
      await UserService.updateUser(user._id.toString(), { otp: undefined });
    }, 300000);

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'OTP sent successfully',
      data: {
        otp,
        expiresIn: '5 minutes',
      },
    });
  } catch (error: GenericAnyType) {
    return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: error.message || 'Something went wrong',
    });
  }
}

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers({
      ...req.query,
    } as unknown as UserQueryType);

    let meta = {};

    const totalData = users.length;

    if (totalData > 9) {
      const userCount = await UserService.getUsersCount();

      let currentlyFetched = Number(req.query.limit) || totalData;

      const currentPage = Number(req.query.page) + 1 || 1;

      const remainingData = userCount - totalData * currentPage;

      currentlyFetched = currentlyFetched || 1;

      const numberOfPages = Math.ceil(userCount / currentlyFetched);

      meta = {
        userCount,
        remainingData,
        currentPage,
        currentlyFetched,
        numberOfPages,
        numberOfPagesLeft: numberOfPages - currentPage,
      };
    }

    const response: GenericAnyType = {
      code: !!totalData ? 200 : 400,
      status: !!totalData ? !!ResponseCode.SUCCESS : !!ResponseCode.FAILURE,
      message: !!totalData ? 'User fetch successful' : 'No user found',
      data: { meta: req.query.userId ? {} : meta, users },
    };

    const { code, ...rest } = response;

    return res.status(response.code).json(rest);
  } catch (err: GenericAnyType) {
    return res.status(err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server error',
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);

    if (!user) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'User not found',
        data: null,
      });
    }

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'User fetch successful',
      data: user,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;

    const updateUser = await UserService.updateUser(userId, updatedUserData);

    if (!updateUser) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'User not found',
        data: null,
      });
    }

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'User update successful',
      data: updateUser,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await UserService.deleteUser(userId);

    if (!deleteUser) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: ResponseCode.FAILURE,
        message: 'User not found',
        data: null,
      });
    }

    return res.status(StatusCode.NO_CONTENT).json({
      status: !!ResponseCode.SUCCESS,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export async function uploadImage(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const image = req.file?.path ? req.file?.path : '';

    if (!image)
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'Image not found',
      });

    const updatedUser = await UserService.updateUser(userId, {
      image,
    });

    if (!updatedUser)
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'User not found',
      });

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Image uploaded successfully',
      data: updatedUser,
    });
  } catch (error: GenericAnyType) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: error.message || error,
    });
  }
}
