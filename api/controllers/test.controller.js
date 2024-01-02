import Test from "../models/test.model.js";
import { errorHandler } from "../utils/error.js";

export const createTest = async (req, res, next) => {
  try {
    const listing = await Test.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return next(errorHandler(404, "Test Not found!"));
    }
    res.status(200).json(test);
  } catch (error) {
    next(error);
  }
};
