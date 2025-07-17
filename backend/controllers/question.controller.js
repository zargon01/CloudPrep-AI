import { Question } from '../models/question.model.js';

// @desc    Create a new question
// @route   POST /api/questions
// @access  Admin only (or internal LLM logic)
export const createQuestion = async (req, res) => {
  try {
    const { text, options, answer, explanation, topic, difficulty, source } = req.body;

    const question = new Question({
      text,
      options,
      answer,
      explanation,
      topic,
      difficulty,
      source,
      createdBy: req.user?._id || null,
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create question', error: err.message });
  }
};

// @desc    Get all questions with optional filters
// @route   GET /api/questions
// @access  Public
export const getAllQuestions = async (req, res) => {
  try {
    const { topic, difficulty, source } = req.query;

    const query = {};
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;
    if (source) query.source = source;

    const questions = await Question.find(query);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questions', error: err.message });
  }
};

// @desc    Get a single question by ID
// @route   GET /api/questions/:id
// @access  Public
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching question', error: err.message });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Admin only
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update question', error: err.message });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Admin only
export const deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question', error: err.message });
  }
};

// @desc    Get random questions (for rapid mode)
// @route   GET /api/questions/random?count=10
// @access  Public
export const getRandomQuestions = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;

    const questions = await Question.aggregate([{ $sample: { size: count } }]);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error getting random questions', error: err.message });
  }
};
