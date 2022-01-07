import express, { NextFunction } from 'express';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '.env') });
import cors from 'cors';

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// import cors from "cors"



// const cors1 = require('./middlewares/cors');

const auth = require( './routes/auth' );
const admin = require( './routes/admin' );
const customer = require( './routes/customer' );

// Middleware

const PORT = process.env.PORT || 8000;

const app = express( );

app.use(cors({ origin: "*", credentials: true }))

// Using bodyParser
app.use( bodyParser.json( ) );
app.use( express.urlencoded( { extended: true } ) );


// Adding cors middleware
// app.use( cors );


app.use( '/auth', auth );
app.use( '/admin', admin );
app.use( '/customer', customer ); 


mongoose
    .connect( process.env.MONGO_URI )
    .then( ( res: any ) => {
        console.log( 'connected' );
        try {

            app.listen( PORT );
        
        }
        catch( err: any ) {

            console.log( 'Error while listening', err );

        }
    } )
    .catch( ( err: Error ) => {

        console.log( 'error while connecting to db', err );

    } )





