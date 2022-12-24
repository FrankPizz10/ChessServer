import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    elo: { type: Number, required: true },
  });

export interface Player extends mongoose.Document {
    id: string;
    userName: string;
    password: string;
    elo: number;  
}