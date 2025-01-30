import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";
dotenv.config();
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

import { errorMiddleware } from "./middlewares/error.js";
import authRoute from "./routes/authRoute.js";

app.use("/api/auth", authRoute);



app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server started at port no. ${PORT}`);
});
