import cors from "cors";
import "express-async-errors";
import express from "express";
import dotenv from "dotenv";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  // throw new Error("error");
  res.json({ msg: "Welcome!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
