import { Request, Response } from 'express';
import { mongoose } from '../models/helpers/imports';
import { GenericAnyType, ResponseCode, StatusCode, IssueQueryType } from '../@types';
import { SAMSON_CONFIGS, SAMSON_UTILS } from 'sm-pkjs/dist';
import { IssueService } from '../service';

const {
  Toolbox: { createToken },
} = SAMSON_UTILS;
const {
  env: { FRONTEND_URL },
} = SAMSON_CONFIGS;

export async function createIssue(req: Request, res: Response) {
  try {
    const { assignee, reporter } = req.body;

    if (!mongoose.Types.ObjectId.isValid(assignee) || !mongoose.Types.ObjectId.isValid(reporter)) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'Invalid user id for assignee or reporter',
      });
    }

    await IssueService.createIssue({
      ...req.body,
    });

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Issue created successfully',
    });
  } catch (error: GenericAnyType) {
    return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: error.message || 'Something went wrong',
    });
  }
}

export const listIssues = async (req: Request, res: Response) => {
  try {
    const Issues = await IssueService.getAllIssues({
      ...req.query,
    } as unknown as IssueQueryType);

    let meta = {};

    const totalData = Issues.length;

    if (totalData > 9) {
      const IssueCount = await IssueService.getIssuesCount();

      let currentlyFetched = Number(req.query.limit) || totalData;

      const currentPage = Number(req.query.page) + 1 || 1;

      const remainingData = IssueCount - totalData * currentPage;

      currentlyFetched = currentlyFetched || 1;

      const numberOfPages = Math.ceil(IssueCount / currentlyFetched);

      meta = {
        IssueCount,
        remainingData,
        currentPage,
        currentlyFetched,
        numberOfPages,
        numberOfPagesLeft: numberOfPages - currentPage,
      };
    }

    const response: GenericAnyType = {
      code: !!totalData ? 200 : 400,
      status: !!totalData ? !!ResponseCode.SUCCESS : !!ResponseCode.FAILURE,
      message: !!totalData ? 'Issue fetch successful' : 'No Issue found',
      data: { meta: req.query.issueId ? {} : meta, Issues },
    };

    const { code, ...rest } = response;

    return res.status(response.code).json(rest);
  } catch (err: GenericAnyType) {
    console.log(err);
    return res.status(err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server error',
    });
  }
};

export const getIssue = async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;

    console.log(issueId);

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'Invalid issue id',
        data: null,
      });
    }

    const Issue = await IssueService.getIssueById(issueId);

    if (!Issue) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'Issue not found',
        data: null,
      });
    }

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Issue fetch successful',
      data: Issue,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;
    const updatedIssueData = req.body;

    const updateIssue = await IssueService.updateIssue(issueId, updatedIssueData);

    if (!updateIssue) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'Issue not found',
        data: null,
      });
    }

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Issue update successful',
      data: updateIssue,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};
