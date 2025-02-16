// Middlewares:-
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// Models:-
import User from "../models/user.js";

const authenticate = catchAsyncError(async (req, res, next) => {

  const { userId } = req.user;
  console.log('this is userID', userId)
  const foundUser = await User.findOne({ _id: userId });

  if (!foundUser)
    return next(new ErrorHandler("Invalid Username and Password"));
  const user = {
    id: foundUser._id,
    name: foundUser.username,
    email: foundUser.email,
  };
  return res.status(200).json({ success: true, data: user });
});

export default authenticate;
