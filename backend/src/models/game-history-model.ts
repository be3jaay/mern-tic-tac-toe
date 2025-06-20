import mongoose, { Document, Schema } from "mongoose";

export interface IGameHistoryList extends Document {
  _id: string;
  date: Date;
  player1: string;
  player2: string;
  winner: string;
  moves: number;
}

const gameHistoryListSchema = new Schema<IGameHistoryList>({
  _id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  winner: {
    type: String,
    required: true,
  },
  moves: {
    type: Number,
    required: true,
  },
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
});

gameHistoryListSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model<IGameHistoryList>(
  "GameHistoryList",
  gameHistoryListSchema
);
