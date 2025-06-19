import { GameHistoryTable } from "./components/game-history-table"
import { Header } from "./components/header"
import { TicTacToe } from "./components/tic-tac-toe"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

export default function TicTacToePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full  ">
        <Header />
        <main className="container mx-auto px-4 py-8 ">
          <div className="grid gap-8 lg:grid-cols-2">
            <GameHistoryTable />
            <TicTacToe />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  )
}
