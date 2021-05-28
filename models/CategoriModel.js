var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriSchema = new Schema({
  title: {
    type: String,
    default: 'default',
    required: [true, '카테고리명이 비어있습니다!'],
  },
  videoNum: String,
  description: String, //설명
  created_at: {
    type: Date,
    default: Date.now(),
  },
  username: String,
});

CategoriSchema.virtual('getDate').get(function () {
  var date = new Date(this.created_at);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
});

module.exports = mongoose.model('categories', CategoriSchema);
