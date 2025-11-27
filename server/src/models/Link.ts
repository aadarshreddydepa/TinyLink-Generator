import mongoose, { Schema, Document } from 'mongoose';

export interface ILink extends Document {
  code: string;
  url: string;
  clicks: number;
  createdAt: Date;
  lastClicked?: Date | null;
}

const LinkSchema = new Schema<ILink>({
  code: { type: String, required: true, unique: true, index: true },
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
  lastClicked: { type: Date, default: null }
});

export default mongoose.model<ILink>('Link', LinkSchema);
