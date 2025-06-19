import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { useGameStoreValues } from "@/hooks/use-game"
import { useState } from "react"
import { InitialPlay } from "./initial-play"
import type { TGameStoreValues } from "@/store/game-store"
import { useCreateGameHistory } from "@/(features)"

export const TicTacToe = () => {
  const { createGameHistoryCb } = useCreateGameHistory()
  const { player1, player2 } = useGameStoreValues();
  const [countMoves, setCountMoves] = useState<number>(0);
  const [gameBoard, setGameBoard] = useState<string[]>(Array(9).fill(null));
  const playerTurns = countMoves % 2 === 0 ? player1 : player2;
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winningMoves, setWinningMoves] = useState<number[][]>([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

  if (!player1 || !player2) {
    return (
      <InitialPlay />
    )
  }

  const handlePlayerTurn = (index: number) => {
    const newGameBoard = [...gameBoard];
    console.log("newGameBoard", newGameBoard);
    newGameBoard[index] = "X";
    setGameBoard(newGameBoard);
    setCountMoves(countMoves + 1);
  }

  async function handleAddGameToHistory(values: TGameStoreValues) {
    try {
      await createGameHistoryCb({
        date: new Date().toISOString(),
        player1: values.player1,
        player2: values.player2,
        duration: 2,
        moves: values.moves,
        winner: values.winner,
      })
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Tic Tac Toe Game</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">{playerTurns}'s turn ({countMoves % 2 === 0 ? "X" : "O"})</p>
        </div>

        <div className="mx-auto max-w-xs">
          <div className="grid grid-cols-3 gap-2 aspect-square">
            {gameBoard.map((value, index) => (
              <Button key={index} onClick={() => handlePlayerTurn(index)} variant="outline" className="aspect-square border border-pink-300 text-4xl font-bold h-20 w-20 p-0">
                {value}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Player {player1} Wins</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Player {player2} Wins</p>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>

        <div className="text-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Draws</p>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
        {isGameOver && (
          <div className="flex flex-row gap-4 justify-center">
            <Button >Play Another Game</Button>
            <Button onClick={() => { }}>Reset Game</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}