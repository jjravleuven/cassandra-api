'use strict';

/**
 * OBJECT: USER HANDLER
 * Created: 2018-04-20 20:31:00
 * Author: James Mendham <james@bookt.in>
 * Modules: USERS
 */

const utils = require('../utils')

const Payload = require('../../database/payload')
const secret = require('../../database/jwtSecret').jwtSecret
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone')
const db = require('../../database')

module.exports = function(req, res, next){

    const self = this;
    const payload = new Payload(req); 
    payload.map = 'api';

    console.log( 'users.payload: ', payload );

    const paging = JSON.parse(payload.param.paging);
    const filter = JSON.parse(payload.param.filters);
    const item = payload.route.slice(-1)[0];

    let sql = 'SELECT * FROM ' + payload.method.toLowerCase();
    sql += 'Resource($1, $2, $3) AS ' + utils.isSchema(item).alias + ';';
    const params = [
        utils.isSchema(item).schema,
        utils.isSchema(item).table,
        utils.isSchema(item).alias,
        payload.param.organization,
        paging.limit,
        paging.offset
    ];

    console.log( 'SCHEMA: ', utils.isSchema(item) );
    console.log( 'SQL: ', sql );
    console.log( 'PARAMS: ', params );


    // let obj = utils.splitObj(payload.body) // split the payload params object
    // utils.countJSON(payload.body) === 0 ? obj = utils.splitObj(payload.param) : null;
    
    // const name = payload.route.slice(-1)[0] // assign table name
    // const schema = "SELECT * FROM acl." + name + "($1, $2) AS " + name + ";" // write storedProc execute
    // const keys = obj.keys // object keys array
    // const params = obj.values // object values array
    // const results = payload // assign payload to variable
    
    // console.log( 'REQUEST : ', req );
    // console.log( 'OBJ : ', obj );
    // console.log( 'NAME : ', name );
    // console.log( 'SCHEMA : ', schema );
    // console.log( 'PARAMS : ', params );
    // console.log( 'RESULTS : ', results );

    /*
    db.task(function(t){
        return t.one(schema, params).then(function(user){

            results.success = true;
            results.data = {
                token: null,
                status: 200,
                "reasonPhrase": "OK",
                message: "Successful " + payload.route[0],
                success: true,
                result: user.login
            }

            if (utils.isNull(results.data.result)){

                results.data = {
                    status: 449,
                    "reasonPhrase": "Reply With",
                    message: 'Unsuccessful ' + payload.route[0],
                    success: false,
                    result: null
                };

                res.status(results.data.status).json(results.data).end();
                next();

            }
            else{
                // BUILD JWT
                const token = user.login.user
                const jwtHeader = { typ: 'JWT', alg: 'HS512' }
                const jwtUser = { idx: jwt.sign(token.profile, secret) }
                const jwtPayload = {
                    iss: token.organization,
                    role: token.permissions,
                    user: token.profile,
                    exp: moment().add(1, 'h').utc(),
                    aud: '*.bookt.in',
                    enc: jwt.sign(secret, secret)
                }

                const userToken = {
                    header: jwtHeader, 
                    payload: jwtPayload,
                    iat: moment().utc().unix(), 
                    encoding: 'utf8'
                }

                const jsonWebToken = jwt.sign(userToken, secret)
                results.data.token = jsonWebToken;
                results.data.payload = results.data.result.user;

                delete results.data.result;
                res.status(200).json(results.data).end();
                next();

            }

        }).catch(function(error){

            console.log( '|--------------------------------------|' );
            console.log( 'db.tx.error > ', error );
            next();

        });
    });
    */

}