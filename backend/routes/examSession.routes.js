// /backend/routes/examSession.routes.js

import express from 'express';
import {
  startExamSession,
  submitExamSession,
  getAllExamSessions,
  getExamSessionById,
} from '../controllers/examSession.controller.js';

import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// Start a new exam session
router.post('/start', protect, startExamSession);

// Submit an exam session
router.post('/:id/submit', protect, submitExamSession);

// Get all exam sessions (admin) or user's own sessions
router.get('/', protect, getAllExamSessions);

// Get a single exam session by ID
router.get('/:id', protect, getExamSessionById);

export default router;
