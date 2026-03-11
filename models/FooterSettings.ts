import mongoose from 'mongoose';

const FooterSettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: 'Urban Design India'
  },
  companyDescription: {
    type: String,
    required: true,
    default: 'We deliver expert construction and interior solutions backed by decades of experience.'
  },
  logo: {
    type: String,
    default: '/logo.png'
  },
  phone: {
    type: String,
    required: true,
    default: '+91 98765 43210'
  },
  email: {
    type: String,
    required: true,
    default: 'info@urbandesignindia.com'
  },
  address: {
    type: String,
    required: true,
    default: 'Mumbai, Maharashtra\nIndia - 400001'
  },
  facebookUrl: {
    type: String,
    default: 'https://facebook.com'
  },
  instagramUrl: {
    type: String,
    default: 'https://instagram.com'
  },
  linkedinUrl: {
    type: String,
    default: 'https://linkedin.com'
  },
  copyrightText: {
    type: String,
    default: 'Urban Design India. All Rights Reserved'
  }
}, {
  timestamps: true
});

export default mongoose.models.FooterSettings || mongoose.model('FooterSettings', FooterSettingsSchema);