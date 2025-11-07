import mongoose from "mongoose";

const connectDB = async () => {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Error ❌", error.message);
    process.exit(1);
  }
};

export default connectDB;
