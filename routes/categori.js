var express = require('express');
var router = express.Router();
var CategoriModel = require('../models/CategoriModel');
var VideoModel = require('../models/VideoModel');
var Youtube = require('youtube-node');
var youtube = new Youtube();

var loginRequired = require('../libs/loginRequired');

var limit = 10; // 출력 갯수
youtube.setKey('AIzaSyCAaeW1qMSInEdN1OzU20FZlToIZYkb1bc'); // API 키 입력

router.get('/', function (req, res) {
  res.send('categori main page');
});

router.get('/products', function (req, res) {
  CategoriModel.find(function (err, products) {
    res.render(
      'category/products',
      { categories: products }
      //ProductModel의 products를 받아서
      //categori/products로 response를 보낸다.
    );
  });
});

router.get('/categories/write', loginRequired, function (req, res) {
  res.render('category/form', { categories: '' });
});

router.post('/categories/write', loginRequired, function (req, res) {
  var category = new CategoriModel({
    title: req.body.title,
    description: req.body.description,
    username: req.user.username,
  });
  //이 아래는 수정되지 않았음
  var validationError = category.validateSync();
  if (validationError) {
    res.send(validationError);
  } else {
    category.save(function (err) {
      res.redirect('/categori/products');
    });
  }
  //이 위는 수정되지 않았음
});

router.get('/products/detail/:id', function (req, res) {
  //url 에서 변수 값을 받아올떈 req.params.id 로 받아온다
  var word = req.query.keyword;
  CategoriModel.findOne({ _id: req.params.id }, function (err, product) {
    var video = [];
    //제품정보를 받고 그안에서 댓글을 받아온다.
    CategoriModel.find({ product_id: req.params.id }, function (err, comments) {
      if (word != null) {
        var count = 0;
        youtube.addParam('order', 'rating'); // 평점 순으로 정렬
        youtube.addParam('type', 'video'); // 타입 지정
        youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈 아이템만 불러옴
        youtube.search(word, limit, function (err, result) {
          // 검색 실행
          console.log(word);
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
              categori: product.title,
            };
            count++;
            video.push(item);
          }
          res.render('category/productsDetail', {
            product: product,
            comments: comments,
            videos: video,
          });
        });
      } else {
        res.render('category/productsDetail', {
          product: product,
          comments: comments,
          videos: video,
        });
      }
    });
  });
});

router.post('/products/detail/:id', loginRequired, function (req, res) {
  var item = [];
  var count = 1;
  for (var i in req.body.videoNum) {
    item.push(req.body.videoNum[i].split('///'));
    var video = new VideoModel({
      categori: item[i][2],
      id: count,
      title: item[i][1],
      video_id: item[i][3],
      urls: item[i][4],
    });
    var validationError = video.validateSync();
    if (validationError) {
      res.send(validationError);
    } else {
      video.save(function (err) {});
    }
    count++;
  }
  res.redirect('/categori/products');
});

router.get('/products/edit/:id', loginRequired, function (req, res) {
  //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
  CategoriModel.findOne({ _id: req.params.id }, function (err, product) {
    res.render('category/form', {
      categories: product,
    });
  });
});

router.post('/products/edit/:id', loginRequired, function (req, res) {
  //그전에 지정되 있는 파일명을 받아온다
  CategoriModel.findOne({ _id: req.params.id }, function (err, product) {
    var query = {
      name: req.body.name,
      thumbnail: req.file ? req.file.filename : product.thumbnail,
      price: req.body.price,
      description: req.body.description,
    };
    CategoriModel.update(
      { id: req.params.id },
      { $set: query },
      function (err) {
        res.redirect('/categori/products/detail/' + req.params.id);
      }
    );
  });
});

router.get('/products/delete/:id', function (req, res) {
  CategoriModel.deleteMany({ _id: req.params.id }, function (err) {
    res.redirect('/categori/products');
  });
});

router.post('/products/ajax_comment/insert', function (req, res) {
  var comment = new CategoriModel({
    content: req.body.content,
    product_id: parseInt(req.body.product_id),
  });
  comment.save(function (err, comment) {
    res.json({
      id: comment.id,
      content: comment.content,
      message: 'success',
    });
  });
});

router.post('/products/ajax_comment/delete', function (req, res) {
  CategoriModel.remove({ _id: req.body.comment_id }, function (err) {
    res.json({ message: 'success' });
  });
});

module.exports = router;
