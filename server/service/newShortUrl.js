var express = require('express');
var router = express.Router();
var shortURL = require('../db/model/shortUrl_model.js');
var dns = require('dns');
var nanoid = require('nanoid');


/* POST short url. */
 var shorturl = {
     add: function(req, res, next) {
         
          let originalUrl;
          try {
            originalUrl = new URL(req.body.url);
            console.log("originalURL = " + originalUrl)
          } catch (err) {
            return res.status(200).send({ error: 'invalid URL' });
          }

          dns.lookup(originalUrl.hostname, (err) => {
            if (err) {
                console.log("hits service error nf");
              return res.status(200).send({ error: 'Address not found' });
            };
          });
          // a document instance and save to mongo
          var shortid = nanoid(7).toString();
          var sURL1 = new shortURL({ original_url: originalUrl, short_id: shortid });
          sURL1.save(function (err, sURL) {
            if (err) return console.error(err);
            console.log(sURL.original_url + " saved to shortenedURLs collection.");
          res.end(JSON.stringify({ status: '200', short_id: shortid }));
          });
     }
 };
 


module.exports = shorturl;
