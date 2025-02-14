import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!(username && email && password))
    return next(new ErrorHandler("All fields required!"));
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser)
    return next(new ErrorHandler("Username and Email is register", 400));
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  return res.status(201).json({ message: "User Created Successfully" });
});

export const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password))
    return next(new ErrorHandler("Email and Password is required", 400));
  const vaildEmail = await User.findOne({ email });
  if (!vaildEmail) return next(new ErrorHandler("Email not register", 400));
  const validPassword = await bcrypt.compare(password, vaildEmail.password);
  if (!validPassword) return next(new ErrorHandler("Incorrect Password", 400));
  const payload = { id: vaildEmail._id };
  const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "1hr" });
  const { password: userPassword, ...user } = vaildEmail._doc;
  return res
    .cookie("Token", token, {
      httpOnly: false, // Set to false for testing purposes
      secure: false, // Ensure this is false for local development without HTTPS
      // sameSite: 'None', // Set SameSite to None for cross-origin requests during development
      // path: '/', // Ensure the cookie is available to the entire site
      // domain: 'localhost', // Ensure the domain is correctly set for local development
      expires: new Date(Date.now() + 3600000),
    })
    .status(200)
    .json({ Data: { ...user }, message: "Logged In Successfully" });
});
