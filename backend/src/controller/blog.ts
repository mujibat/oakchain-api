import { Request, Response } from 'express';
import { mongoose } from '../models/helpers/imports';
import { BlogService } from '../service';
import { BlogPostQueryType, GenericAnyType, ResponseCode, StatusCode } from '../@types';

export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const createdBlogPost = await BlogService.createBlogPost({
      authorId: res.locals.user.id,
      noOfLikes: 0,
      authorName: res.locals.user.username,
      ...req.body,
    });

    const blogLikes = await BlogService.createLike({
      noOfLikes: 0,
      blogPostId: createdBlogPost.id,
    });

    await BlogService.updateBlogPost(createdBlogPost.id, {
      blogLikesId: blogLikes.id as string,
    });

    return res
      .status(201)
      .json({ status: true, data: createdBlogPost, message: 'Blog post created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating a blog post.' });
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const { blogPostId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid blog post id',
      });
    }

    const updatedData = {
      ...req.body,
    };

    const updatedBlogPost = await BlogService.updateBlogPost(blogPostId, updatedData);

    if (!updatedBlogPost)
      return res.status(404).json({
        status: false,
        message: 'Blog post not found',
      });
    return res
      .status(200)
      .json({ status: true, data: updatedBlogPost, message: 'Blog post updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error updating the blog post.' });
  }
};

export const getAllBlogPosts = async (req: Request, res: Response) => {
  try {
    const blogPosts = await BlogService.findAllBlogPosts({
      ...req.query,
    } as unknown as BlogPostQueryType);

    let meta = {};

    const totalData = blogPosts.length;

    if (totalData > 9) {
      const blogPostCount = await BlogService.getBlogPostCount();

      let currentlyFetched = Number(req.query.limit) || totalData;

      const currentPage = Number(req.query.page) + 1 || 1;

      const remainingData = blogPostCount - totalData * currentPage;

      currentlyFetched = currentlyFetched || 1;

      const numberOfPages = Math.ceil(blogPostCount / currentlyFetched);

      meta = {
        blogPostCount,
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
      message: !!totalData ? 'blog fetch successful' : 'No blog found',
      data: { meta: req.query.userId ? {} : meta, blogPosts },
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

export const getBlogPost = async (req: Request, res: Response) => {
  try {
    const { blogPostId } = req.params;

    if (!mongoose.isValidObjectId(blogPostId)) {
      return res.status(400).json({ status: false, message: 'Invalid blog post id.' });
    }
    const blogPost = await BlogService.getBlogPostById(blogPostId);

    if (!blogPost) {
      return res.status(404).json({ status: false, message: 'Blog post not found.' });
    }

    const comments = await BlogService.getBlogComments(blogPostId);
    const likes = await BlogService.getBlogLikes(blogPostId);
    const tags = await BlogService.getBlogTags(blogPostId);

    return res.status(200).json({
      status: true,
      data: { blogPost, comments, likes, tags },
      message: 'Blog post fetched successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching blog post.' });
  }
};

export const createTagForBlogPost = async (req: Request, res: Response) => {
  try {
    const { blogPostId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid blog post id',
      });
    }

    const tagData = req.body;

    const post = await BlogService.getBlogPostById(blogPostId);

    if (!post) {
      return res.status(404).json({
        status: false,
        message: 'Post not found',
      });
    }

    const alreadyExistingTag = await BlogService.findTagByName(tagData.name);

    if (alreadyExistingTag) {
      return res.status(400).json({
        status: false,
        message: 'This tag name is already used',
      });
    }

    const createdTag = await BlogService.createTag({ ...tagData, blogPostId });

    return res.status(201).json({
      status: true,
      data: createdTag,
      message: 'Tag created for the blog post successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating a tag for the blog post.' });
  }
};

export const addTagToBlogPost = async (req: Request, res: Response) => {
  try {
    const { blogPostId, tagId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogPostId) || !mongoose.Types.ObjectId.isValid(tagId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid blog post id or tag id',
      });
    }

    const post = await BlogService.getBlogPostById(blogPostId);

    if (!post) {
      return res.status(404).json({
        status: false,
        message: 'Post not found',
      });
    }
    const addedTag = await BlogService.updateTag(tagId, { blogPostId, ...req.body });

    if (!addedTag) {
      return res.status(404).json({
        status: false,
        message: 'Tag not found',
      });
    }
    return res
      .status(200)
      .json({ status: true, message: 'Tag added to the blog post successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding a tag to the blog post.' });
  }
};

export const editTag = async (req: Request, res: Response) => {
  try {
    const { tagId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tagId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid tag post id',
      });
    }

    const updatedData = req.body;
    const updatedTag = await BlogService.updateTag(tagId, updatedData);
    return res
      .status(200)
      .json({ status: true, data: updatedTag, message: 'Tag updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating the tag.' });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { tagId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tagId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid tag id',
      });
    }

    const tag = await BlogService.deleteTag(tagId);

    if (!tag) {
      return res.status(404).json({
        status: false,
        message: 'tag not found',
      });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting the tag.' });
  }
};

export const toggleLikeBlogPost = async (req: Request, res: Response) => {
  try {
    const { blogPostId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid blog post id',
      });
    }

    const isLiked = req.body.isLiked;

    const blog = await BlogService.getBlogPostById(blogPostId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    if (!isLiked && blog?.noOfLikes === 0) {
      return res.status(204).end();
    }

    const noOfLikes = isLiked ? Number(blog?.noOfLikes) + 1 : Number(blog?.noOfLikes) - 1;

    await BlogService.updateBlogLike(String(blog?.blogLikesId), { noOfLikes });

    await BlogService.updateBlogPost(blogPostId, { noOfLikes });

    // BlogService.createLikeMeta({ UserId: req.user.id, BlogLikeId: blog.BlogLikeId });

    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error updating the like status for the blog post.' });
  }
};

export const getBlogPostLikes = async (req: Request, res: Response) => {
  try {
    const { blogPostId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid blog post id',
      });
    }

    const likes = await BlogService.getBlogLikes(blogPostId);

    res.status(200).json({
      status: true,
      message: 'success',
      data: likes,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching blog post likes.' });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { blogPostId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid blog post id',
      });
    }

    const comments = await BlogService.getBlogComments(blogPostId);

    res.status(200).json({
      status: true,
      message: 'success',
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching comments for the blog post.' });
  }
};

export const createCommentForBlogPost = async (req: Request, res: Response) => {
  try {
    const { blogPostId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid blog post id',
      });
    }

    const commentData = req.body;

    const blogPost = await BlogService.getBlogPostById(blogPostId);

    if (!blogPost) {
      return res.status(404).json({
        status: false,
        message: 'blogPost not found',
      });
    }

    const comment = await BlogService.createComment({
      ...commentData,
      blogPostId,
      userId: res.locals.user.id,
    });

    return res.status(201).json({
      status: true,
      message: 'Comment created for the blog post successfully',
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating a tag for the blog post.' });
  }
};

export const editComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(404).json({
        status: false,
        message: 'Invalid comment id',
      });
    }

    const updatedData = req.body;
    const updatedComment = await BlogService.updateComment(commentId, updatedData);
    return res
      .status(200)
      .json({ status: true, data: updatedComment, message: 'Comment updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating the comment.' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await BlogService.deleteComment(commentId);

    if (!comment) {
      return res.status(404).json({
        status: false,
        message: 'comment not found',
      });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting the comment.' });
  }
};
