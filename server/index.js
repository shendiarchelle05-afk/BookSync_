import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app, { connectDB } from './app.js';

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173' } });
app.locals.io = io;

io.on('connection', socket => { console.log(`Client connected: ${socket.id}`); });
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`BookSync API running on port ${PORT}`);
  });
})
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
