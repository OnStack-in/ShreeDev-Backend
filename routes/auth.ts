import express, { Request, Response, NextFunction } from 'express';



// Middleware

// Controller
const authController = require('../controllers/auth');

const router = express.Router();


router.get( '/', (req: Request, res: Response, next: NextFunction ) => {
    
    console.log( 'Auth Testing Route' );

});

router.put( '/singup', (req: Request, res: Response, next: NextFunction ) => {
    
    console.log( 'Auth Signup Route' );

});


router.post( '/login', (req: Request, res: Response, next: NextFunction ) => {
    
    console.log( 'Auth Login Route' );

});


router.post( '/logout', (req: Request, res: Response, next: NextFunction ) => {
    
    console.log( 'Auth Logout Route' );

});

//router.post( '/send-otp', (req: Request, res: Response, next: NextFunction ) => {
//    console.log(req.body)
//    console.log( 'Auth SendOTP Route' );
//    next();
//});
router.post( '/send-otp', authController.sendOTP );
router.post( '/verify-otp',authController.verifyOTP);


router.post( '/forget-password', (req: Request, res: Response, next: NextFunction ) => {
    
    console.log( 'Auth Forget Password Route' );

});


module.exports = router;

