var geotweet = require('../service/getGeoTweets');


var TwitterController = {
   getGeoTweets: function(req, res) {
           geotweet.find(req, res, function(err, dist) {
               if (err)
                   res.send(err);
               res.json(dist);
           });
       },
    
};

module.exports = TwitterController;