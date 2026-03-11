import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Urban Design India'
  },
  category: {
    type: String,
    required: true,
    enum: ['Interior Design', 'Home Decor', 'Architecture', 'Tips & Guides', 'Trends', 'Case Studies']
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number,
    default: 5
  },
  seoTitle: {
    type: String,
    trim: true
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  seoKeywords: {
    type: String,
    trim: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create index for better search performance
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });
BlogSchema.index({ slug: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ isPublished: 1 });
BlogSchema.index({ publishedAt: -1 });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);