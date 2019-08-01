'use strict';

/**
 * OBJECT: ROOT ROUTING HANDLER
 * Author: James Van Leuven <james@bookt.in>
 * Initial Build: 2019-08-01 14:24:00
 * Modules: SYSTEM
 */

const http = require('http'),
    express = require('express'),
    session = require('express-session'),
    MessagingResponse = require('twilio').twiml.MessagingResponse,
    router = express.Router(),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

const  Payload = require('../database/payload'),
    authRoute = require('../auth'),
    apiRoute = require('./api');

module.exports = function (app) {

    // HEADERS HANDLER
    app.use(function(req, res, next){

        console.log( 'request: , ', req );
        console.log( '**********************************' );
        console.log( 'response: , ', res );
        console.log( '**********************************' );

        app.use(logger('dev')).use(bodyParser.json());

        const origin = req.headers.origin;
        // WE NEED TO PULL THESE FROM THE DB 
        const allowed = [
            'http://localhost:3000',
            'http://localhost:5001',
            'http://localhost:9000'
        ];

        console.log( 'origin: ', origin );
        console.log( 'allowed: ', allowed.indexOf(origin) );

        if(allowed.indexOf(origin) > -1){
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        }
        else{
            throw new Error( "Permission Denied!" );
        }


        next();

    });


    app.use(session({
        secret: 'anything-you-want-but-keep-secret',
        saveUninitialized: true,
        resave: true
    }));

    app.use('/sms', function(req, res, next){

        console.log( 'REQUEST: ', req );

        let smsCount = req.session.counter || 0;
        let message = 'Hello, thanks for the new message.';

        if(smsCount > 0) {
            message = 'Hello, thanks for message number ' + (smsCount + 1);
        }

        req.session.counter = smsCount + 1;

        const twiml = new MessagingResponse();
        twiml.message(message);

        console.log( 'TWIML: ', twiml );

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        next();

    });
    
    // API HANDLER
    app.use('/api', function(req, res, next){

        let payload = new Payload(req);
        payload.map = 'api';

        return( apiRoute[payload.method](req, res, next) );
        next();
        
    });
    
    // AUTHENTICATION HANDLER
    app.use('/auth', function(req, res, next){

        let payload = new Payload(req);
        payload.map = 'auth';

        return( authRoute[payload.route.slice(-1)[0]](req, res, next) );
        next();
        
    });
    
};