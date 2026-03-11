import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  description: string;
  location: string;
  clientName: string;
  year: number;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  location: { type: String, required: true },
  clientName: { type: String, required: true },
  year: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
