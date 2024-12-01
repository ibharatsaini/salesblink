import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URL;
const database = async () => {
  if (!DATABASE_URL) throw new Error(`Database URL is required.`);
  return mongoose.connect(DATABASE_URL, {});
};

export default database;