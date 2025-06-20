import axios from "axios";
const BASE_API_URL = import.meta.env.VITE_LOCAL_BASE_URL;

export class GameHistoryService {
  public static async fetchGameHistory(): Promise<TGameHistoryResponse[]> {
    try {
      const response = await axios.get<TGameHistoryResponse[]>(
        `${BASE_API_URL}/v1/game-history-list`
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return [];
    }
  }

  public static async createGameHistory(gameHistory: TGameHistoryParams) {
    try {
      const response = await axios.post<TGameHistoryParams>(
        `${BASE_API_URL}/v1/game-history-list`,
        gameHistory
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  public static async deleteGameHistory(id: string) {
    try {
      const response = await axios.delete<TGameHistoryResponse>(
        `${BASE_API_URL}/v1/game-history-list/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  public static async deleteAllGameHistory() {
    try {
      const response = await axios.delete(`${BASE_API_URL}/v1/game-delete-all`);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
