import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/db.js';
import { initStock } from './controller/stock.controller.js';

import stockRoutes from './routes/stock.route.js';
import orderRoutes from './routes/order.route.js';

dotenv.config();
db();
initStock();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup
app.use(cors({
  origin: "https://toya-farms.vercel.app", 
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/stock", stockRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
