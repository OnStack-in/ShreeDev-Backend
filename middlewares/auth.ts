import { NextFunction, Request, Response } from 'express';

const jwt = require( 'jsonwebtoken' );

module.exports = ( req: Request, res: Response, next: NextFunction ) => {
    
    // const token = req.header( 'x-auth-token' );
    console.log( req.header( 'Authorization' ) );
    const token = req.header( 'Authorization' )?.split( ' ' )[ 1 ];
    
    if ( !token ) {
    
        return res.status(401).send( { msg: 'No Token, Authorization Denied!' } );
    
    }
    try {
    
        const decoded = jwt.verify( token, process.env.JWT_SECRET );
        console.log( decoded, decoded.customer );
        req.body.userId = decoded.customer.id;
        req.body.role = decoded.customer.role;
        if ( req.body.role !== 'admin' ) {

            res.status( 402 ).send( { msg: 'You are not authorized', data: [ ] } );

        }
        else {

            next( );

        }
    
    } catch ( error ) {
    
        console.log( error );
        res.status( 401 ).send( { msg: 'Token is not Valid!' } );
    
    }
};
