const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productPrice: { type: String, required: true },
    productDiscountPrice: { type: String, required: true },
    productImage: { type: String, required: true },
    productLink: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
