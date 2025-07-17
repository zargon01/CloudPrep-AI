import express from 'express';
import { generateQuestions } from '../controllers/llm.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/generate', protect, generateQuestions);

export default router;
