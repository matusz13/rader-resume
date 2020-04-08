const router = require('express').Router();
const ShortenerController = require('./ShortenerController');
const TwitterController = require('./TwitterController');
const TestController = require('./TestController');

var bodyParser = require('body-parser')

router.use(bodyParser.json());

router.route('/newShortenURL', )
       .post(ShortenerController.addShortUrl);

router.route('/short_id', )
       .post(ShortenerController.findShortUrl);

router.route('/geotweet', )
       .post(TwitterController.getGeoTweets);

router.route('/test', )
       .post(TestController.getAnswer);
   
   

module.exports = router;
