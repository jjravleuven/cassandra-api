'use strict';
    
var moment = require('moment-timezone'), 
    // db = require("./database"),
    http = require('http'),
    tzFormat = 'YYYY-MM-DD[T]HH:mm:ss.SSSZZ';


module.exports = function( socket ){

    var handshake = socket.handshake, query = handshake.query, response = {};

    console.log( '|---------------------------------------------|' );
    console.log( 'SOCKET HANDSHAKE >> ', handshake );
    console.log( 'SOCKET.QUERY >> ', query );
    console.log( 'SOCKET.RESPONSE >> ', response );
    
};