# MyCookBook

# 나만의 요리 레시피 모음 만들기

<img width="1440" alt="스크린샷 2021-06-24 오후 6 38 17" src="https://user-images.githubusercontent.com/77139957/123241137-db005f00-d51b-11eb-8b7f-57c797108141.png">

### 경희대학교 컴퓨터공학과 
#### 2017103997 송근영, 2016104146 이승윤

[MyCookbook 주소](https://2016104146.oss-2021.tk:23023/)<br>

## 설명
이 프로젝트는 youtube api를 사용하여 요리를 목적으로 하는 유튜브의 정보 및 동영상을 나만의 리스트로 볼 수 있도록 하기위해 제작되었습니다.

## 사용 기술 스택
- Frontend: EJS -- Embedded JavaScript templates
- Backend : Node.js(express.js)
- Database: mongoDB Atlas
- Server : AWS EC2(Ubuntu), S3

## 주요 기능
- youtube api를 사용하여 내가 원하는 재생목록(카테고리)에 원하는 요리관련 동영상을 넣어 열람 할 수 있다.
- 사용자들이 임의로 추가해놓은 카테고리를 권한 없이 모두가 종합적으로 볼 수 있다.
- 실제 youtube의 검색을 이용하여 원하는 동영상을 찾고, 열람 할 수 있다.

## Page 정보
- home : 메인 페이지(종합적인 모든 카테고리의 모든 영상들을 열람 가능)
- Category directory
- form: 카테고리 추가 뷰
- products: 카테고리 정보 테이블 뷰
- productsDetail: 한 카테고리의 상세정보, 수정, 카테고리에 원하는 영상 검색 및 추가
- Accounts directory
- join: 회원가입
- login: 로그인

## 실행 방법
### 1. 설치
- `git clone http://khuhub.khu.ac.kr/2016104146/OpenSource-MyCookBook.git` 혹은 해당 레포지토리 다운로드
- nodejs
- mongoDB

### 2. 로컬환경에서 실행
- clone된 폴더로 접속 후 해당 CLI 입력
`npm install`
- `npm start`를 입력시 로컬서버의 3000번 port로 기동

## OpenSource API & 레퍼런스
[Youtube API](https://developers.google.com/youtube/v3/getting-started?hl=ko) <br>
[Google Developer](https://developers.google.com/people)  <br>
[Mongoose](https://mongoosejs.com/) <br>
[BootStrap](https://getbootstrap.com/) <br>
[AWS](https://aws.amazon.com/ko/sdk-for-node-js/) <br>

## License
[MIT License](http://khuhub.khu.ac.kr/2016104146/OpenSource-MyCookBook/blob/master/LICENSE)<br>

## Information & Contact
송근영 : rmsdud1626@naver.com<br>
이승윤 : syoon624@naver.com
