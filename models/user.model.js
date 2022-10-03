const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        accountNo: {
            type: String,
            required: true,
            minlength: 16,
            maxlength: 16,
            unique: true
        },
        role: {
            type: String,
            required: true,
            defualt: "user",
        },
        balance: {
            type: Number,
            default: 0,
            min: 0,
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;