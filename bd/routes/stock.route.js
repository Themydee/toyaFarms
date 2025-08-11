import express from 'express';
import { getStock } from "../controller/stock.controller.js";

const router = express.Router();

router.get("/", getStock);

export default router;
