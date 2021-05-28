var express = require('express');
var app = express();
var port = 3000;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//auto-increment를 위한 패키지
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
//passport 로그인 관련
var passport = require('passport');
var session = require('express-session');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('mongo db Connection');
});
var connect = mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useMongoClient: true,
});

//categori module get
var categori = require('./routes/categori');
var accounts = require('./routes/accounts');
var auth = require('./routes/auth');
var connectMongo = require('connect-mongo');
var Search = require('./routes/Search');
var MongoStore = connectMongo(session);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

var sessionMiddleWare = session({
  secret: 'fastcampus',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000 * 60 * 60, //지속시간 2시간
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60,
  }),
});
app.use(sessionMiddleWare);

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());

app.use(function (req, res, next) {
  app.locals.isLogin = req.isAuthenticated();
  //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
  //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
  next();
});

//routes add
app.use('/', Search);
app.use('/categori', categori);
app.use('/accounts', accounts);
app.use('/auth', auth);

var server = app.listen(port, function () {
  console.log('Express listening on port', port);
});
