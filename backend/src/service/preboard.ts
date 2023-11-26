import Preboard from '../models/preboard';
import { StatusCode, OnboardInterface } from '../@types';
import { ApiError } from '../utils';

class PreboardService {
  async createOnboarder(onboardData: OnboardInterface) {
    try {
      const onboarder = new Preboard(onboardData);
      await onboarder.save();
      return onboarder;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'createOnboarder',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getOnboarder(email: string) {
    try {
      const onboarder = await Preboard.findOne({ email });
      return onboarder;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getOnboarder',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateOnboarder(email: string, update: any) {
    try {
      const onboarder = await Preboard.findOneAndUpdate({ email }, { ...update }, { new: true });
      return onboarder;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'updateOnboarder',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new PreboardService();
