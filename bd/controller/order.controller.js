import Order from "../models/order.model.js";
import Stock from "../models/stock.model.js";

export const createOrder = async (req, res) => {
  try {
    const { name, phone, quantity } = req.body;

    // Check stock availability first
    const stock = await Stock.findOne();
    if (!stock) {
      return res.status(400).json({ error: "Stock not found" });
    }

    if (stock.availableQty < quantity) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }

    // Reduce stock
    stock.availableQty -= quantity;
    await stock.save();

    // Save order after reducing stock
    const order = await Order.create({ name, phone, quantity });

    res.json({
      message: "Order placed successfully",
      availableQty: stock.availableQty, // return updated stock to frontend
      orderId: order._id,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Server error while placing order" });
  }
};
