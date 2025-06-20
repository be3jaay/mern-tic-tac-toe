import GameHistoryList, {
  IGameHistoryList,
} from "../models/game-history-model";
import { v4 as uuidv4 } from "uuid";

export class GameHistoryService {
  async createGameHistory(gameHistory: IGameHistoryList) {
    const newGameHistory = new GameHistoryList({
      ...gameHistory,
      _id: uuidv4(),
    });
    await newGameHistory.save();
    return newGameHistory;
  }

  async getGameHistory() {
    const gameHistory = await GameHistoryList.find().sort({ date: -1 });
    return gameHistory;
  }

  async deleteGameHistory(id: string) {
    const gameHistory = await GameHistoryList.findByIdAndDelete(id);
    return gameHistory;
  }
  async deleteAllGameHistory() {
    await GameHistoryList.deleteMany({});
    return [];
  }
}
