import userModel from '../models/user.js';
import jwt from 'jsonwebtoken';

export const signinUser = async (req, res) => {
  const { wallet_address } = req.body;
  console.log(req.body, wallet_address);
  try {
    if (!wallet_address) {
      return res.status(400).json({ success: false, message: 'Wallet not provided!' });
    }

    const userExisted = await userModel.findOne({ wallet_address });
    const secretKey = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
    console.log(secretKey);
    const accessToken = jwt.sign({ wallet_address }, secretKey, { expiresIn: '30d' });
    if (userExisted) {
      return res.json('200', {
        success: true,
        message: 'Login succesful',
        data: {
          user: userExisted,
          token: accessToken,
        },
      });
    } else {
      const userDetails = await userModel.create({ wallet_address });
      return res.status(200).json({
        success: true,
        message: 'User created succesfully',
        data: {
          user: userDetails,
          token: accessToken,
        },
      });
    }
  } catch (err) {
    console.log(err);
    // throw new Error(err)
  }
};

export const updateUser = async (req, res) => {
  const { user } = req.query;
  console.log(req.body, req.query, user);

  const userDetails = await userModel.findOne({ wallet_address: user });
  if (!user) {
    return res.status(400).json({ success: false, message: 'User wallet not provided!' });
  }
  if (!userDetails) {
    return res.status(404).json({ success: false, message: 'User not found !' });
  }
  try {
    const updateData = req.body;
    const validUpdateFields = ['username', 'points', 'profile_picture', 'twitter'];
    // Apply whitelist fields and validation rules
    const allowedUpdate = Object.keys(updateData).filter((field) =>
      validUpdateFields.includes(field)
    );
    const invalidFields = Object.keys(updateData).filter(
      (field) => !validUpdateFields.includes(field)
    );
    if (invalidFields.length > 0) {
      const errorMessage = `Invalid field(s) found: ${invalidFields.join(', ')}`;
      res.status(401).json({
        success: false,
        message: errorMessage,
      });
    }

    const filteredUpdateData = allowedUpdate.reduce((acc, field) => {
      acc[field] = updateData[field];
      return acc;
    }, {});

    const newUserDetails = await userModel.findOneAndUpdate(
      { wallet_address: user },
      { $set: filteredUpdateData },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: {
        user: newUserDetails,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
};

export const getLoggedinUser = async (req, res) => {
  const { wallet_address } = req.query;
  console.log(req.body, wallet_address);
  try {
    if (!wallet_address) {
      return res.status(400).json({ success: false, message: 'Wallet not provided!' });
    }

    const userExisted = await userModel.findOne({ wallet_address });
    if (userExisted) {
      return res.json('200', {
        success: true,
        message: 'Fectched user details successfully',
        data: {
          user: userExisted,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
    // throw new Error(err)
  }
};

//admin
export const getAllUser = (req, res) => {
  try {
    res.json('Get all user');
  } catch (err) {
    console.log(err);
  }
};

export const getSingleUser = (req, res) => {
  try {
    res.json('Get single user');
  } catch (err) {
    console.log(err);
  }
};
