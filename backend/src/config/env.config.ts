import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mockEcomTS",
  PORT: process.env.PORT || 5000
};
