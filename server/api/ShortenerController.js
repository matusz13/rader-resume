'use strict';

var shorturl = require('../service/newShortUrl');
var shortid = require('../service/getShortId');


var ShortenerController = {
   addShortUrl: function(req, res) {
           shorturl.add(req, res, function(err, dist) {
               if (err)
                   res.send(err);
               res.json(dist);
           });
       },
    findShortUrl: function(req, res) {
           shortid.find(req, res, function(err, dist) {
               if (err)
                   res.send(err);
               res.json(dist);
           });
       },
};

module.exports = ShortenerController;