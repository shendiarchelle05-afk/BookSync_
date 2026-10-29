import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  bookTitle: { type: String, required: true, trim: true },
  authorName: { type: String, default: 'Book Club Member', trim: true },
  content: { type: String, required: true, trim: true },
  tags: [{ type: String, trim: true }]
}, { timestamps: true });
export default mongoose.model('Discussion', schema);
