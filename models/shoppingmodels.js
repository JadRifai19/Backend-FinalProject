import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const ShoppingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
}); 

const Shopping = mongoose.model('Shopping', ShoppingSchema);
export default Shopping;