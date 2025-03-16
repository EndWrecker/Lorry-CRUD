import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    amount: Number,
    credit: Boolean,
  },
  {
    timestamps: true,
  }
);

export default transactionSchema;
