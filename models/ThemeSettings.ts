import mongoose from 'mongoose';

const ThemeSettingsSchema = new mongoose.Schema({
  primaryColor: { 
    type: String, 
    required: true, 
    default: '#1f2937',
    validate: {
      validator: function(v: string) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message: 'Invalid hex color format'
    }
  },
  secondaryColor: { 
    type: String, 
    required: true, 
    default: '#f3f4f6',
    validate: {
      validator: function(v: string) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message: 'Invalid hex color format'
    }
  },
  accentColor: { 
    type: String, 
    required: true, 
    default: '#f59e0b',
    validate: {
      validator: function(v: string) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message: 'Invalid hex color format'
    }
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Ensure only one active theme settings document
ThemeSettingsSchema.index({ isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } });

export default mongoose.models.ThemeSettings || mongoose.model('ThemeSettings', ThemeSettingsSchema);