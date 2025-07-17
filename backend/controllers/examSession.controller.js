// /backend/controllers/examSession.controller.js

import asyncHandler from 'express-async-handler';
import { ExamSession } from '../models/examSession.model.js';
import { Question } from '../models/question.model.js';

// @desc    Start a new exam session
// @route   POST /api/exams/start
// @access  Private
export const startExamSession = asyncHandler(async (req, res) => {
  const { totalQuestions, duration } = req.body;

  const questions = await Question.aggregate([{ $sample: { size: totalQuestions } }]);

  if (questions.length === 0) {
    res.status(404);
    throw new Error('Not enough questions in database');
  }

  const formattedQuestions = questions.map((q) => ({
    question: q._id,
  }));

  const session = await ExamSession.create({
    user: req.user._id,
    questions: formattedQuestions,
    totalQuestions,
    duration,
    startedAt: new Date(),
  });

  res.status(201).json({
    message: 'Exam session started',
    sessionId: session._id,
    questions: questions.map(({ _id, question, options }) => ({
      _id,
      question,
      options,
    })),
  });
});

// @desc    Submit exam session
// @route   POST /api/exams/:id/submit
// @access  Private
export const submitExamSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body; // Array of { questionId, selectedOption }

  const session = await ExamSession.findById(id).populate('questions.question');

  if (!session) {
    res.status(404);
    throw new Error('Exam session not found');
  }

  if (String(session.user) !== String(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized to submit this session');
  }

  let correct = 0;
  const updatedQuestions = session.questions.map((entry) => {
    const answer = answers.find((a) => a.questionId === String(entry.question._id));
    const isCorrect = answer?.selectedOption === entry.question.correctAnswer;

    if (isCorrect) correct++;

    return {
      question: entry.question._id,
      selectedOption: answer?.selectedOption || null,
      isCorrect: !!isCorrect,
    };
  });

  session.questions = updatedQuestions;
  session.correctAnswers = correct;
  session.score = Math.round((correct / session.totalQuestions) * 100);
  session.endedAt = new Date();
  await session.save();

  res.status(200).json({
    message: 'Exam submitted successfully',
    score: session.score,
    correctAnswers: session.correctAnswers,
    totalQuestions: session.totalQuestions,
  });
});

// @desc    Get all exam sessions (admin) or user’s own (user)
// @route   GET /api/exams
// @access  Private
export const getAllExamSessions = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user._id };

  const sessions = await ExamSession.find(filter)
    .populate('user', 'name email')
    .populate('questions.question', 'question options correctAnswer');

  res.status(200).json(sessions);
});

// @desc    Get single exam session by ID
// @route   GET /api/exams/:id
// @access  Private
export const getExamSessionById = asyncHandler(async (req, res) => {
  const session = await ExamSession.findById(req.params.id)
    .populate('user', 'name email')
    .populate('questions.question', 'question options correctAnswer');

  if (!session) {
    res.status(404);
    throw new Error('Exam session not found');
  }

  if (
    req.user.role !== 'admin' &&
    String(session.user._id) !== String(req.user._id)
  ) {
    res.status(403);
    throw new Error('Not authorized to view this session');
  }

  res.status(200).json(session);
});
