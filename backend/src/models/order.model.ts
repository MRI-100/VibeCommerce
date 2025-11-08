
import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  items: { productId: mongoose.Types.ObjectId; qty: number }[];
  total: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      qty: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>("Order", OrderSchema);
