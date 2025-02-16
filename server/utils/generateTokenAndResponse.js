import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const generateTokensAndResponse = async (user, res) => {
  //this is payload for token creation:-
  const payload = { id: user._id };

  // Access and refresh token:-
  const accessToken = jwt.sign(payload, process.env.ACCESS_JWT_TOKEN, {
    expiresIn: "1hr",
  });
  const refreshToken = jwt.sign(payload, process.env.Refresh_JWT_TOKEN, {
    expiresIn: "4hr",
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { refreshToken: refreshToken },
    { new: true, runValidators: true }
  );

  const {
    password: userPassword,
    refreshToken: userRefreshToken,
    ...userData
  } = updatedUser._doc;

  return res
    .cookie("Token", refreshToken, {
      httpOnly: true, // Set to false for testing purposes
      secure: true, // Ensure this is false for local development without HTTPS
      sameSite: "none", // Set SameSite to None for cross-origin requests during development
      // path: '/', // Ensure the cookie is available to the entire site
      // domain: 'localhost', // Ensure the domain is correctly set for local development
      expires: new Date(Date.now() + 3600000),
    })
    .status(200)
    .json({
      Data: { ...userData, accessToken },
      message: "Logged In Successfully",
    });
};

export default generateTokensAndResponse;
