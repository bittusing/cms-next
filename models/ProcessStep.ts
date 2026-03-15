import mongoose from 'mongoose';

const ProcessStepSchema = new mongoose.Schema({
  stepNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
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
ProcessStepSchema.index({ isActive: 1, order: 1 });
ProcessStepSchema.index({ stepNumber: 1 }, { unique: true });

export default mongoose.models.ProcessStep || mongoose.model('ProcessStep', ProcessStepSchema);