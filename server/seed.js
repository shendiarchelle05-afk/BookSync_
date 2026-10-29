import 'dotenv/config';
import mongoose from 'mongoose';
import Discussion from './models/Discussion.js';
import Milestone from './models/Milestone.js';
import Meeting from './models/Meeting.js';
import Notification from './models/Notification.js';

const now = new Date();
const daysFromNow = (days, hour = 18) => {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  date.setHours(hour, 0, 0, 0);
  return date;
};

async function seed() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/booksync';
  await mongoose.connect(uri);
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);

  await Promise.all([
    Discussion.deleteMany({}),
    Milestone.deleteMany({}),
    Meeting.deleteMany({}),
    Notification.deleteMany({})
  ]);

  const discussions = await Discussion.insertMany([
    { title: 'What do you think of the opening chapter?', bookTitle: 'The Midnight Library', authorName: 'Mia', content: 'Let’s talk about how Nora’s choices shape the story. Which detail stood out to you?', tags: ['opening', 'characters'] },
    { title: 'Favorite quote so far', bookTitle: 'Atomic Habits', authorName: 'Jordan', content: 'Share a quote that changed how you think about building small daily habits.', tags: ['quotes', 'reflection'] },
    { title: 'Predicting the ending', bookTitle: 'The Hobbit', authorName: 'Alex', content: 'No spoilers, please! What do you think Bilbo will discover next?', tags: ['theories', 'fantasy'] }
  ]);

  const milestones = await Milestone.insertMany([
    { bookTitle: 'The Midnight Library', chapterNumber: 4, totalChapters: 15, note: 'Finished the first reading session and noted two questions for the club.', completedAt: daysFromNow(-1, 20) },
    { bookTitle: 'Atomic Habits', chapterNumber: 3, totalChapters: 20, note: 'Completed the chapter on identity-based habits.', completedAt: daysFromNow(-2, 19) },
    { bookTitle: 'The Hobbit', chapterNumber: 6, totalChapters: 19, note: 'Caught up with the group reading plan.', completedAt: daysFromNow(0, 17) }
  ]);

  const meetings = await Meeting.insertMany([
    { title: 'Weekly BookSync Circle', bookTitle: 'The Midnight Library', description: 'Discuss chapters 1–4 and share favorite passages.', meetingAt: daysFromNow(2, 18), location: 'Online · Google Meet', reminderMinutes: 30 },
    { title: 'Habit-Building Check-in', bookTitle: 'Atomic Habits', description: 'Talk about one small habit to practice this week.', meetingAt: daysFromNow(4, 19), location: 'Community Library · Room 2', reminderMinutes: 60 },
    { title: 'Middle-Earth Reading Night', bookTitle: 'The Hobbit', description: 'Discuss the latest chapters and theories.', meetingAt: daysFromNow(7, 18), location: 'Online · Discord', reminderMinutes: 30 }
  ]);

  await Notification.insertMany([
    { type: 'discussion', message: `New discussion: ${discussions[0].title}`, relatedId: String(discussions[0]._id), read: false, createdAt: daysFromNow(-1, 15) },
    { type: 'milestone', message: `Chapter milestone reached: ${milestones[0].bookTitle}, chapter ${milestones[0].chapterNumber}`, relatedId: String(milestones[0]._id), read: false, createdAt: daysFromNow(-1, 20) },
    { type: 'meeting', message: `Meeting scheduled: ${meetings[0].title}`, relatedId: String(meetings[0]._id), read: true, createdAt: daysFromNow(-2, 10) }
  ]);

  console.log(`Seed complete: ${discussions.length} discussions, ${milestones.length} milestones, ${meetings.length} meetings, 3 notifications.`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error('Seed failed:', error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
