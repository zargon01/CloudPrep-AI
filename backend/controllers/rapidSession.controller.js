// /backend/controllers/rapidSession.controller.js

import asyncHandler from 'express-async-handler';
import { RapidSession } from '../models/rapidSession.model.js';
import { Question } from '../models/question.model.js';

// @desc    Start a rapid practice session
// @route   POST /api/rapid/start
// @access  Private
export const startRapidSession = asyncHandler(async (req, res) => {
  const session = await RapidSession.create({
    user: req.user._id,
    startedAt: new Date(),
    interactions: [],
  });

  res.status(201).json({
    message: 'Rapid session started',
    sessionId: session._id,
  });
});

// @desc    Get a new question for rapid mode
// @route   GET /api/rapid/:id/question
// @access  Private
export const getNextQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const session = await RapidSession.findById(id);
  if (!session || String(session.user) !== String(req.user._id)) {
    res.status(404);
    throw new Error('Rapid session not found or unauthorized');
  }

  const question = await Question.aggregate([{ $sample: { size: 1 } }]);

  if (question.length === 0) {
    res.status(404);
    throw new Error('No questions available');
  }

  res.status(200).json({
    question: {
      _id: question[0]._id,
      question: question[0].question,
      options: question[0].options,
    },
  });
});

// @desc    Submit answer for a rapid session question
// @route   POST /api/rapid/:id/answer
// @access  Private
export const submitRapidAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { questionId, selectedOption } = req.body;

  const session = await RapidSession.findById(id);
  if (!session || String(session.user) !== String(req.user._id)) {
    res.status(404);
    throw new Error('Rapid session not found or unauthorized');
  }

  const question = await Question.findById(questionId);
  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  const isCorrect = selectedOption === question.correctAnswer;

  session.interactions.push({
    question: question._id,
    selectedOption,
    isCorrect,
  });

  await session.save();

  res.status(200).json({
    message: 'Answer submitted',
    isCorrect,
    correctAnswer: question.correctAnswer,
  });
});

// @desc    Get all rapid sessions (admin or user)
// @route   GET /api/rapid
// @access  Private
export const getAllRapidSessions = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user._id };

  const sessions = await RapidSession.find(filter)
    .populate('user', 'name email')
    .populate('interactions.question', 'question options correctAnswer');

  res.status(200).json(sessions);
});

// @desc    Get a single rapid session by ID
// @route   GET /api/rapid/:id
// @access  Private
export const getRapidSessionById = asyncHandler(async (req, res) => {
  const session = await RapidSession.findById(req.params.id)
    .populate('user', 'name email')
    .populate('interactions.question', 'question options correctAnswer');

  if (!session) {
    res.status(404);
    throw new Error('Session not found');
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
