
import Order, { IOrder } from "../models/order.model.js";

export const createOrder = async (orderData: Partial<IOrder>): Promise<IOrder> => {
  const newOrder = new Order(orderData);
  return newOrder.save();
};
