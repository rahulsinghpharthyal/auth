import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected with ${data.connection.host}`);
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

export default dbConnection;
