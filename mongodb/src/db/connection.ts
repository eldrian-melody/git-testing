import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const Mongo_URI = process.env.MONGO_URI;
    if (!Mongo_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    console.log("Connecting to MongoDb ....");
    const db = await mongoose.connect(Mongo_URI as string, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
