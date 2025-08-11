import Stock from "../models/stock.model.js";

export const getStock = async (req, res) => {
  try {
    const stock = await Stock.findOne();
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json(stock);
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const initStock = async () => {
  try {
    const stock = await Stock.findOne();
    if (!stock) {
      await Stock.create({ availableQty: 100 });
      console.log("Stock initialized with 100 kg");
    }
  } catch (error) {
    console.error("Error initializing stock:", error);
  }
};

