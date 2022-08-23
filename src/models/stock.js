const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const stockSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    product:{type: Schema.Types.ObjectId, ref: 'products', required: true},
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Stock = mongoose.model('stock', stockSchema)
module.exports = Stock