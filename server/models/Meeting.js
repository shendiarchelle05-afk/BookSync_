import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  bookTitle: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  meetingAt: { type: Date, required: true },
  location: { type: String, default: 'Online' },
  reminderMinutes: { type: Number, default: 30, min: 0 }
}, { timestamps: true });
export default mongoose.model('Meeting', schema);
