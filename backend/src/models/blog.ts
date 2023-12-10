import { mongoose } from './helpers/imports';

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: Object,
    },
    content: {
      type: String,
    },
    noOfLikes: {
      type: Number,
    },
    blogLikesId: {
      type: mongoose.Types.ObjectId,
    },
    authorName: {
      type: String,
      required: [true, 'Author name is required.'],
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'AuthorId is required.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

BlogPostSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const BlogTagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required.'],
    },
    blogPostId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'BlogPostId is required.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

BlogTagSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const BlogLikesSchema = new mongoose.Schema(
  {
    noOfLikes: {
      type: Number,
      required: [true, 'Number of likes is required.'],
    },
    blogPostId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'BlogPostId is required.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

BlogLikesSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const BlogLikesMetaSchema = new mongoose.Schema(
  {
    blogLikesId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'BlogLikesId is required.'],
    },
    blogPostId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'BlogPostId is required.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

BlogLikesMetaSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const BlogCommentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment is required.'],
    },
    blogPostId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'BlogPostId is required.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

BlogCommentsSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);
const BlogCommentsModel = mongoose.model('BlogComments', BlogCommentsSchema);
const BlogLikesModel = mongoose.model('BlogLikes', BlogLikesSchema);
const BlogTagModel = mongoose.model('BlogTag', BlogTagSchema);
const BlogLikesMetaModel = mongoose.model('BlogLikesMeta', BlogLikesMetaSchema);

export { BlogPostModel, BlogCommentsModel, BlogLikesModel, BlogTagModel, BlogLikesMetaModel };
