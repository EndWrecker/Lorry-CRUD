import mongoose, { Schema } from "mongoose";
import transactionSchema from "./transaction";
const driverSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.models.Driver || mongoose.model("Driver", driverSchema);

export default Driver;
