const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
        sender: {
            type: String,
            required: true,
            minlength: 16,
            maxlength: 16,
        },
        receiver: {
            type: String,
            required: true,
            minlength: 16,
            maxlength: 16
        },
        amount: {
            type: Number,
            required: true
        },
        created_at: { 
            type: Date,
            default: Date.now()
        }
    }
);


const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;