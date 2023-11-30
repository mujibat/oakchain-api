import { mongoose } from './imports';
import readingTime from 'reading-time';

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  pubDate: {
    type: Date,
    default: new Date(),
  },
  categories: [
    {
      type: String,
      trim: true,
      required: true,
    },
  ],
});

articlesSchema.virtual('readingTime').get(function () {
  const description = this.description;
  const result = readingTime(description);
  return result.text;
});
articlesSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

articlesSchema.set('toObject', { virtuals: true });
articlesSchema.set('toJSON', { virtuals: true });
export default mongoose.model('articlesModel', articlesSchema);
