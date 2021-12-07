import express, { Request, Response, NextFunction } from 'express';

// controllers
const customer = require( '../controllers/customer' );

// middleware


const router = express.Router( );
// routings

// 1. Testing route
router.get( '/', ( req: Request, res: Response, next: NextFunction ) => {

    console.log( 'Customer Testing Route' );

} );

// 2. Fetch All Properties -done
router.get( '/all-properties', customer.fetchAllProperties );


// 3. Contact us -done
router.post( '/contact', customer.postCustomer );

//4. Contact 
router.put( '/contact-us', customer.addContact );


module.exports = router;
