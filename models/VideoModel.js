var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VideoSchema = new Schema({
  categori: String,
  id: Number,
  title: String,
  video_id: String,
  urls: String,
});

module.exports = mongoose.model('videos', VideoSchema);
