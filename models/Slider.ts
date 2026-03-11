import mongoose, { Schema, Document } from 'mongoose';

export interface ISlider extends Document {
  image: string;
  title: string;
  subtitle: string;
  order: number;
}

const SliderSchema: Schema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

export default mongoose.models.Slider || mongoose.model<ISlider>('Slider', SliderSchema);
