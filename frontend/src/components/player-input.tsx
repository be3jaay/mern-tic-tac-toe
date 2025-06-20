import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGameStoreValues } from "@/hooks/use-game-values"

export function PlayerInput() {
  const [open, setOpen] = useState<boolean>(false)
  const { setGameStoreValues, player1, player2 } = useGameStoreValues();
  const [localPlayer1, setLocalPlayer1] = useState<string>(player1 || "")
  const [localPlayer2, setLocalPlayer2] = useState<string>(player2 || "")
  const nameAlreadyExists = localPlayer1.toLowerCase() === localPlayer2.toLowerCase();

  const handleStartGame = () => {
    setGameStoreValues({
      player1: localPlayer1,
      player2: localPlayer2,
      winner: "",
      moves: 0,
      date: new Date(),
    });

    setOpen(false);
    setLocalPlayer1("");
    setLocalPlayer2("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Start New Game
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] space-y-6">
        <DialogHeader>
          <DialogTitle>Enter Player Names</DialogTitle>
          <DialogDescription>
            Please enter the names for both players to begin your game of Tic Tac Toe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="player1" className="font-semibold">
            Player 1 <span className="text-xs text-muted-foreground">(X)</span>
          </Label>
          <Input
            id="player1"
            placeholder="e.g. Alice"
            autoFocus
            autoComplete="off"
            value={localPlayer1}
            onChange={e => setLocalPlayer1(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="player2" className="font-semibold">
            Player 2 <span className="text-xs text-muted-foreground">(O)</span>
          </Label>
          <Input
            id="player2"
            placeholder="e.g. Bob"
            autoComplete="off"
            value={localPlayer2}
            onChange={e => setLocalPlayer2(e.target.value)}
          />
        </div>
        {nameAlreadyExists && (
          <span className="text-sm text-red-500">Player 1 and Player 2 cannot have the same name</span>
        )}
        <DialogFooter className="flex flex-row gap-2 justify-end mt-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleStartGame} disabled={!localPlayer1 || !localPlayer2 || nameAlreadyExists}>
            Start Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}