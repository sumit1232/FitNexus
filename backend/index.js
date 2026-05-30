const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
"https://fitnexus-sandy.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.set("view engine", "ejs");
app.set("views", "./views");

const connectDB = require("./config/db.js");
connectDB();

const userRouter = require("./routes/userRoutes.js");
app.use("/api/users", userRouter);

const memberRouter = require("./routes/memberRoutes.js");
app.use("/api/members", memberRouter);

const trainerRouter = require("./routes/trainerRoutes.js");
app.use("/api/trainers", trainerRouter);

const dashboardRouter = require("./routes/dashboardRoutes.js");
app.use("/api/dashboard", dashboardRouter);

const planRoutes = require("./routes/planRoutes");
app.use("/api/plans", planRoutes);

const workoutRoutes = require("./routes/workoutRoutes");
app.use("/api/workouts", workoutRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});