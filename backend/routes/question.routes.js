// /backend/routes/question.routes.js

import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getRandomQuestions
} from '../controllers/question.controller.js';

import protect from '../middleware/auth.middleware.js';
import allowRoles from '../middleware/roles.middleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllQuestions);                    // GET /api/questions
router.get('/random', getRandomQuestions);           // GET /api/questions/random
router.get('/:id', getQuestionById);                 // GET /api/questions/:id

// Admin Routes
router.post('/', protect, allowRoles('admin'), createQuestion);         // POST /api/questions
router.put('/:id', protect, allowRoles('admin'), updateQuestion);       // PUT /api/questions/:id
router.delete('/:id', protect, allowRoles('admin'), deleteQuestion);    // DELETE /api/questions/:id

export default router;
