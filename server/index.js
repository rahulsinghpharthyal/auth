// Packeages:-
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Database Connection:-
import dbConnection from "./database/dbConnection.js";

const app = express();

// Middleware:-
import { errorMiddleware } from "./middlewares/error.js";
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: ['http://localhost:5173'], // Replace with your Vite app's URL
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}));


// Routes:-

import authRoute from "./routes/authRoute.js";
import authenticateRoute from "./routes/authenticateRoute.js";
import getRefreshTokenRoute from "./routes/refreshTokenRoute.js";

app.use("/api/auth", authenticateRoute);
app.use("/api/auth", getRefreshTokenRoute)
app.use("/api/auth", authRoute);



app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server started at port no. ${PORT}`);
});
