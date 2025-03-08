import express from "express";
import cors from "cors";
import { dbConnection } from "./config/dbConnection.js";
import userRouter from "./routes/user.route.js";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

dbConnection();

export default app;
