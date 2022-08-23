const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    productCode: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('products', productSchema)
module.exports = Product