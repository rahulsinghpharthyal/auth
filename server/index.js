// Packeages:-
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import path from 'path';

// Database Connection:-
import dbConnection from "./database/dbConnection.js";

// const __dirname = path.resolve();
const app = express();
// /
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/dist', 'index.html'));
// });
// Middleware:-
import { errorMiddleware } from "./middlewares/error.js";
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: ['http://localhost:5173', 'https://api.cloudinary.com'], // Replace with your Vite app's URL
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}));


// Routes:-

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import authenticateRoute from "./routes/authenticateRoute.js";
import getRefreshTokenRoute from "./routes/refreshTokenRoute.js";

app.use("/api/auth", authenticateRoute);
app.use("/api/auth", getRefreshTokenRoute)
app.use("/api/auth", authRoute);
app.use("/api/auth", userRoute);



app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server started at port no. ${PORT}`);
});
