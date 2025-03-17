import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    driverId: String,
    amount: Number,
    type: String,
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
