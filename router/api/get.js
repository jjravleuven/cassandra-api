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
    const type = payload.param.type;
    payload.map = 'api';

    console.log( 'users.payload: ', payload );

    const paging = JSON.parse(payload.param.paging);
    const filter = JSON.parse(payload.param.filters);
    const item = payload.route.slice(-1)[0];
    const legend = utils.isSchema(item, type);

    let sql = 'SELECT * FROM matview.' + payload.method.toLowerCase();
    sql += utils.stringCapitalise(legend.type);
    sql += '($1, $2, $3, $4, $5, $6, $7, $8, $9) AS ' + legend.alias + ';';
    const params = [
        legend.schema, // schema to search
        legend.alias, // module alias
        legend.table, // table to search
        legend.param, // column
        payload.param.organization, // org_id
        legend.order, // return object order
        paging.limit, // number of records
        paging.offset, // starting at record position
        null // custom filter
    ];

    console.log( 'SCHEMA: ', utils.isSchema(item, type) );
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