import Document from './imports';

export interface OnboardInterface extends Document {
  cohortId: string;
  email: string;
  isBlacklisted: boolean;
}
