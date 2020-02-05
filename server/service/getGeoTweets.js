var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var config = require('../config/twittercfg.js');

/* GET geographic tweets. */
 var geotweets = {
     find: function(req, res, next) {
         const hashtag = req.body.hashtag;
         const lng = req.body.lng;
         const lat = req.body.lat;
        
         var T = new Twitter(config);
         console.log("twitter connect");
        //const shortId = req.body.url.pathname.substring(1).slice(0, -1);
        let loc = lat +","+lng+",10km";
        let qstring = "#+="+ hashtag +" since:7 days AND -filter:retweets AND -filter:replies";
        T.get('search/tweets', {  q: qstring, geocode: loc, count: 50 },       
              function (err, data, response) {
                if(!err) { 
                    console.log("got statuses" + data.statuses.length);
                    res.send(data.statuses);
                }
                
          })
     }
 };
 


module.exports = geotweets;
