import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 2,
        message: 'At least two options are required.',
      },
    },
    answer: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      default: '',
    },
    topic: {
      type: String,
      enum: [
        'EC2',
        'S3',
        'IAM',
        'CloudWatch',
        'VPC',
        'CloudFormation',
        'Billing',
        'Global Infrastructure',
        'General',
        'Other',
      ],
      default: 'General',
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    source: {
      type: String,
      enum: ['llm', 'admin'],
      default: 'llm',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // Could be null for LLM-generated questions
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model('Question', questionSchema);
