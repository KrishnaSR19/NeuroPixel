import { Schema, model, models, Document, Types } from "mongoose";

// 1. Interface
export interface ITransaction extends Document {
  createdAt?: Date;
  stripeId: string;
  amount: number;
  plan?: string;
  credits?: number;
  buyer?: Types.ObjectId; // Refers to a User document
}

// 2. Schema
const TransactionSchema = new Schema<ITransaction>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  credits: {
    type: Number,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// 3. Model
const Transaction =
  models?.Transaction || model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
