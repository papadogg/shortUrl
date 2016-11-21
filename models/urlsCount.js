var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var urlsCount = new Schema({
    name: String,
    count: Number
});

var UrlsCount = mongoose.model('UrlsCount', urlsCount);

module.exports = UrlsCount;