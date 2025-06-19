import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import gameHistoryRoutes from "./routes/game-history-routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/game-history-list", gameHistoryRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
