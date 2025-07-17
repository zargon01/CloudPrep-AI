// /backend/server.js

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import userRoutes from './routes/user.routes.js';
import questionRoutes from './routes/question.routes.js';
import examSessionRoutes from './routes/examSession.routes.js';
import rapidSessionRoutes from './routes/rapidSession.routes.js';
import llmRoutes from './routes/llm.routes.js';



dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('CloudPrep AI API is running');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exams', examSessionRoutes);
app.use('/api/rapid', rapidSessionRoutes);
app.use('/api/llm', llmRoutes);



// Handle 404s
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (optional, basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
