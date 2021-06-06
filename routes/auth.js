var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '912554148550-gq86jjjgc022b1eit50mboh5lq48covi.apps.googleusercontent.com',
      clientSecret: '_EzuXeN7eNCTbcGQUV4kY1pN',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'], //받고 싶은 필드 나열
    },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOne(
        { username: 'goo_' + profile.id },
        function (err, user) {
          if (!user) {
            //없으면 회원가입 후 로그인 성공페이지 이동
            var regData = {
              //DB에 등록 및 세션에 등록될 데이터
              username: 'goo_' + profile.id,
              password: 'google_login',
              displayname: profile.displayName,
            };
            var User = new UserModel(regData);
            User.save(function (err) {
              //DB저장
              done(null, regData); //세션 등록
            });
          } else {
            //있으면 DB에서 가져와서 세션등록
            done(null, user);
          }
        }
      );
    }
  )
);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//인증후 구글에서 이 주소로 리턴해줌. 상단에 적은 callbackURL과 일치
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth',
    successRedirect: '/',
  })
);
//로그인 성공시 이동할 주소
router.get('/google/success', function (req, res) {
  res.send(req.user);
});

router.get('/google/fail', function (req, res) {
  res.send('google login fail');
});

module.exports = router;
