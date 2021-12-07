import mongoose, { Schema } from 'mongoose';

const contactSechema: Schema = new Schema( {

    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    sell: {
        type: Boolean,
        required: true,
        default: false
    }

} );

module.exports = mongoose.model( 'Contact', contactSechema );
