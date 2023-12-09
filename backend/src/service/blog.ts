import {
  BlogCommentsModel,
  BlogLikesModel,
  BlogLikesMetaModel,
  BlogPostModel,
  BlogTagModel,
} from '../models/blog';
import { SAMSON_UTILS } from 'sm-pkjs/dist';
import {
  StatusCode,
  CreateBlogPostType,
  UpdateBlogPostType,
  CreateLikeType,
  BlogPostQueryType,
  CreateCommentType,
  CreateTagType,
  UpdateTagType,
  UpdateCommentType,
  UpdateLikeType,
} from '../@types';
import OAK_TOOLS from '../utils/toolbox';

const { ApiError } = SAMSON_UTILS;
const { createBlogPostQuery } = OAK_TOOLS;

class BlogPostService {
  async createBlogPost(blogData: CreateBlogPostType) {
    try {
      const blogPost = await BlogPostModel.create(blogData);
      return blogPost;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'createUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBlogPostById(blogId: string) {
    try {
      const blogPost = await BlogPostModel.findById(blogId);
      return blogPost;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'getBlogPostById',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateBlogPost(blogId: string, blogData: UpdateBlogPostType) {
    try {
      const blogPost = await BlogPostModel.findByIdAndUpdate(blogId, blogData, {
        new: true,
      });
      if (!blogPost) return null;
      return blogPost;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'updateBlogPost',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  deleteBlogPost = async (blogId: string) => {
    try {
      const blogPost = await BlogPostModel.findByIdAndDelete(blogId);
      if (!blogPost) return null;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'deleteBlogPost',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  findAllBlogPosts = async (data: BlogPostQueryType) => {
    try {
      const query = await createBlogPostQuery({}, data);
      const limit = Number(data.limit) || 10;
      const page = Number(data.page) || 0;

      console.log(query);

      const users = await BlogPostModel.find(query)
        .limit(limit)
        .skip(page * limit);

      return users;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'findAllBlogPosts',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  async getBlogPostCount() {
    try {
      const count = await BlogPostModel.count();
      return count;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'getBlogPostCount',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBlogComments(blogPostId: string) {
    try {
      const blogComments = await BlogCommentsModel.find({ blogPostId });
      return blogComments;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'getBlogComments',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBlogLikes(blogPostId: string) {
    try {
      const blogLikes = await BlogLikesModel.find({ blogPostId });
      return blogLikes;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'getBlogLikes',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBlogLikesMeta(blogId: string) {
    try {
      const blogLikesMeta = await BlogLikesMetaModel.find({ blogId });
      return blogLikesMeta;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'getBlogLikesMeta',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createLike(likeData: CreateLikeType) {
    try {
      const blogLike = await BlogLikesModel.create(likeData);
      return blogLike;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'createLike',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteLike(likeId: string) {
    try {
      const blogLike = await BlogLikesModel.findByIdAndDelete(likeId);
      if (!blogLike) return null;
      return blogLike;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'deleteLike',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createComment(commentData: CreateCommentType) {
    try {
      const blogComment = await BlogCommentsModel.create(commentData);
      return blogComment;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'createComment',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteComment(commentId: string) {
    try {
      const blogComment = await BlogCommentsModel.findByIdAndDelete(commentId);
      if (!blogComment) return null;
      return blogComment;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'deleteComment',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateComment(commentId: string, commentData: UpdateCommentType) {
    try {
      const blogComment = await BlogCommentsModel.findByIdAndUpdate(commentId, commentData, {
        new: true,
      });
      if (!blogComment) return null;
      return blogComment;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'updateComment',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBlogCommentCount() {
    try {
      const count = await BlogCommentsModel.count();
      return count;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'getBlogCommentCount',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBlogTags(blogPostId: string) {
    try {
      const blogTags = await BlogTagModel.find({
        blogPostId,
      });
      return blogTags;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'getBlogTags',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findTagByName(name: string) {
    try {
      const blogTag = await BlogTagModel.findOne({ name });
      return blogTag;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'findTagByName',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createTag(tagData: CreateTagType) {
    try {
      const blogTag = await BlogTagModel.create(tagData);
      return blogTag;
    } catch (error) {
      throw new ApiError('oak api', error as string, 'createTag', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteTag(tagId: string) {
    try {
      const blogTag = await BlogTagModel.findByIdAndDelete(tagId);
      if (!blogTag) return null;
      return blogTag;
    } catch (error) {
      throw new ApiError('oak api', error as string, 'deleteTag', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTag(tagId: string, tagData: UpdateTagType) {
    try {
      const blogTag = await BlogTagModel.findByIdAndUpdate(tagId, tagData, {
        new: true,
      });
      if (!blogTag) return null;
      return blogTag;
    } catch (error) {
      throw new ApiError('oak api', error as string, 'updateTag', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async updateBlogLike(blogLikeId: string, blogLikeData: UpdateLikeType) {
    try {
      const blogLike = await BlogLikesModel.findByIdAndUpdate(blogLikeId, blogLikeData, {
        new: true,
      });
      if (!blogLike) return null;
      return blogLike;
    } catch (error) {
      throw new ApiError(
        'oak api',
        error as string,
        'updateBlogLike',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new BlogPostService();
