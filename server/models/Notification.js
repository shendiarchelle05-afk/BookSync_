import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  type: { type: String, enum: ['discussion', 'milestone', 'meeting', 'system'], default: 'system' },
  message: { type: String, required: true },
  relatedId: { type: String, default: '' },
  read: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Notification', schema);
