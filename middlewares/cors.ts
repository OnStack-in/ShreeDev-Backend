import { Request, Response, NextFunction } from 'express';

module.exports = ( req: Request, res: Response, next: NextFunction) => {

    console.log('checking cors middleware', req );
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader( 'Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE' );
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Authorization,content-type,application/json');
    next( );

};
