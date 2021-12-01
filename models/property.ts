import mongoose, { Schema } from 'mongoose';

const propertySechema: Schema = new Schema( {

    type: {
        type: String,
        required: true
    },
    subType: {
        type: String,
        required: true
    },

    propertyName: {
        type: String,
        required: true
    },
    description: [ {
    
        type: String
    
    } ],
    address: {
        type: String,
        required: true
    },
    addressMapLink: {
        type: String
    },
    amenties: [ {
        type: String
    } ],
    nearbyLocation: {
        type: String
    },
    videoLink: [ {
        type: String
    } ],
    imageLink: [ {
        type: String
    } ]

} );

module.exports = mongoose.model( 'Property', propertySechema );
