
const express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

/** 
 * STRIP QUERYSTRING FROM 
 * LAST URL ELEMENT IN ARRAY
 * OF ROUTES
 */
const getPathFromUrl = function(url) {
    return url.split(/[?#]/)[0];
}

/**
 * @param {*} req 
 */
const Payload = function(req){

    console.log( 'METHOD : ', req.method );

    var url = req.url.split('/').slice(1),
        path = getPathFromUrl(url.slice(-1)[0]),
        method = req.method === 'OPTIONS' ? req.headers["access-control-request-method"].toLowerCase() : req.method.toLowerCase(),
        body = req.body;

    // REPLACE LAST ELEMENT OF ARRAY
    // IN CASE OF QUERYSTRING
    url.splice(url.length-1, 1, path);

    var result = {
        method: method,
        map: null,
        route: url.length !== 0 ? url = url : url = [],
        param: req.query,
        body: body === undefined ? body = {} : body = body,
        success: false,
        data: []
    };

    return result;

};

module.exports = Payload;