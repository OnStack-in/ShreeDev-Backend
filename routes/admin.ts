import express, { Request, Response, NextFunction } from 'express';

// controllers
const adminController = require( '../controllers/admin' );

// middleware
const auth = require( '../middlewares/auth' );


const router = express.Router( );
// routings

// 1. Testing route
router.get( '/', ( req: Request, res: Response, next: NextFunction ) => {

    console.log( 'Admin Testing Route' );

} );

// 2. Signin
router.put( '/signin', adminController.signin );

// 3. Fetch All Properties -- done -checked
router.get( '/all-properties', auth, adminController.fetchAllProperties );


// 4. Add single Property -- done -checked
// Payload
// {
//     type, subType, propertyName, description, address, addressMapLink, amenties, nearbyLocation, videoLink, imageLink   
// }
router.put( '/property', auth, adminController.addProperty );

// 5. Edit single Property -- done -checked
// Payload
// {
//     userId,
//     _id, type, subType, propertyName, description, address, addressMapLink, amenties, nearbyLocation, videoLink, imageLink 

// }
router.patch( '/property/:id', auth, adminController.editProperty );


// 6. Delete single property -- done -checked
// payload
// {
//     propertyId in param
// }
router.delete( '/property/:id', auth, adminController.deleteProperty );

// 7. Fetch all customers -- done
router.get( '/all-customers', auth, adminController.fetchCustomers );



// 8. Toggle contacted server ( true/false ) -- done -checked
// Payload
// {
//     id in params
// }
router.post( '/customer/:id', auth, adminController.toggleContacted );

module.exports = router;
