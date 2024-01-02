import { errorHandler } from "../utils/error.js";
import Submission from "../models/submission.model.js";

export const createSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.create(req.body);
    if (!submission) {
      return next(errorHandler(404, "Already Submitted "));
    }
    return res.status(201).json({ submission });
  } catch (err) {
    if (err.code === 11000)
      return next(errorHandler(409, "Already Submitted "));
    else next(err);
  }
};
