// Packages:-
import jwt from "jsonwebtoken";

// Middlewares:-
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

export const isAuthenticated = catchAsyncError(async(req, res, next) => {
    const authHeaders = req.headers['authorization'] || req.headers['Authorization'];
    console.log('this is authheaer', authHeaders)
    if(!authHeaders)return next(new ErrorHandler('Please login to access', 403));
    const token = authHeaders.split(' ')[1].replace(/"/g, '');
    if(!token)return next(new ErrorHandler('JsonWebTokenError', 401));
    jwt.verify(
        token,
        process.env.ACCESS_JWT_TOKEN,
        (err, decoded) => {
            if(err) return next(new ErrorHandler('Forbidden', 403)) // Invalid Token
            req.user = {userId: decoded.id};
            next();
        }
    )
})