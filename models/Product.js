import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: [String], default: [] },
  category: { type: String, default: '' },
  date: { type: Number }
}, { minimize: false });

const Product = mongoose.models.Product || mongoose.model('product', productSchema);

export default Product;


