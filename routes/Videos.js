var express = require('express');
var CategoriModel = require('../models/CategoriModel');
var VideoModel = require('../models/VideoModel');
var router = express.Router();

router.get('/', function (req, res) {
  CategoriModel.find(function (err, category) {
    VideoModel.find(function (err, video) {
      var item = []; // 카테고리별 비디오 목록을 담아두는 배열
      for (var i in category) {
        var videos = []; // 비디오 목록을 담는 임시 배열
        for (var j in video) {
          if (category[i].title == video[j].categori) {
            videos.push(video[j]);
          }
        }
        if (videos.length != 0) {
          // 빈 배열 체크
          //console.log(videos);
          var items = {
            category: category[i],
            videos: videos,
          };
          item.push(items);
        }
      }
      //console.log(item[2].category.title);
      //console.log(item[2].videos);
      res.render(
        'home',
        { video: item, categories: category } // DB에서 받은 videos와 category를 videos변수명으로 내보냄
      );
    });
  });
});

module.exports = router;
