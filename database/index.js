'use strict';

/**
 * Author: James Mendham <james@bookt.in>
 * Created: 201*-03-17 13:39:00
 */
const cn = process.env.DATABASE_URL;

const options = {
    
    error: function(error, e){
        if( e.cn ){
            // console.log( 'POSTGRES CONNECTION (CN): ', e.cn );
            // console.log( 'POSTGRES EVENT: ', error.message || error );
            monitor.error( error, e );
        }
    },

    connect: (client, dc, isFresh) => {
        var cp = client.connectionParameters;
        console.log("Connected to database:", cp.database);
        monitor.query( client, dc, isFresh );
    },

    disconnect: function(client, dc){
        var cp = client.connectionParameters;
        console.log('Disconnecting from database: ', cp.database );
        monitor.query( client, dc );
    }

};

const monitor = require('pg-monitor');
monitor.attach(options);
const pgp = require('pg-promise')(options);
const db = pgp(cn);

// LISTENING TO SIGNIT FOR GRACEFUL SHUTDOWN

process.on('SIGINT', function() {

    db.disconnect(function(client, dc, err) {
        var cp = client.connectionParameters;
        console.log( 'client > ', client );
        console.log( 'dc > ', dc );
        console.log( 'SIGINT.ERROR > ', err );
        process.exit(err ? 1 : 0);
    });
 });

module.exports = db;