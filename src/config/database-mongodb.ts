import config from "./config";

/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
import process from "process";
import mongoose from "mongoose";
const con = config[process.env.NODE_ENV!];

const MongoDB = async (): Promise<void> => {
 try {
  await mongoose.connect(con?.mongo_uri);
  console.log("✅ MongoDB connected");
 } catch (error) {
  console.error("MongoDB connection error:", error);
  process.exit(1);
 }
};

export default MongoDB;
