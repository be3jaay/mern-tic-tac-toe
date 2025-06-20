import { Request, Response } from "express";
import { GameHistoryService } from "../services/game-history-service";
import { IGameHistoryList } from "../models/game-history-model";
import { StatusCodes } from "http-status-codes";

export const createGameHistory = async (req: Request, res: Response) => {
  const gameHistoryService = new GameHistoryService();
  try {
    const { date, winner, moves, player1, player2 } = req.body;
    const gameHistory = await gameHistoryService.createGameHistory({
      date,
      winner,
      moves,
      player1,
      player2,
    } as IGameHistoryList);
    res.status(StatusCodes.CREATED).json(gameHistory);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const getGameHistory = async (req: Request, res: Response) => {
  const gameHistoryService = new GameHistoryService();

  try {
    const gameHistory = await gameHistoryService.getGameHistory();
    if (!gameHistory || gameHistory.length === 0) {
      res.status(StatusCodes.OK).json([]);
    }

    res.status(StatusCodes.OK).json(gameHistory);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const deleteGameHistory = async (req: Request, res: Response) => {
  const gameHistoryService = new GameHistoryService();

  try {
    const { id } = req.params;
    const gameHistory = await gameHistoryService.deleteGameHistory(id);
    res.status(StatusCodes.OK).json(gameHistory);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const deleteAllGameHistory = async (req: Request, res: Response) => {
  const gameHistoryService = new GameHistoryService();

  try {
    const gameHistory = await gameHistoryService.deleteAllGameHistory();
    res.status(StatusCodes.OK).json(gameHistory);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
