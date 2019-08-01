'use strict';

/**
 * OBJECT: AUTH ROUTING HANDLER
 * Created: 2018-03-06 13:31:00
 * Author: James Mendham <james@bootk.in>
 * Modules: SYSTEM
 */

const express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

const Login = require('./login'),
    Register = require('./register');

module.exports = {

    /**********************************************************
     * AUTH REGISTER
     */
    register: function(req, res, next){ return Register(req, res, next); },

    /**********************************************************
     * AUTH REGISTER
     */
    retrieve: function(req, res, next){

        console.log( 'auth.retrieve.payload > ', payload );
        
        return payload;

    },
    
    /**********************************************************
     * AUTH LOGIN REQUEST
     */
    login: function(req, res, next){ return Login(req, res, next); },
    
    /**********************************************************
     * AUTH LOGOUT REQUEST
     */
    logout: function(req, res, next){
        console.log( '|--------------------------------------|' );
        console.log( 'auth.logout.payload > ', payload );
        return payload;
    }
    
};