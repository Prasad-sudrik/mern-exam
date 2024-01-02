import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  user_answer: {
    type: String,
    required: true,
  },
});

const submissionSchema = new mongoose.Schema(
  {
    userRef: {
      type: String,
      required: true,
    },
    testRef: {
      type: String,
      required: true,
    },
    userAnswers: {
      type: [userAnswerSchema],
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure the combination of userRef and testRef is unique
submissionSchema.index({ userRef: 1, testRef: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);
Submission.collection.createIndex({ userRef: 1, testRef: 1 }, { unique: true });

export default Submission;
