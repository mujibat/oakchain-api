import { Request, Response, NextFunction } from 'express';
import { ResponseCode, StatusCode } from '../@types';
import { issueValidations } from '../validations';

const IssueMiddleware = {
  async inspectCreateIssue(req: Request, res: Response, next: NextFunction) {
    try {
      await issueValidations.validateCreateIssue(req.body);
      next();
    } catch (error: any) {
      return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },

  async inspectUpdateIssue(req: Request, res: Response, next: NextFunction) {
    try {
      await issueValidations.validateUpdateIssue(req.body);
      next();
    } catch (error: any) {
      return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
};

export default IssueMiddleware;
