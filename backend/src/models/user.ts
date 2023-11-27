import { mongoose, Validator } from './imports';

const { isEmail } = Validator;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please include username'],
      unique: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, 'Please add a valid email address'],
      sparse: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: [true, 'Please include isActive'],
    },
    address: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: 'NG',
    },
    dob: String,
    phoneNumber: {
      type: String,
      match: [/\d{10}$/, 'Please include valid phone number'],
    },
    otp: {
      type: Number,
      required: [false, 'Please include otp'],
    },
    image: String,
    role: {
      super: { type: Boolean, default: false },
      admin: { type: Boolean, default: false },
      user: { type: Boolean, default: true },
      guest: { type: Boolean, default: false },
    },
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
    about: String,
    token: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

UserSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('User', UserSchema);
