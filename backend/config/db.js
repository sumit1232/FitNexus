const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected Success`);
  } catch (error) {
    console.log(`MongoDB Connection Failed`);
    console.log(error.message);

    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

module.exports = connectDB;