'use strict';

/**
 * OBJECT: AUTH REGISTER HANDLER
 * Created: 2018-03-27 15:30:00
 * Author: James Mendham <james@bookt.in>
 * Modules: AUTHENTICATION:REGISTER > Request Info
 */

const utils = require('../router/utils')
const Payload = require('../database/payload')
const secret = require('../database/jwtSecret').jwtSecret
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone')
const db = require('../database')

module.exports = function(req, res, next){

    const payload = new Payload(req); payload.map = 'auth';

    const obj = utils.splitObj(payload.body), // split the payload params object
        name = payload.route.slice(-1)[0], // assign table name
        keys = obj.keys, // object keys array
        params = obj.values, // object values array
        results = payload; // assign payload to variable

    console.log( 'obj > ', obj );
    console.log( 'name > ', name );
    console.log( 'keys > ', keys );
    console.log( 'params > ', params );
    console.log( 'results > ', results );

    return res.status(200).json(results);

}