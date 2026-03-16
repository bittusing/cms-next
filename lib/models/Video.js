import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  youtubeUrl: {
    type: String,
    required: true,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Interior Design', 'Client Testimonial', 'Project Showcase', 'Design Tips', 'Behind the Scenes'],
    default: 'Interior Design'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better performance
VideoSchema.index({ isActive: 1, order: 1 });
VideoSchema.index({ isFeatured: 1, isActive: 1 });

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);