import { NextFunction, Request, Response, Router } from 'express';

const Property = require( '../models/property' );
const Customer = require( '../models/customers' );


exports.fetchAllProperties = async (req: Request, res: Response, next: NextFunction) => {

    Property.find( )
    .then( ( data: any ) => {

        console.log( 'fetched all properties' );
        res.status( 200 ).send( { msg: 'ok', data: data } );        
    
    } )
    .catch( ( err: Error ) => {
    
        console.log( 'error while fetching customer ', err );
        res.status( 500 ).send( { msg: 'Internal server error!', data: [ ] } );
    
    } );

}


exports.postCustomer = async ( req: Request, res: Response, next: NextFunction ) => {

    const { phone, name, propertyId } = req.body;

    Customer.findOne( { phone: phone } )
    .then( async ( data: any ) => {

        if ( data ) {

            res.status( 200 ).send( { msg: 'ok', data: [ { 'shreeDevVerified': true } ] } );

        }
        else {

            const customer = new Customer( { 
                name: name,
                phone: phone,
                interestedPropertyId: propertyId
            } );

            const updated = await customer.save( );
            return updated;
        }

    } )
    .then( ( data: any ) => {

        res.status( 200 ).send( { msg: 'ok', data: [ { 'shreeDevVerified': true } ] } );

    } )
    .catch( ( err: Error ) => {
        
        console.log( 'Error while posting customer', err );
        res.status( 500 ).send( { msg: 'Unknown error', data: [ ] } );

    } );

}