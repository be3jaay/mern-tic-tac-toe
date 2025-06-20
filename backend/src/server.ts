import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import gameHistoryRoutes from "./routes/v1/game-history-routes";
import cors from "cors";
import { deleteAllGameHistory } from "./controller/game-history-controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.APP_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/game-history-list", gameHistoryRoutes);
app.use("/api/v1/game-delete-all", deleteAllGameHistory);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
