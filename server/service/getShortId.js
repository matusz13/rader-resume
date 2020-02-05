var express = require('express');
var router = express.Router();
var shortURL = require('../db/model/shortUrl_model.js');
var dns = require('dns');
var nanoid = require('nanoid');


/* POST short url. */
 var shortid = {
     find: function(req, res, next) {
         
        const shortId = req.body.url.pathname.substring(1).slice(0, -1);
        console.log("short url : "+ shortId);
  
        shortURL.findOne({short_id: shortId}, function(err, data) {
        if (err) return console.error(err);
      
        console.log("short url found: "+ data.original_url);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ url: data.original_url }));
        });
     }
 };
 


module.exports = shortid;
