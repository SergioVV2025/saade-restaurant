import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado correctamente a MongoDB!!!");
  } catch (error) {
    console.error("Error conectándose a MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
