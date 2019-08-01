'use strict';

/**
 * OBJECT: AUTH ROUTING HANDLER
 * Author: James Van Leuven <james@bookt.in>
 * Initial Build: 2019-08-01 14:24:00
 * Modules: SYSTEM
 */

const express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

const get = require('./get');
const post = require('./post');
const put = require('./put');
const patch = require('./patch');
const del = require('./delete');

module.exports = {

    get: function(req, res, next){ return get(req, res, next); },

    post: function(req, res, next){ return post(req, res, next); },

    put: function(req, res, next){ return put(req, res, next); },
    
    patch: function(req, res, next){ return patch(req, res, next); },

    delete: function(req, res, next){ return del(req, res, next); },
    
};