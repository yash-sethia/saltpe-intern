const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        name: {
            type: String
        },
        created_at: { 
            type: Date,
            default: Date.now()
        }
    }
);


const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;