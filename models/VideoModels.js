var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VideoSchema = new Schema({
  name: String,
  title: String,
  videoId: String,
  description: String, //설명
  url: String,
});

module.exports = mongoose.model('videos', VideoSchema);
