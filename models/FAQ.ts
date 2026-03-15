import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['General', 'Services', 'Pricing', 'Process', 'Support'],
    default: 'General'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
FAQSchema.index({ isActive: 1, category: 1, order: 1 });
FAQSchema.index({ question: 'text', answer: 'text' }); // Text search

export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);