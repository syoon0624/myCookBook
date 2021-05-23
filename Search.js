var Youtube = require('youtube-node');
var youtube = new Youtube();

var word = '백종원 레시피'; // 검색어 지정
var limit = 10;  // 출력 갯수

youtube.setKey('AIzaSyAsKr_oWGZIBbL5tLdIl98Lf9Pzqj8jX4o'); // API 키 입력

youtube.addParam('order', 'rating'); // 평점 순으로 정렬
youtube.addParam('type', 'video');   // 타입 지정
youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈 아이템만 불러옴

youtube.search(word, limit, function (err, result) { // 검색 실행
    if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감

    console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력

    var items = result["items"]; // 결과 중 items 항목만 가져옴
    for (var i in items) {
        var it = items[i];
        var title = it["snippet"]["title"];
        var video_id = it["id"]["videoId"];
        var url = "https://www.youtube.com/watch?v=" + video_id;
        console.log("제목 : " + title);
        console.log("URL : " + url);
        console.log("-----------");
    }
});