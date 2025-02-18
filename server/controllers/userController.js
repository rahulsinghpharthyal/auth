import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const updateUser = catchAsyncError(async (req, res, next) => {
  const { userId } = req.user;
  const { username, email, password, profileImg } = req.body;
  const {id} = req.params;
  console.log(id);

  if (id !== userId)
    return next(new ErrorHandler("Please update your account", 401));
  if (password) {
    var hashedPassword = await bcrypt.hash(password, 10);
  }
  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        username,
        email,
        password: hashedPassword,
        profileImg,
      },
    },
    {new: true, runValidators: true}
  );

  const {password: pwd, refreshToken: rfr, ...rest} = updateUser._doc;

  return res.status(200).json({data: rest, message: 'User updated Successfully'})
});
