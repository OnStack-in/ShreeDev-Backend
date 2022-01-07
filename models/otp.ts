import mongoose, { Schema } from 'mongoose';

const otpSchema: Schema = new Schema( {
    phone: {
        type: Number,
        required: true,
    },
    otp: {
        type: String,
        required: true,
        expires: '5m'
    }
} );

module.exports = mongoose.model( 'Otp', otpSchema );
