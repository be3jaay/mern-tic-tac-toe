import { Router } from "express";
import {
  createGameHistory,
  deleteGameHistory,
  getGameHistory,
  truncateGameHistory,
} from "../controller/game-history-controller";

const router = Router();

router.post("/", createGameHistory);
router.get("/", getGameHistory);
router.delete("/:id", deleteGameHistory);
router.delete("/truncate", truncateGameHistory);

export default router;
