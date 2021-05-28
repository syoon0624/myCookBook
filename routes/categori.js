var express = require('express');
var router = express.Router();
var CategoriModel = require('../models/CategoriModel');
//var csrf = require('csurf');
//var csrfProtection = csrf({ cookie: true });
var loginRequired = require('../libs/loginRequired');

var path = require('path');
var uploadDir = path.join(__dirname, '../uploads'); // 루트의 uploads위치에 저장한다.
var fs = require('fs');

//multer 셋팅
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //이미지가 저장되는 도착지 지정
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    // products-날짜.jpg(png) 저장
    callback(
      null,
      'products-' + Date.now() + '.' + file.mimetype.split('/')[1]
    );
  },
});

var upload = multer({ storage: storage });

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
  //edit에서도 같은 form을 사용하므로 빈 변수( product )를 넣어서 에러를 피해준다
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
  CategoriModel.findOne({ _id: req.params.id }, function (err, product) {
    //제품정보를 받고 그안에서 댓글을 받아온다.
    CategoriModel.find({ product_id: req.params.id }, function (err, comments) {
      res.render('category/productsDetail', {
        product: product,
        comments: comments,
      });
    });
  });
});

router.get('/products/edit/:id', loginRequired, function (req, res) {
  //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
  CategoriModel.findOne({ _id: req.params.id }, function (err, product) {
    res.render('category/form', {
      categories: product,
    });
  });
});

router.post(
  '/products/edit/:id',
  loginRequired,
  upload.single('thumbnail'),
  //  csrfProtection,
  function (req, res) {
    //그전에 지정되 있는 파일명을 받아온다
    CategoriModel.findOne({ _id: req.params.id }, function (err, product) {
      //아래의 코드만 추가되면 된다.
      if (req.file && product.thumbnail) {
        //요청중에 파일이 존재 할시 이전이미지 지운다.
        fs.unlinkSync(uploadDir + '/' + product.thumbnail);
      }
      //위의 코드만 추가되면 된다.
      //넣을 변수 값을 셋팅한다
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
          res.redirect('/category/products/detail/' + req.params.id);
        }
      );
    });
  }
);

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
