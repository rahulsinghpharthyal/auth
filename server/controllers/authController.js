import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const signUp = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser)
    return next(new ErrorHandler("Username and Email is register", 400));
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  return res.status(201).json({ message: "User Created Successfully" });
});
