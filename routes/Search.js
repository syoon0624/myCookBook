var Youtube = require('youtube-node');
var youtube = new Youtube();

var express = require('express');
var router = express.Router();

var word = '백종원'; // 검색어 지정
var limit = 10; // 출력 갯수
var video = [];
var test = 'test';
var count = 0;
youtube.setKey('AIzaSyCAaeW1qMSInEdN1OzU20FZlToIZYkb1bc'); // API 키 입력
youtube.addParam('order', 'rating'); // 평점 순으로 정렬
youtube.addParam('type', 'video'); // 타입 지정
youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈 아이템만 불러옴

youtube.search(word, limit, function (err, result) {
  // 검색 실행
  if (err) {
    console.log(err);
  } // 에러일 경우 에러공지하고 빠져나감
  //console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력
  var items = result['items']; // 결과 중 items 항목만 가져옴
  for (var i in items) {
    var it = items[i];
    for (var j in it) {
      if (it[j]['title'] != null) {
        var title = it[j]['title'];
      }
      if (it[j]['videoId'] != null) {
        var video_id = it[j]['videoId'];
      }
      var urls = 'https://www.youtube.com/watch?v=' + video_id;
    }
    var item = {
      id: count,
      title: title,
      video_id: video_id,
      urls: urls,
    };
    count++;
    video.push(item);
  }
});

router.get('/', function (req, res) {
  res.render(
    'home',
    { videos: video } // DB에서 받은 videos를 videos변수명으로 내보냄
  );
});

module.exports = router;
