import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function TableSkeleton({ columns, rows = 5 }: { columns: number; rows?: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="max-w-sm w-48 h-9 bg-muted rounded mr-4" />
        <div className="ml-auto w-32 h-9 bg-muted rounded" />
      </div>
      <div className="rounded-md border animate-pulse">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, idx) => (
                <TableHead key={idx}>
                  <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <div className="h-4 bg-muted rounded w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm h-4 bg-muted rounded w-32" />
        <div className="space-x-2 flex">
          <div className="w-16 h-8 bg-muted rounded" />
          <div className="w-16 h-8 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}