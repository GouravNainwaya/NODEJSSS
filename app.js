import mongoose, { connect } from "mongoose";
import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from 'cors'
export const app = express();

config({
  path: './data/config.env'
})
// using middle ware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['PUT', 'PATCH', 'DELETE', 'POST'],
  credentials: true
}));
// using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice Working");
});

// using error errorMiddleWare
app.use(errorMiddleWare);
