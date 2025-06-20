import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { InitialPlay } from "./initial-play"
import { useGameState } from "@/hooks/use-game-state"

export const TicTacToe = () => {
  const {
    gameBoard,
    player1,
    player2,
    playerTurns,
    isGameOver,
    winner,
    winningLine,
    currentSymbol,
    handlePlayerTurn,
    countPlayer1Wins,
    countPlayer2Wins,
    countDraw,
    handleResetGame,
    handleStopGameSession
  } = useGameState();

  if (!player1 || !player2) {
    return (
      <InitialPlay />
    )
  }

  return (
    <Card className="rounded-3xl shadow-2xl border-0 bg-white/80 backdrop-blur-md">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl font-poppins font-extrabold text-pink-600 drop-shadow">Tic Tac Toe Game</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center space-y-2">
          {!isGameOver ? (
            <p className="text-lg font-bold text-blue-600 animate-pulse">{playerTurns}'s turn <span className="text-2xl">({currentSymbol})</span></p>
          ) : winner ? (
            <p className="text-2xl font-extrabold text-green-600 animate-bounce">{winner === "🤖" ? player1 : player2} wins! 🎉</p>
          ) : (
            <p className="text-2xl font-extrabold text-yellow-600 animate-pulse">It's a draw! 🤝</p>
          )}
        </div>
        <div className="mx-auto max-w-xs md:max-w-md">
          <div className="grid grid-cols-3 aspect-square gap-2 bg-gradient-to-br from-pink-100 via-blue-50 to-yellow-50 rounded-2xl p-2 shadow-inner">
            {gameBoard.map((value, index) => {
              const isWinningCell = winningLine.includes(index);
              return (
                <Button
                  key={index}
                  onClick={() => handlePlayerTurn(index)}
                  variant="outline"
                  className={`aspect-square text-5xl font-extrabold h-24 w-24 md:h-28 md:w-28 p-0 rounded-xl transition-all duration-200 shadow-md border-2 border-pink-300 hover:bg-pink-200/70 active:scale-95 ${isWinningCell ? "bg-green-400/80 text-white animate-pulse shadow-lg scale-105" : ""}`}
                  disabled={!!value || isGameOver}
                >
                  {value}
                </Button>
              )
            })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-center mt-4">
          <div className="space-y-1 bg-blue-100/60 rounded-xl py-2 shadow">
            <p className="text-2xl">🤖</p>
            <p className="text-sm text-blue-700 font-semibold">Player {player1} Wins</p>
            <p className="text-3xl font-extrabold text-blue-700">{countPlayer1Wins}</p>
          </div>
          <div className="space-y-1 bg-pink-100/60 rounded-xl py-2 shadow">
            <p className="text-2xl">👽</p>
            <p className="text-sm text-pink-700 font-semibold">Player {player2} Wins</p>
            <p className="text-3xl font-extrabold text-pink-700">{countPlayer2Wins}</p>
          </div>
        </div>
        <div className="text-center mt-2">
          <div className="space-y-1 bg-yellow-100/60 rounded-xl py-2 shadow inline-block px-6">
            <p className="text-2xl">🤝</p>
            <p className="text-sm text-yellow-700 font-semibold">Draws</p>
            <p className="text-3xl font-extrabold text-yellow-700">{countDraw}</p>
          </div>
        </div>
        {isGameOver && (
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-4 mt-4">
            <Button variant="destructive" className="rounded-xl shadow hover:scale-105 transition-all" onClick={handleStopGameSession}>Stop the Game Session</Button>
            <Button className="rounded-xl bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold shadow hover:scale-105 transition-all" onClick={handleResetGame}>Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}