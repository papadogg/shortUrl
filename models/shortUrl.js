var mongoose = require('mongoose');
var validators = require('mongoose-validators');

var Schema = mongoose.Schema;

var shortUrlSchema = new Schema({
    id: Number,
    url: {
        type: String,
         validate: validators.isURL({
             require_protocol: true
         })
         }
});

var ShortUrls = mongoose.model('ShortUrls', shortUrlSchema);

module.exports = ShortUrls;