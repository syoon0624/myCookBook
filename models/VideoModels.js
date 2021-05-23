var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentsSchema = new Schema({
  content: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  product_id: Number,
});

module.exports = mongoose.model('comments', CommentsSchema);
