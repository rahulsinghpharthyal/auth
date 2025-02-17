// Middlewares:-
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// Packages:-
import jwt from 'jsonwebtoken';

// Models:-
import User from "../models/user.js";


const getRefreshToken = catchAsyncError(async(req, res, next)=>{
    const refreshToken = req.cookies.Token;
    if(!refreshToken) return next(new ErrorHandler('Please Login to access!', 401)); // Forbidden
    const findUser = await User.findOne({refreshToken: refreshToken}).lean();
    if(!findUser) return next(new ErrorHandler('Please Login to access!', 401)); // Forbidden
    const {password: pwd, refreshToken: rft, ...userData} = findUser;
    console.log('this is userData', userData)
    jwt.verify(refreshToken, process.env.REFRESH_JWT_TOKEN, 
        (err, decodedUser) => {
            if(err || findUser?._id.toString() !== decodedUser.id) return new ErrorHandler('Please Login to access', 401); // Forbidden
            const accessToken = jwt.sign({id: findUser?._id}, process.env.ACCESS_JWT_TOKEN, {expiresIn: '30s'})
            // console.log('accessToken', accessToken)
            return res.status(200).json({ ...userData, accessToken});
        }
    )
})

export default getRefreshToken;