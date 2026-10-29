import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  bookTitle: { type: String, required: true, trim: true },
  chapterNumber: { type: Number, required: true, min: 1 },
  totalChapters: { type: Number, required: true, min: 1 },
  note: { type: String, default: '' },
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model('Milestone', schema);
