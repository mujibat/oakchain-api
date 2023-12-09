import Document from './imports';

export interface BlogPostInterface extends Document {
  authorId?: string;
  title?: string;
  description?: string;
  image?: string;
  content?: string;
  noOfLikes?: number;
  blogLikesId?: string;
}

export interface BlogTagInterface extends Document {
  name?: string;
  blogPostId?: string;
}

export interface BlogLikeInterface extends Document {
  noOfLikes?: string;
  blogPostId?: string;
}

export interface BlogCommentInterface extends Document {
  comment?: string;
  blogPostId?: string;
}

export type CreateBlogPostType = {
  authorId: string;
  noOfLikes: number;
  blogLikesId?: string;
};

export type UpdateBlogPostType = {
  title?: string;
  description?: string;
  image?: {
    [key: string]: string;
  };
  content?: string;
  noOfLikes?: number;
  blogLikesId?: string;
};

export type CreateLikeType = {
  blogPostId: string;
  noOfLikes: number;
};

export type UpdateLikeType = {
  noOfLikes: number;
};

export type CreateCommentType = {
  comment: string;
  blogPostId: string;
};

export type UpdateCommentType = {
  comment: string;
};

export type CreateTagType = {
  name: string;
  blogPostId: string;
};

export type UpdateTagType = {
  name: string;
};

export type BlogPostQueryType = {
  limit?: number;
  page?: number;
  blogPostId?: string;
  title?: string;
  blogLikesId?: string;
  authorName?: string;
  authorId?: string;
};
