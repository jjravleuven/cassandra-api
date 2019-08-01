'use strict';

const moment = require('moment');

module.exports = {

    /**
     * PARSE SCHEMA
     * ************
     * THIS WILL BE CONVERTED
     * INTO A DB TABLE LATER
     * 2018-04-21
     */
    isSchema: function(item, idx){

        const type = [
            'reporting',
            'resource',
            'transaction'
        ];

        const schema = [
            { alias: 'logins', table: 'login', schema: 'acl', param: 'id', order: 'created Desc' },
            { alias: 'groups', table: 'group', schema: 'acl', param: 'id', order: 'name Asc' },
            { alias: 'roles', table: 'role', schema: 'acl', param: 'id', order: 'name Asc' },
            { alias: 'users', table: 'user', schema: 'crm', param: 'org_id', order: 'lname Asc' },
            { alias: 'clients', table: 'organization', schema: 'crm', param: 'org_id', order: 'name Asc' },
            { alias: 'projects', table: 'project', schema: 'pms', param: 'org_id', order: 'created Desc' },
            { alias: 'questions', table: 'question', schema: 'pms', param: 'project_id', order: 'ordinal Asc' },
            { alias: 'respondents', table: 'respondent', schema: 'pms', param: 'project_id', order: 'created Desc' },
            { alias: 'cities', table: 'city', schema: 'public', param: null, order: null },
            { alias: 'states', table: 'state', schema: 'public', param: null, order: null },
            { alias: 'provinces', table: 'state', schema: 'public', param: null, order: null },
            { alias: 'province', table: 'state', schema: 'public', param: null, order: null },
        ];
        const obj = function(x) { return Object.keys(x).map(function(k){return x[k]}) };
        const map = schema.filter(function(x) { return obj(x).indexOf(item) > -1 });

        map[0].type = type[idx];
        return map[0];

    },

    /** 
     * CHECK IF ISNULL VALUE
     */
    isNull: function(val){ return !val; },

    /** 
     * @params data
     * split JSON key value pairs into 
     * two arrays of keys and values
     */
    splitObj: function(data){ 
        let keys = [], vals = [];
        for(var l in data){
            if( data.hasOwnProperty(l) ){ keys.push(l); vals.push(data[l]); }
        }
        return { keys: keys, values: vals };
    }, 
    
	/**
	 * EXISTS IN ARRAY 
	 */
	existsInArray: function(arr,obj) {
    	return (arr.indexOf(obj) !== -1);
	},
	
	/**
	 * capitalise every word in a string
	 * split on ' ' to handle special characters
	 */
	stringCapitalise: function( str ){

	   var splitStr = (str).toLowerCase().split(' ');
	   for (var i = 0; i < splitStr.length; i++) {
		   // You do not need to check if i is larger than splitStr length, as your for does that for you
		   // Assign it back to the array
		   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	   }
	   // Directly return the joined string
	   return splitStr.join(' '); 

	},
    
    // SORT ARRAY OBJECTS BY KEY
    sortByKey: function(array, key){
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },
    
    // REMOVE NaN, null, 0, false
    removeEmpty: function(arr) {
        var filteredArray = arr.filter(Boolean);
        // console.log( 'FILTERED-ARRAY >>> ', filteredArray );
        return filteredArray;
    },
    
    /**
     * REPLACE JAVASCRIPT typeOf
     * toType({a: 4}); //"object"
     * toType([1, 2, 3]); //"array"
     * (function() {// console.log(toType(arguments))})(); //arguments
     * toType(new ReferenceError); //"error"
     * toType(new Date); //"date"
     * toType(/a-z/); //"regexp"
     * toType(Math); //"math"
     * toType(JSON); //"json"
     * toType(new Number(4)); //"number"
     * toType(new String("abc")); //"string"
     * toType(new Boolean(true)); //"boolean"
     */
    toType: function(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    },
    
    /**
     * isNaN
     */
    isNaN: function(value) {
        return Number.isNaN(Number(value));
    },
    
    /**
     * COUNT JSON OBJECT KEY/VALUE PAIRS 
     */
    countJSON : function(obj) { 
        return Object.keys(obj).length; 
    },
    
    /**
     * ENCODE: BASE64 ENCODE FROM UTF-8
     * DECODE: UTF-8 DECODE FROM BASE64
     * 
     * BASE64 BETWEEN NODEJS & BROWERS MUST
     * BE MARKED AS BINARY OR NON-ASCII 
     * CHARACTERS WILL NOT DECODE CORRECTLY
     * LOCKING OUT THE ABILITY TO DECODE
     * THE JWT AUTHENTICATION TOKEN
     */
    // BROWSER
    // stringEncode: function( str ){ var encodedString = window.btoa(encodeURI(str)); return encodedString; },
    // stringDecode: function( str ){ var decodedString = decodeURI(window.atob(str)); return decodedString; }

    // SERVER
    stringEncode: function( str ){ var encodedString = Buffer.from(str, 'binary').toString('base64'); return encodedString; },
    stringDecode: function( str ){ var decodedString = Buffer.from(str, 'base64').toString('binary'); return decodedString; }

};
