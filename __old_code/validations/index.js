import Joi from 'joi';

export const userValidationSchema = Joi.object({
  wallet_address: Joi.string().required(),
});
