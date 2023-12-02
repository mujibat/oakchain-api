import { UserQueryType } from '../@types/user';
import { IssueQueryType } from '../@types';

/**
 * Function for api tools methods
 * @function Toolbox
 */
const Tools = {
  generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  },

  createUserQuery(query: any, data: UserQueryType): any {
    if (data.role) query['role.' + data.role] = true;

    if (data.requestStatus) query.requestStatus = data.requestStatus;

    if (data.firstName) query.firstName = data.firstName;

    if (data.email) query.email = data.email;

    if (data.lastName) query.lastName = data.lastName;

    if (data.username) query.username = data.username;

    if (data.isActive) query.isActive = !!Number(data.isActive);

    if (data.state) query.state = data.state;

    if (data.country) query.country = data.country;

    if (data.userId) query._id = data.userId;

    return query;
  },

  async createIssueQuery(query: any, data: IssueQueryType): Promise<any> {
    if (data.status) query.status = data.status;

    if (data.priority) query.priority = data.priority;

    if (data.issueType) query.issueType = data.issueType;

    if (data.assignee) query.assignee = data.assignee;

    if (data.reporter) query.reporter = data.reporter;

    return query;
  },
};

export default Tools;
