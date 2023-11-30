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
  comment: string;
  postedBy: string;
};

export enum status {
  open = 'open',
  closed = 'closed',
}
