// middlewares:-
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// packages:-
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// models:-
import User from "../models/user.js";

// Utils:-
import generateTokensAndResponse from "../utils/generateTokenAndResponse.js";

export const signUp = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!(username && email && password))
    return next(new ErrorHandler("All fields required!"));
  const existingUser = await User.findOne({ email: email}); /*$or: [{ email }, { username }] // "this is used when we findOne by both email and username"*/ 
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
  const existingUser = await User.findOne({ email });
  if (!existingUser) return next(new ErrorHandler("Email not register", 400));
  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) return next(new ErrorHandler("Incorrect Password", 400));
  generateTokensAndResponse(existingUser, res);
});

export const googleAuth = catchAsyncError(async (req, res, next) => {
  const { username, email, profileImg } = req.body;
  const existingUser = await User.findOne({ email: email });
  console.log(existingUser)
  if (existingUser) {
    generateTokensAndResponse(existingUser, res);
  } else {
    //beacause password is neccessary for new User:-
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      profileImg: profileImg,
    });
    await newUser.save();
    console.log('thiis is newUser', newUser)
    generateTokensAndResponse(newUser, res);
  }
});


export const logOut = catchAsyncError(async(req, res, next)=>{
    // On client also delete the access Token
    const cookies = req.cookies;
    if (!cookies.Token) return next(new ErrorHandler("No Content", 204)); // No Content
    const refreshToken = cookies.Token;
    //Is Refresh Token in Database
    const findUser = await User.findOne({ refreshToken: refreshToken });
    if (!findUser) {
      res.clearCookie("Token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.sendStatus(204);
    }
  
    // Delete the refeshToken in db
  
    await User.findOneAndUpdate(
      { refreshToken: refreshToken },
      { refreshToken: null },
      { new: true, runValidators: true }
    );
    return res.clearCookie("Token", { httpOnly: true, sameSite: "none", secure: true }).status(200).json({ success: true, message: "Logout Succesfully" });
})
