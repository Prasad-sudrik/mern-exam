import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

const testSchema = new mongoose.Schema({
  exam: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date, default: Date.now },
  questions: [questionSchema],
});

questionSchema.pre("save", function (next) {
  if (!this.id) {
    // Generate an id if not provided
    this.id = new mongoose.Types.ObjectId();
  }
  next();
});
testSchema.index({ exam: 1, subject: 1 }, { unique: true });

const Test = mongoose.model("Test", testSchema);
// Test.collection.dropIndex();
Test.collection.createIndex({ exam: 1, subject: 1 }, { unique: true });

export default Test;
