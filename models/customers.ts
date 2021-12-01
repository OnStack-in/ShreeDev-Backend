import mongoose, { Schema } from 'mongoose';

const customerSchema: Schema = new Schema( {

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    pincode: {
        type: String
    },
    isContacted: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        select: false
    },
    role: {
        type: String,
        default: 'customer'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        expires: '1m'
    },
    interestedPropertyId: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }

} );

module.exports = mongoose.model( 'Customer', customerSchema );