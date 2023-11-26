import { CohortInterface } from '../@types';
import Cohort from '../models/cohort';
import User from '../models/user';
import { ApiError, StatusCode } from '../utils';

const ServerError = (error: any, projName: string, fnName: string, statusCode: StatusCode) => {
  return new ApiError(projName, error as string, fnName, statusCode);
}; // lets move this in to the ApiError file and export it from there then import it here.

class CohortService {
  async getAllCohort() {
    try {
      const cohorts = await Cohort.find();
      return cohorts;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getAllCohort',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getCohortById(cohortId: string) {
    try {
      const cohort = await Cohort.findById(cohortId);
      return cohort;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getCohortById',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getCohortByName(name: string) {
    try {
      const cohort = Cohort.findOne({ name });
      if (!cohort) throw new Error('Cohort not found');
      return cohort;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getCohortByName',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getCohortStudents(cohortId: string) {
    try {
      const cohort = await Cohort.findById(cohortId);
      const cohortStudents = await User.findOne({ cohortId: cohort?.id });
      return { cohort, cohortStudents };
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getCohortById',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createCohort(cohortData: CohortInterface) {
    try {
      const cohort = new Cohort(cohortData);
      await cohort.save();
      return cohort;
    } catch (error) {
      throw ServerError(error, 'impact API', 'createCohort', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCohort(cohortId: string, updatedData: CohortInterface) {
    try {
      const cohort = await Cohort.findByIdAndUpdate(cohortId, updatedData, { new: true });

      if (!cohort) {
        // Throw an error if the cohort is not found
        throw new Error('Cohort not found');
      }

      return cohort;
    } catch (error) {
      // Handle any errors and rethrow them with additional context
      throw ServerError(error, 'impact API', 'updateCohort', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  deleteCohort = async (cohortId: string) => {
    try {
      const cohort = await Cohort.findByIdAndDelete(cohortId);
      if (!cohort) return null;
      return cohort;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'deleteCohort',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}

export default new CohortService();
