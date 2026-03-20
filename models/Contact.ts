import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email?: string;
  phone: string;
  service?: string;
  subService?: string;
  message?: string;
  isRead: boolean;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  service: { type: String, required: false },
  subService: { type: String, required: false },
  message: { type: String, required: false },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
