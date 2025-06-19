export const Header = () => {
  return (
    <header className="flex flex-col bg-slate-900 border-[#724cf950] items-center justify-between gap-4 backdrop-blur-md shadow-lg px-6 py-3">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2 text-white">
          <h1 className="text-2xl font-bold">Tic Tac Toe - Game</h1>
        </div>
      </div>
    </header>
  )
}