import Document from './imports';

export interface CohortInterface extends Document {
  name?: string;
  numberOfStudents?: number;
  isActive?: boolean;
  description?: string;
  startDate?: string;
  endDate?: string;
}
