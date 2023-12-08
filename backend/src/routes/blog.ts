import { Router } from 'express';
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPost,
  updateBlogPost,
  createTagForBlogPost,
  addTagToBlogPost,
  toggleLikeBlogPost,
  createCommentForBlogPost,
  editComment,
  deleteComment,
  editTag,
  deleteTag,
  getBlogPostLikes,
  getComments,
} from '../controller';

const router = Router();

router.post('/', createBlogPost); // should have a request body. all post and put request should have a request body.
router.get('/', getAllBlogPosts);
router.get('/:blogPostId', getBlogPost);
router.put('/:blogPostId', updateBlogPost);
router.post('/:blogPostId/tags', createTagForBlogPost);
router.put('/:blogPostId/tags', addTagToBlogPost);
router.put('/:blogPostId/tags/:tagId', editTag);
router.delete('/:blogPostId/tags/:tagId', deleteTag);
router.put('/:blogPostId/like', toggleLikeBlogPost);
router.get('/:blogPostId/likes', getBlogPostLikes);
router.post('/:blogPostId/comments', createCommentForBlogPost);
router.put('/:blogPostId/comments/:commentId', editComment);
router.delete('/:blogPostId/comments/:commentId', deleteComment);
router.get('/:blogPostId/comments', getComments);

export default router;
