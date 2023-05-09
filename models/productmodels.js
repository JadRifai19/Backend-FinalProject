import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ProductSchem = new Schema ({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String }
});

const Product = mongoose.model('Product', ProductSchem);
export default Product;