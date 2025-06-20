import { Router } from "express";
import {
  createGameHistory,
  deleteAllGameHistory,
  deleteGameHistory,
  getGameHistory,
} from "../../controller/game-history-controller";

const router = Router();

router.post("/", createGameHistory);
router.get("/", getGameHistory);
router.delete("/:id", deleteGameHistory);

export default router;
