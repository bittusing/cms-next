import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  text: string;
  image?: string;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
