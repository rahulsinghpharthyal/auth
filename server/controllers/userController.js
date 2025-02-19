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

  return res.status(200).json({Data: rest, message: 'Profile updated Successfully'})
});


export const deleteUser = catchAsyncError(async(req, res, next)=>{
  const {id} = req.params;
  const {userId} = req.user;
  if(id !== userId) return next(new ErrorHandler("Please delete your account", 401));

  const user = await User.findOneAndDelete({_id: id});
  if (!user) {
    return next(new ErrorHandler("User not found or deletion failed", 404));
  }

  return res.status(200).json({
    success: true,
    message: "User account deleted successfully",
  });


})