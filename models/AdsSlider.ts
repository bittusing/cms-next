import mongoose from 'mongoose';

const AdsSliderSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'Learn More'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.AdsSlider || mongoose.model('AdsSlider', AdsSliderSchema);