var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VideoSchema = new Schema({
  username: {
    type: String,
    required: [true, '아이디는 필수입니다.'],
  },
  password: {
    type: String,
    required: [true, '패스워드는 필수입니다.'],
  },
  displayname: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('videos', VideoSchema);
