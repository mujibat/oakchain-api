import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { userValidationSchema } from '../validations/index.js';

const userSchema = new Schema({
  username: {
    type: String,
  },
  wallet_address: {
    type: String,
  },
  points: {
    type: String,
    default: 0,
  },
  profile_picture: {
    type: String,
  },
  twitter: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.validateUser = () => {
  return userValidationSchema.validate(userSchema);
};

export default mongoose.model('user', userSchema);
