import { Document, model, Schema } from "mongoose";

export interface UserInt extends Document {
  discordId: string;
  round: number;
  day: number;
  timestamp: number;
}

export const User = new Schema({
  discordId: String,
  round: Number,
  day: Number,
  timestamp: Number,
});

export default model<UserInt>("user", User);