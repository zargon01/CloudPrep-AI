// /backend/routes/rapidSession.routes.js

import express from 'express';
import {
  startRapidSession,
  getNextQuestion,
  submitRapidAnswer,
  getAllRapidSessions,
  getRapidSessionById,
} from '../controllers/rapidSession.controller.js';

import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// Start a new rapid practice session
router.post('/start', protect, startRapidSession);

// Get a random question for current session
router.get('/:id/question', protect, getNextQuestion);

// Submit answer for current session
router.post('/:id/answer', protect, submitRapidAnswer);

// Get all rapid sessions (admin or user)
router.get('/', protect, getAllRapidSessions);

// Get a specific rapid session
router.get('/:id', protect, getRapidSessionById);

export default router;
