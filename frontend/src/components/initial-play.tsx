import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { PlayerInput } from "./player-input"

export const InitialPlay = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Tic Tac Toe Game</CardTitle>
        <CardDescription>Please enter the names for both players to begin your game of Tic Tac Toe.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PlayerInput />
      </CardContent>
    </Card>
  )
}