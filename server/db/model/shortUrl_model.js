var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShortURLSchema = mongoose.Schema({
      original_url: String,
      short_id: String
    });
module.exports = mongoose.model('shortURL', ShortURLSchema, 'shortenedURLs');  