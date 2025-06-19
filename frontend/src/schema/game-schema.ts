import { z } from "zod";

export const gameSchema = z.object({
  winner: z.string().min(1, { message: "Winner Name is required" }),
  player1: z.string().min(1, { message: "Player 1 Name is required" }),
  player2: z.string().min(1, { message: "Player 2 Name is required" }),
  duration: z.number().min(1, { message: "Duration is required" }),
  moves: z.number().min(1, { message: "Moves is required" }),
  date: z.date().min(new Date(), { message: "Date is required" }),
});

export type TGameSchema = z.infer<typeof gameSchema>;
