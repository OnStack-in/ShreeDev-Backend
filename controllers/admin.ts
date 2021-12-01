import { NextFunction, Request, Response } from 'express';

const Property = require( '../models/property' );
const Customer = require( '../models/customers' );

const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );



exports.fetchAllProperties = async (req: Request, res: Response, next: NextFunction) => {

    Property.find( )
    .then( ( data: any ) => {

        console.log( 'fetched all properties' );
        res.status( 200 ).send( { msg: 'ok', data: data } );        
    
    } )
    .catch( ( err: Error ) => {
    
        console.log( 'error while fetching customer ', err );
        res.status( 500 ).send( { msg: 'Internal server error!', data: [ ] } );
    
    } )

}


exports.addProperty = async (req: Request, res: Response, next: NextFunction) => {

    const body = req.body;
    const { type, subType, propertyName, description, address, addressMapLink, amenties, nearbyLocation, videoLink, imageLink } = body;

    let property = new Property( {
        type: type,
        subType: subType,
        propertyName: propertyName,
        description: description,
        address: address,
        addressMapLink: addressMapLink,
        amenties: amenties,
        nearbyLocation: nearbyLocation,
        videoLink: videoLink,
        imageLink: imageLink
    });

    property
        .save()
        .then( ( data: any ) => {
            console.log(data);
            res.status(200).send({
                msg: 'Ok',
                data: data
            });
        })
        .catch( ( err: Error ) => {
            console.log( 'error while creating service ', err );
            res.status(500).send( { msg: 'Internal Server error', data: [ ] } );
        });

}


exports.editProperty = async (req: Request, res: Response, next: NextFunction) => {

    const admin_id = req.body.userId;
    const id = req.params.id;

    const { type, subType, propertyName, description, address, addressMapLink, amenties, nearbyLocation, videoLink, imageLink } = req.body;

    Property.findOneAndUpdate( { _id: id }, { type, subType, propertyName, description, address, addressMapLink, amenties, nearbyLocation, videoLink, imageLink }, { new: true })
        .then( ( data: any ) => {
            console.log( 'updated: ', data );
            res.status( 200 ).send( { msg: 'ok', data: data } );
        } )
        .catch( ( error: Error ) => {
            console.log( 'error while updating', error );
            res.status( 500 ).send( { msg: 'Internal server error', data: [ ] } );
    } );

    // res.status( 402 ).send( { msg: 'Authorization error', data: [ ] } );

}

exports.deleteProperty = async ( req: Request, res: Response, next: NextFunction ) => {

    const propertyId = req.params.id;

    // Property.findOne( { _id: propertyId } )
    //     .then( ( data: any ) => {

    //         console.log( 'found!', data );
    //         if ( !data ) {
    //             res.status( 400 ).send( { msg: 'No Property found', data: [ ] } );
    //         }
    //         else {


    //         }


    //     } )
    Property.findByIdAndRemove( propertyId )
        .then( ( data: any ) => {

            console.log( 'found to delete', data );
            res.status( 200 ).send( { msg: 'Deleted Successfully!', data: [ ] });

        } )
        .catch( ( err: Error ) => {

            console.log( 'error while deleting!', err );
            res.status( 400 ).send( { msg: 'No Property found!', data: [ ] } );
 
        } )

}

exports.fetchCustomers = async (req: Request, res: Response, next: NextFunction) => {

    Customer.find( { role: 'customer' } )
        .populate( { path: 'interestedPropertyId' } )
        .then( ( data: any ) => {
            console.log( 'Fetched customers' );
            res.status( 200 ).send( { msg: 'ok', data: data } );
        } )
        .catch( ( err: Error ) => {
            console.log( 'error while fetching customer ', err );
            res.status( 500 ).send( { msg: 'Internal server error!', data: [ ] } );
        } );

};


exports.toggleContacted = ( req: Request, res: Response, next: NextFunction ) => {

    const userId = req.params.id;

    Customer.findById( userId )
        .then( async ( data: any ) => {
            console.log( 'data found for toggling', data );
            data.isContacted = true;
            const updated = await data.save( );
            return updated;            
        } )
        .then( ( data: any ) => {

            console.log( 'saved successfully toggle!', data );
            res.status( 200 ).send( { msg: 'Success', data: [ ] } );

        } )
        .catch( ( err: Error ) => {

            console.log( 'Error while toggling', err );
            res.status( 500 ).send( { msg: 'unknown error', data: [ ] } );
        
        } );

}



exports.signin = async (req: Request, res: Response, next: NextFunction) => {

    const { phone, password } = req.body;
    console.log( 'user coming ', req.body );
    let customer = await Customer.findOne( { phone: phone } ).select( '+password' );
    if ( !customer ) {
        return res.status( 401 ).send( 'Incorrect email or password.' );
    }
    else {

        if ( customer.role === 'admin' ) {
            console.log( 'customer ', customer );
            // const validPassword = await bcrypt.compare( password, customer.password );
            if ( customer.password !== password ) {
                return res.status( 401 ).send( 'Incorrect password.' );
            }
            else {
                let findal_user = await Customer.findOne( { phone: phone } ).select( '-password' );
                if ( findal_user ) {
                    const payload = {
                        customer: {
                            id: findal_user._id,
                            role: findal_user.role
                        }
                    };
                    console.log('see success', findal_user);
                    const token = await jwt.sign( payload, process.env.JWT_SECRET, {
                        expiresIn: 17208
                    });
    
                    res.status( 200 ).send( { msg: 'ok', data: [ { user: findal_user, token: token } ] } );
                } else {
                    res.status( 500 ).send( { msg: 'Internal server error', data: [ ] } );
                }
    
            }

        } else {
            res.status( 401 ).send( { msg: 'Unauthrorized Access', data: [ ] } );
        }

    }

};
