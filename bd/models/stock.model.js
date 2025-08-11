import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
    availableQty: {
        type: Number,
        required: true
    }
}); 

const Stock = mongoose.model("Stock", stockSchema);

export default Stock
