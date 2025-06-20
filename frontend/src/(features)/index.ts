import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GameHistoryService } from "../service/game-history-service";

export const useFetchGameHistory = (): {
  gameHistoryList: TGameHistoryResponse[];
  isLoading: boolean;
  error: Error | null;
} => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["game-history"],
    queryFn: async () => await GameHistoryService.fetchGameHistory(),
  });

  return { gameHistoryList: data, isLoading, error };
};

export const useDeleteGameHistory = (): {
  deleteGameHistoryCb: (id: string) => void;
  isPending: boolean;
  error: Error | null;
} => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (id: string) =>
      await GameHistoryService.deleteGameHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game-history"] });
    },
  });

  return { deleteGameHistoryCb: mutate, isPending, error };
};

export const useDeleteAllGameHistory = (): {
  deleteAllGameHistoryCb: () => void;
  isPending: boolean;
  error: Error | null;
} => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => await GameHistoryService.deleteAllGameHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game-history"] });
    },
  });

  return { deleteAllGameHistoryCb: mutate, isPending, error };
};

export const useCreateGameHistory = (): {
  createGameHistoryCb: (gameHistory: TGameHistoryParams) => void;
  isPending: boolean;
  error: Error | null;
} => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (gameHistory: TGameHistoryParams) =>
      await GameHistoryService.createGameHistory(gameHistory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game-history"] });
    },
  });

  return { createGameHistoryCb: mutateAsync, isPending, error };
};
