const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const otpSchema = new Schema({
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        otp: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 4
        },
        updated_at: { type: Date }
    }
);

otpSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;