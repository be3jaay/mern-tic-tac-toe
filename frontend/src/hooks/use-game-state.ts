import { useCreateGameHistory } from "@/(features)";
import { useGameStoreValues } from "./use-game-values";
import { useState } from "react";

export const useGameState = () => {
  const { createGameHistoryCb } = useCreateGameHistory();
  const { player1, player2, setGameStoreValues } = useGameStoreValues();
  const [countMoves, setCountMoves] = useState<number>(0);
  const [gameBoard, setGameBoard] = useState<string[]>(Array(9).fill(""));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [countPlayer1Wins, setCountPlayer1Wins] = useState<number>(0);
  const [countPlayer2Wins, setCountPlayer2Wins] = useState<number>(0);
  const [countDraw, setCountDraw] = useState<number>(0);

  const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const currentSymbol = countMoves % 2 === 0 ? "🤖" : "👽";
  const playerTurns = countMoves % 2 === 0 ? player1 : player2;

  const checkWinner = (
    board: string[]
  ): { winner: string | null; winningLine: number[] } => {
    for (const combo of winningMoves) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winningLine: combo };
      }
    }
    return { winner: null, winningLine: [] };
  };

  const handlePlayerTurn = (index: number) => {
    if (gameBoard[index] || isGameOver) return;

    const newGameBoard = [...gameBoard];

    newGameBoard[index] = currentSymbol;

    setGameBoard(newGameBoard);

    const { winner: foundWinner, winningLine: foundWinningLine } =
      checkWinner(newGameBoard);

    if (foundWinner) {
      createGameHistoryCb({
        date: new Date().toISOString(),
        player1: player1 as string,
        player2: player2 as string,
        moves: countMoves,
        winner:
          foundWinner === "🤖" ? (player1 as string) : (player2 as string),
      });

      setWinner(foundWinner);
      setWinningLine(foundWinningLine);
      setIsGameOver(true);

      if (foundWinner === "🤖") {
        setCountPlayer1Wins(countPlayer1Wins + 1);
      } else if (foundWinner === "👽") {
        setCountPlayer2Wins(countPlayer2Wins + 1);
      } else {
        return;
      }
      return;
    }

    if (countMoves + 1 === 9) {
      setIsGameOver(true);
      setWinner(null);
      setCountDraw(countDraw + 1);
      createGameHistoryCb({
        date: new Date().toISOString(),
        player1: player1 as string,
        player2: player2 as string,
        moves: countMoves,
        winner: "Draw",
      });
      return;
    }
    setCountMoves(countMoves + 1);
  };

  const handleResetGame = () => {
    setGameBoard(Array(9).fill(""));
    setCountMoves(0);
    setIsGameOver(false);
    setWinner(null);
    setWinningLine([]);
  };

  const handleStopGameSession = () => {
    setGameBoard(Array(9).fill(""));
    setCountMoves(0);
    setIsGameOver(false);
    setWinner(null);
    setWinningLine([]);
    setCountPlayer1Wins(0);
    setCountPlayer2Wins(0);
    setGameStoreValues({
      player1: undefined,
      player2: undefined,
    });
  };

  return {
    countMoves,
    gameBoard,
    isGameOver,
    winner,
    winningLine,
    countPlayer1Wins,
    countPlayer2Wins,
    countDraw,
    currentSymbol,
    playerTurns,
    handlePlayerTurn,
    handleResetGame,
    handleStopGameSession,
    player1,
    player2,
  };
};
