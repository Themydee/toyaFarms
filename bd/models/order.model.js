import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
name: {
   type: String, 
   required: true,
},
 phone: {
   type: String,
   required: true,
},

quantity: {
    type: Number,
},

  createdAt: { 
    type: Date, 
    default: Date.now 
}
}); 
 const Order = mongoose.model("Order", orderSchema);

 export default Order
