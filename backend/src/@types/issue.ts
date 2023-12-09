import Document from './imports';

export interface IssueInterface extends Document {
  title: string;
  description: string;
  thumbnail?: string;
  issueType: string;
  status: 'open' | 'closed';
  priority: string;
  assignee: string;
  reporter: string;
  comments: IssueCommentType[];
}

export type IssueCommentType = {
  text: string;
  user: string;
};

export enum status {
  open = 'open',
  closed = 'closed',
}

export type CreateIssueType = {
  title: string;
  description: string;
  thumbnail?: string;
  issueType: string;
  priority: string;
  assignee: string;
  reporter: string;
  comments: IssueCommentType[];
};

export type UpdateIssueType = {
  title?: string;
  description?: string;
  thumbnail?: string;
  issueType?: string;
  status?: 'open' | 'closed';
  priority?: string;
  assignee?: string;
  reporter?: string;
  comments?: IssueCommentType[];
};

export type IssueQueryType = {
  role?: string;
  page?: number;
  limit?: number;
  status?: 'open' | 'closed';
  priority?: string;
  issueType?: string;
  assignee?: string;
  reporter?: string;
};
