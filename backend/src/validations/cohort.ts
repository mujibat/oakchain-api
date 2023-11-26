import joi from './imports';
import { cohortList } from '../service';

const cohort = {
  async validateCreateCohort(payload: any) {
    const schema = joi.object({
      name: joi
        .string()
        .valid(...cohortList)
        .required()
        .label('Cohort Name'),
      numberOfStudents: joi
        .number()
        .integer()
        .required()
        .label('Number of Students is required to be a number'),
      startDate: joi
        .date()
        .format('YYYY-MM-DD')
        .required()
        .label('Cohort start date is required. Format should be YYYY-MM-DD'),
      endDate: joi
        .date()
        .format('YYYY-MM-DD')
        .required()
        .label('Cohort end date is required. Format should be YYYY-MM-DD'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default cohort;
