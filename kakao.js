/* =====================================================================
   카카오톡 앱  (apps.js 다음에 로드됩니다)
   ★ 친구 / 채팅방 / 통화기록 내용은 아래 "여기만 고치면 됩니다" 부분에서 수정하세요.
   ===================================================================== */
(()=>{
/* ---------- 여기만 고치면 됩니다 ---------- */
// 친구 목록: "이름|폰연락처id" (id를 적으면 전화 앱 연락처와 같은 사람으로 취급 → 통화 대사 / 사진 공유)
const FRIENDS=["강예린|c5","강태공|c3","강혁|c10","김성태 반장|c15","김영진|c14","김우진|c11","김익권 형님|c18","남궁지원|c8","박세환 대장님|c19","박찬일|c9","아버지|dad","양응윤 반장|c16","어머니|mom","위도윤|c1","유서빈 지휘 팀장님|c13","윤현성|c2","임상철|c35","최도진|c7","한유현|c12","허광열|c6","호수|c4",
 "2팀 조태진 팀장님|c17","2팀 송정율 팀장님|c34","2팀 금소리 대원|c20","3팀 육현빈 부팀장|c21","3팀 이한선 반장|c22","진선 정형진 부팀장|c23","은아씨 (복지 나눔 센터)|c24","2팀 김요한 부팀장|c25","2팀 지창우 반장|c26","2팀 배정헌 반장|c27","2팀 배정현 반장|c28","2팀 정세종 반장|c29","3팀 이구진 팀장|c30","3팀 최헌정 반장|c31","3팀 김기준 반장|c32","3팀 김용진 반장|c33","떵|poop"];
const MY_EMAIL="seo.igeon@gmail.com";
/* 채팅방: M(보낸사람, 내용, 며칠전, 시, 분)  보낸사람 "me" = 나 */
const M=(w,t,d,h,m)=>({w,t,at:null,_:[d,h,m]});
/* 날짜를 직접 적는 방식: A(보낸사람, 내용, "YYYY-MM-DDTHH:MM:00")  보낸사람 "me" = 나 */
const A=(w,t,iso)=>({w,t,at:null,abs:iso});
const ROOMS_SEED=[
 {id:"mom",type:"dm",pin:1,unread:0,msgs:[A("mom","사진첩 발견했는데 아들귀엽네~^^","2026-10-21T18:20:00"),A("me","ㅋㅋㅋㅋㅋ","2026-10-21T18:24:00"),A("me","그건 또 어디서 찾으셨어","2026-10-21T18:24:00"),A("mom","집 청소하다가 발견했지","2026-10-21T18:26:00"),A("mom","아들보고싶네~","2026-10-21T18:26:00"),A("me","저도요","2026-10-21T18:30:00"),A("me","조만간 봬요","2026-10-21T18:30:00"),A("me","요즘 뭐 필요한 건 없으셔?","2026-10-21T18:31:00"),A("mom","아들이 주는 용돈이면 충분하지~~","2026-10-21T18:33:00"),A("me","그럼 용돈 조금만 더 올려서 부칠게","2026-10-21T18:35:00"),A("me","아빠한테는 말하지마요~","2026-10-21T18:35:00"),A("mom","그럼 ㅎㅎ","2026-10-21T18:36:00")]},
 {id:"dad",type:"dm",pin:1,unread:0,msgs:[A("me","아빠 생신 축하드려요","2026-10-21T19:02:00"),A("me","오늘은 시간이 안돼서 내일 찾아뵐게요","2026-10-21T19:02:00"),A("dad","그래. 고맙다.","2026-10-21T19:10:00"),A("me","생신선물로 골프채 세트 저번에 보셨던 거 샀어요","2026-10-21T19:12:00"),A("dad","정말 고맙다. 내일 보자 아들.","2026-10-21T19:20:00"),A("me","네ㅋㅋㅋㅋㅋ","2026-10-21T19:21:00")]},
 {id:"c1",type:"dm",unread:0,msgs:[A("c1","서이건 내일 작도산으로 8시까지 와라.","2024-05-11T21:59:00"),A("c1","RIT 훈련 교재 만들어야 돼.","2024-05-11T22:00:00"),A("me","아니 그거 내일이었던가?","2024-05-11T22:31:00"),A("me","ㅇㅋ~","2024-05-11T22:31:00"),A("c1","서이건","2026-06-06T22:46:00"),A("c1","생일 축하한다","2026-06-06T22:46:00"),A("c1","늦어서 미안.","2026-06-06T22:47:00"),A("me","말도 안 했는데 어떻게 알았대","2026-06-06T22:50:00"),A("me","고맙다~","2026-06-06T22:55:00"),A("c1","술 한 잔 하자","2026-06-06T23:20:00"),A("me","ㅇㅇ","2026-06-06T23:21:00"),A("me","우리집 앞에 포차로 와","2026-06-06T23:21:00"),A("me","위도윤","2026-06-17T12:27:00"),A("me","반차 결재 좀","2026-06-17T12:27:00"),A("c1","갑자기? 그걸 이제 말하면 어떡해.","2026-06-17T12:29:00"),A("me","익권이 형한테 부탁했어","2026-06-17T12:30:00"),A("me","집에 일 생겨서 지금 가봐야 돼 ㅈㅅ","2026-06-17T12:30:00"),A("c1","알았어. 지금 할게.","2026-06-17T12:30:00"),A("c1","야 어디야","2026-10-13T09:31:00"),A("c1","또 지각이냐?","2026-10-13T09:31:00"),A("me","와진짜죄송지금가고이ㅛ음","2026-10-13T09:32:00"),A("c1","미친새끼가 또 늦잠잤지","2026-10-13T09:33:00"),A("me","늦잠ㄴㄴ아는친구애기어린이집데려다주느라","2026-10-13T09:37:00"),A("c1","그걸 왜 너가 해","2026-10-13T09:37:00"),A("me","진짜어쩔수없었음","2026-10-13T09:40:00"),A("me","아니기다려봐나운전래야돼","2026-10-13T09:42:00")]},
 {id:"g1",type:"group",name:"시광 1팀",members:["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"],unread:0,msgs:[A("c1","시광 1팀 단톡방이다","2024-02-02T10:02:00"),A("c2","저희도 이제 단톡방 생겼네요!!!","2024-02-02T10:04:00"),A("c4","우와!!","2024-02-02T10:05:00"),A("me","이거 그냥 업무의 연장선 아닌가용~??","2024-02-02T10:07:00"),A("c3","아니 형","2024-02-02T10:08:00"),A("c1","닥쳐라 서이건","2024-02-02T10:09:00"),A("me","ㅠㅠ","2024-02-02T10:10:00"),A("c5","ㅋㅋㅋㅋㅋ","2024-02-02T10:11:00"),A("c6","ㅋㅋㅋㅋㅋㅋ","2024-02-02T10:12:00"),A("c7","허광열 부팀장님 말에 쪼개지 마라","2024-02-02T10:14:00"),A("c6","나한테만 지랄이야진짜","2024-02-02T10:15:00"),A("c9","잘 부탁드립니다~","2024-02-02T10:16:00"),A("c8","헐 저 팀 단톡방 처음이에요","2024-02-02T10:17:00"),A("c1","다들 점심 먹었어?","2024-02-03T12:10:00"),A("c4","아니요!","2024-02-03T12:11:00"),A("c5","아직 안 먹었어요","2024-02-03T12:12:00"),A("c2","배고파요 형","2024-02-03T12:13:00"),A("c3","저는 이건이 형이랑 앞에 돈까스 먹고 왔어요","2024-02-03T12:15:00"),A("me","굿~ 거기 맛집임","2024-02-03T12:16:00"),A("c2","아니 왜 저빼고가요","2024-02-03T12:17:00"),A("me","니가 카톡 안 봄 ㅅㄱ","2024-02-03T12:18:00"),A("c2","아니","2024-02-03T12:19:00"),A("c9","식사 했습니다.","2024-02-03T12:20:00"),A("c1","내일 유향빌딩 앞으로 8시까지 집합","2024-12-29T20:15:00"),A("c4","와~~ 워크샵~~","2024-12-29T20:16:00"),A("c1","추우니까 다들 따뜻하게 입고 와","2024-12-29T20:18:00"),A("c2","네!","2024-12-29T20:19:00"),A("c8","네!","2024-12-29T20:20:00"),A("me","위도윤 이제 고기 구울 줄은 아냐?","2024-12-29T20:22:00"),A("c1","안다고","2024-12-29T20:23:00"),A("me","얘들아 미리 사과한다 딱 보니 저새끼 내일도 고기 못 굽는다","2024-12-29T20:26:00"),A("me","내일 회식 장소 어디가 좋냐","2026-10-15T18:40:00"),A("c8","다 좋습니다!!","2026-10-15T18:41:00"),A("c6","낙지 어떨까요","2026-10-15T18:42:00"),A("me","어 그래 갈비 좋구나","2026-10-15T18:43:00"),A("me","내일 작도 숯불갈비에서 회식한다 이상","2026-10-15T18:44:00"),A("c6","?","2026-10-15T18:45:00"),A("c4","ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ","2026-10-15T18:46:00"),A("c5","ㅋㅋㅋㅋㅋ","2026-10-15T18:47:00"),A("c2","광열아 보통 이건이 형은 대답이 정해진 채로 물어보는 편이야","2026-10-15T18:50:00"),A("c3","맞지","2026-10-15T18:51:00")]},
 {id:"c4",type:"dm",unread:0,msgs:[A("me","호수","2024-03-15T10:02:00"),A("me","인터넷 보지마라","2024-03-15T10:02:00"),A("c4","네?","2024-03-15T10:05:00"),A("me","정직이라 어차피 집이지?","2024-03-15T10:06:00"),A("c4","네...","2024-03-15T10:08:00"),A("me","데리러 갈 테니까 집에 있어라","2024-03-15T10:09:00"),A("c4","왜요...?","2024-03-15T10:11:00"),A("me","우리가 할 수 있는 일을 해야지","2024-03-15T10:12:00"),A("c4","내일 카페에서 뵙는 거 맞죠?","2024-11-02T19:09:00"),A("me","ㅇㅇ","2024-11-02T20:10:00"),A("me","작도 카페 어딘지 알지?","2024-11-02T20:10:00"),A("c4","네!","2024-11-02T20:21:00"),A("me","누구 온다고?","2024-11-02T20:30:00"),A("c4","예린이랑 도진이 형이요!","2024-11-02T20:32:00"),A("me","ㅇㅋ","2024-11-02T20:33:00"),A("me","잘 들어갔냐?","2024-11-03T17:33:00"),A("c4","네! 오늘 감사했어요!!","2024-11-03T17:35:00"),A("me","오늘 내가 한 말 잊지 말고","2024-11-03T17:35:00"),A("me","미래 본다는 거 남한테 밝혀서 좋을 거 하나 없다","2024-11-03T17:36:00"),A("me","어디가서 쉽게 입 열지마","2024-11-03T17:36:00"),A("c4","네…","2024-11-03T17:37:00"),A("me","자라","2024-11-03T21:57:00"),A("c4","넵 내일 봬요!","2024-11-03T22:04:00"),A("me","부모님 뵈러 가냐?","2025-12-30T19:02:00"),A("c4","네! 새해에 내려가려고요!","2025-12-30T19:03:00"),A("me","가기 전에 잠깐 우리집 들려","2025-12-30T19:04:00"),A("me","과일 챙겨가라","2025-12-30T19:04:00"),A("c4","헉 감사합니다!!","2025-12-30T19:05:00"),A("c4","형!","2026-09-03T18:20:00"),A("c4","예린이랑 형들이랑 운동하러 가기로 했는데","2026-09-03T18:20:00"),A("c4","같이 가실래요??","2026-09-03T18:21:00"),A("me","귀찮아","2026-09-03T18:30:00"),A("me","난 패스","2026-09-03T18:30:00"),A("c4","네ㅠㅠ","2026-09-03T18:31:00")]},
 {id:"c3",type:"dm",unread:0,msgs:[A("me","강태공~ 니 자리에 나 책자 두고 옴","2023-11-12T07:45:00"),A("me","가지러 간다~?","2023-11-12T07:45:00"),A("me","씹냐?","2023-11-12T07:45:00"),A("me","대답없어도 간다","2023-11-12T07:47:00"),A("me","거의 다 옴","2023-11-12T07:47:00"),A("c3","ㄴㄴ 지금 도윤이형 많이 화나ㅇ","2023-11-12T07:47:00"),A("c3","형","2026-10-20T21:03:00"),A("c3","이건이 형","2026-10-20T21:03:00"),A("me","와이","2026-10-20T21:05:00"),A("c3","도윤이 형 술마셨는데 데리고 가주면 안 돼요?","2026-10-20T21:06:00"),A("c3","저희도 술 마셔서 운전 못하는데 지금","2026-10-20T21:06:00")]},
 {id:"c2",type:"dm",unread:0,msgs:[A("me","야","2024-02-03T11:42:00"),A("me","점심 먹으러 같이 가실?","2024-02-03T11:42:00"),A("me","강태구랑 돈까스 먹기로 했음","2024-02-03T11:43:00"),A("c2","아니 형","2024-06-12T21:10:00"),A("c2","저번 주말에","2024-06-12T21:10:00"),A("c2","도윤이 형이랑 호수랑 밥 먹었어요?","2024-06-12T21:11:00"),A("me","? 누가 그래","2024-06-12T21:12:00"),A("c2","도윤이 형이요","2024-06-12T21:13:00"),A("me","그새끼 입 졸라 싸 진짜","2024-06-12T21:14:00"),A("c2","아니 형 어떻게 저를 안 불러요???","2024-06-12T21:16:00"),A("me","아니 일이 있어서 만난 거라고","2024-06-12T21:18:00"),A("c2","뭔 일이 있었길래 셋이 만나서 칼국수까지 먹었는데요","2024-06-12T21:20:00"),A("me","어차피 닌 말해도 몰라","2024-06-12T21:21:00"),A("c2","아니 진짜 개너무해;","2024-06-12T21:22:00"),A("c2","심지어 밥도 형이 샀다던데","2024-06-12T21:23:00"),A("c2","저는 밥 한 번도 안 사주셨으면서…","2024-06-12T21:24:00"),A("me","애새끼 별 게 다 서운하네 진짜","2024-06-12T21:26:00"),A("me","다음주 주말에 작도국밥에서 만나던지","2024-06-12T21:27:00"),A("me","국밥 사주면 되잖아","2024-06-12T21:27:00"),A("c2","진짜요???","2024-06-12T21:28:00"),A("me","ㅇ","2024-06-12T21:29:00"),A("c2","아싸","2024-06-12T21:30:00"),A("c2","진짜 사주시는 거죠?","2024-06-12T21:30:00"),A("me","안 사주는 수가 있다","2024-06-12T21:31:00"),A("c2","안","2024-06-12T21:32:00"),A("c2","아닝","2024-06-12T21:32:00"),A("c2","아니얘요","2024-06-12T21:32:00"),A("c2","아니예요","2024-06-12T21:32:00"),A("c2","감사합니다 형","2024-06-12T21:32:00"),A("c2","주말에 봬요","2024-06-12T21:32:00"),A("me","오냐","2024-06-12T21:33:00"),A("c2","형","2026-09-12T09:03:00"),A("c2","형","2026-09-12T09:03:00"),A("c2","형","2026-09-12T09:03:00"),A("c2","형","2026-09-12T09:03:00"),A("c2","ㅃㄹ","2026-09-12T09:04:00"),A("c2","ㅃㄹ오세요","2026-09-12T09:04:00"),A("c2","빨리와","2026-09-12T09:04:00"),A("c2","도윤이 형 진짜 화남","2026-09-12T09:05:00"),A("c2","진짜 마음의 준비하세요ㄹㅇ","2026-09-12T09:05:00"),A("me","잔소리 들을 준비 완료","2026-09-12T09:12:00")]},
 {id:"c7",type:"dm",unread:0,msgs:[A("me","최도진 반장아","2025-08-21T23:40:00"),A("me","집 도착했냐?","2025-08-21T23:40:00"),A("c7","도착했습니다","2025-08-21T23:41:00"),A("me","그래","2025-08-21T23:42:00"),A("me","마봉산 터널 생명에 지장있는 구조 대상자 0명이랜다~","2025-08-21T23:43:00"),A("me","고생했다","2025-08-21T23:43:00"),A("c7","감사합니다","2025-08-21T23:44:00"),A("me","푹 자라","2025-08-21T23:45:00")]},
 {id:"g2",type:"group",pin:1,name:"가족",members:["mom", "dad", "poop"],unread:0,msgs:[A("dad","오늘도 좋은 하루 보내라.","2026-01-05T08:10:00"),A("me","예","2026-01-05T08:12:00"),A("poop","아빠도요~","2026-01-05T08:13:00"),A("mom","아들딸 건강하지?","2026-01-05T08:15:00"),A("me","네~ 무탈합니당~","2026-01-05T08:20:00"),A("poop","엄마 이번에 건강검진 받았어요?","2026-04-05T12:30:00"),A("mom","아니 아직","2026-04-05T12:31:00"),A("me","엥? 왜 아직 안 갔어","2026-04-05T12:32:00"),A("me","아빠 엄마 데리고 안 갔어요?","2026-04-05T12:33:00"),A("dad","너네 엄마가 돈 아깝다고 안 간댄다.","2026-04-05T12:35:00"),A("me","?","2026-04-05T12:36:00"),A("me","됐어요 그게 뭔 큰 돈이라고","2026-04-05T12:37:00"),A("me","이번주에 가세요","2026-04-05T12:37:00"),A("me","제가 태우러 갈게요 엄마","2026-04-05T12:38:00"),A("poop","아빠도 이참에 받아","2026-04-05T12:39:00"),A("poop","아빠 건강검진은 내가 낼게요","2026-04-05T12:40:00"),A("me","니가 뭔 돈이 있다고 됐거든","2026-04-05T12:41:00"),A("me","약속 비워둬요 둘 다 금요일날 태우러 갑니다","2026-04-05T12:42:00"),A("me","아빠 골프치러 가지마","2026-04-05T12:42:00"),A("dad","안간다.","2026-04-05T12:43:00")]},
 {id:"g3",type:"group",name:"간담상조",members:["c12", "c11", "c10"],unread:0,msgs:[A("c10","12월 말 연차 뺄 수 있어 없어","2021-12-13T22:10:00"),A("c11","있어","2021-12-13T22:11:00"),A("c12","나도","2021-12-13T22:12:00"),A("c10","서이건은","2021-12-13T22:13:00"),A("me","나도 가능할듯?","2021-12-13T22:14:00"),A("me","비상소집만 안 뜨면 됨","2021-12-13T22:15:00"),A("c10","ㅇㅋ","2021-12-13T22:16:00"),A("c11","어디로 갈거야?","2021-12-13T22:17:00"),A("c12","일본?","2021-12-13T22:18:00"),A("c11","저번에 갔는데","2021-12-13T22:19:00"),A("c10","안 가본 곳 가자","2021-12-13T22:20:00"),A("me","우리 필리핀 가자","2021-12-13T22:21:00"),A("c10","왜 가고싶냐?","2021-12-13T22:22:00"),A("me","ㅋㅋㅋㅋㅋ ㅇㅇ 릴스에서 봤는데 좋아보임","2021-12-13T22:24:00"),A("c11","세부로 가 그러면","2021-12-13T22:25:00"),A("me","굿~","2021-12-13T22:26:00"),A("c12","비행기표 내가 살게 돈 보내","2021-12-13T22:27:00"),A("me","ㅇㅋ","2021-12-13T22:28:00"),A("c10","ㅇㅋ","2021-12-13T22:29:00"),A("c11","알았어","2021-12-13T22:30:00"),A("c12","진아 건이 진짜 몸살 감기인 거 맞아?","2026-07-20T19:20:00"),A("c11","편도염이 엄청 심하다던데","2026-07-20T19:21:00"),A("c10","? 단순 감기라며","2026-07-20T19:22:00"),A("me","아김우진","2026-07-20T19:23:00"),A("c12","어차피 밤에 찾아가면 다 알 걸 뭣하러 숨겨","2026-07-20T19:25:00"),A("me","아진짜괜찮다고","2026-07-20T19:26:00"),A("me","체감상으로는 그정도 아니란 말야","2026-07-20T19:27:00"),A("c10","닥치셈","2026-07-20T19:28:00"),A("me",";;","2026-07-20T19:29:00"),A("c11","약 먹고 자라","2026-07-20T19:30:00"),A("me","안졸려","2026-07-20T19:31:00"),A("c12","어차피 약 먹으면 졸려","2026-07-20T19:32:00"),A("me","어제 설거지 아직 안 함","2026-07-20T19:33:00"),A("c12","이따 밤에 가서 너 자고있으면 내가 할게","2026-07-20T19:35:00"),A("c10","이따 건이네 집 가냐?","2026-07-20T19:36:00"),A("c12","응 너도 와라 집안일 같이 하게","2026-07-20T19:38:00"),A("c10","ㅇㅋ~","2026-07-20T19:39:00"),A("c11","나도 갈게","2026-07-20T19:40:00"),A("me","미안한데 우리집 공동소유야?","2026-07-20T19:41:00"),A("c10","아무래도?","2026-07-20T19:42:00")]},
 {id:"c12",type:"dm",unread:0,msgs:[A("c12","갔는데 자고 있길래 설거지 하고 청소기 좀 돌리고 나왔어","2026-07-20T23:31:00"),A("c12","청소기 소리 시끄러웠을텐데 안 깨더라","2026-07-20T23:32:00"),A("c12","얼른 낫고","2026-07-20T23:32:00"),A("c12","잘 자","2026-07-20T23:32:00"),A("me","아니 언제 왔다갔냐","2026-07-21T11:02:00"),A("me","몰랐네","2026-07-21T11:02:00"),A("me","고맙다","2026-07-21T11:02:00"),A("c12","몸 좀 괜찮아?","2026-07-21T11:03:00"),A("me","ㅇㅇ 진짜 괜춘","2026-07-21T11:04:00"),A("c12","다행이네","2026-07-21T11:05:00"),A("c12","쉬어","2026-07-21T11:05:00"),A("me","엉","2026-07-21T11:06:00")]},
 {id:"c11",type:"dm",unread:0,msgs:[A("c11","내일 병원 또 가","2026-07-20T23:50:00"),A("c11","상태보니까 또 가야겠더라","2026-07-20T23:51:00"),A("me","지금 내려갈게","2026-07-21T13:30:00")]},
 {id:"c10",type:"dm",unread:0,msgs:[A("c10","롤체ㄱ","2026-06-05T20:15:00"),A("me","ㅇㅋ","2026-06-05T20:16:00"),A("c10","안 아프다면서","2026-07-20T23:45:00"),A("c10","존나 잘자네ㅋㅋㅋㅋㅋ","2026-07-20T23:45:00"),A("c10","푹 쉬어라","2026-07-20T23:45:00"),A("me","아니 진짜 언제 왔다감?","2026-07-21T15:20:00"),A("me","1도 몰랐음;;","2026-07-21T15:20:00"),A("c10","기절잠 자는데 알겠냐","2026-07-21T15:21:00"),A("c10","ㄱㅊ음?","2026-07-21T15:21:00"),A("me","ㅇㅇ 진이때문에 반강제 병원또감","2026-07-21T15:23:00"),A("me","의사쌤도 괜찮대","2026-07-21T15:23:00"),A("c10","굿","2026-07-21T15:24:00")]},
 {id:"c34",type:"dm",unread:0,msgs:[A("c34","서이건","2020-03-04T14:02:00"),A("me","네?","2020-03-04T14:03:00"),A("c34","소방차 앞에 나뭇잎 치워라","2020-03-04T14:04:00"),A("me","네","2020-03-04T14:05:00"),A("me","송팀장님 생신 축하드립니다","2022-03-12T09:10:00"),A("me","도윤이 잘하고 있습니다","2022-03-12T09:11:00")]}
];
/* 통화 탭: [상대id 또는 방id, 종류(voice/video), 결과(out/in/missed/declined), 횟수, 표시시간] */
const CALLS_SEED=[["mom","voice","out",1,"1시간 전"],["g2","video","out",1,"3시간 전"],["dad","video","out",3,"어제"],["c12","voice","in",1,"어제"],["c11","voice","missed",1,"2일 전"],["g3","video","out",1,"3일 전"],["poop","voice","in",1,"4일 전"],["c10","video","in",1,"6일 전"],["mom","video","out",2,"2주 전"],["c10","voice","missed",1,"3주 전"],["dad","voice","out",1,"지난달"],["c12","video","declined",1,"지난달"],["g2","voice","in",1,"2개월 전"],["c11","video","out",1,"2개월 전"],["poop","voice","missed",1,"3개월 전"]];
/* 상대가 답장할 말 (보내면 잠시 뒤 랜덤으로 답장) */
const REPLY={mom:["응 알았어 아들~","밥은 먹었니?","조심히 다녀","그래 고생해"],dad:["그래","알았다","건강 챙겨라"],poop:["ㅇㅇ","ㅋㅋㅋㅋ","왜","알겠음"],c1:["ㅇㅋ","ㅋㅋㅋㅋ","알았다 이따 보자"],c2:["넵 형!","ㅋㅋㅋㅋ 알겠습니다","확인했어요!"],c4:["넵!","형 ㅋㅋㅋ","알겠어요!"],c3:["ㅇㅋㅇㅋ","ㅋㅋㅋ","콜"],c12:["응~","알았어","ㅇㅋ"],c11:["엉","ㅇㅇ","알겠다"],c10:["확인","ㅇㅋ","ㅋㅋ"],_:["ㅇㅋ","ㅋㅋㅋ","알겠습니다","넵"]};

/* ---------- 이하 구현 ---------- */
const KS={tab:0,room:null,profile:null,srch:null,filter:"all",col:{},pick:false,cs:{}};
const E=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const base=()=>now(),ago=(d,h,m)=>{const b=base();return new Date(b.getFullYear(),b.getMonth(),b.getDate()-d,h,m)};
const KT=d=>(d.getHours()<12?"오전 ":"오후 ")+(d.getHours()%12||12)+":"+String(d.getMinutes()).padStart(2,"0");
const dayN=d=>{const n=base();return Math.round((new Date(n.getFullYear(),n.getMonth(),n.getDate())-new Date(d.getFullYear(),d.getMonth(),d.getDate()))/864e5)};
const WD=["일","월","화","수","목","금","토"];
const listT=d=>{const n=dayN(d);return n<=0?KT(d):n===1?"어제":d.getFullYear()!==base().getFullYear()?`${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`:`${d.getMonth()+1}월 ${d.getDate()}일`};
const dateL=d=>`${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 ${WD[d.getDay()]}요일`;
const DL=d=>`<div class="kk-dt"><span>${dateL(d)}${ico("chevR",11,2.4,"#4a5866")}</span></div>`;
const SMI=(s=22)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}"><circle cx="8.6" cy="9.4" r="1.5" fill="#15191d"/><circle cx="15.4" cy="9.4" r="1.5" fill="#15191d"/><path d="M6.8 13.2c1.2 3.2 3.2 4.6 5.2 4.6s4-1.4 5.2-4.6" fill="none" stroke="#15191d" stroke-width="2.1" stroke-linecap="round"/></svg>`;
const hash=s=>[...s].reduce((a,c)=>a+c.charCodeAt(0),0);
const ph=id=>(DATA.contacts.find(x=>x.id===id)||{}).photo||"";

/* 사람들 */
const FR=FRIENDS.map((s,i)=>{const[n,id]=s.split("|");return{id:id||"k"+i,name:n,k:hash(n)%3}}).sort((a,b)=>(/^\d/.test(a.name)-/^\d/.test(b.name))||a.name.localeCompare(b.name,"ko"));
const ME={id:"me",name:DATA.me?.name||"나",k:2};
const PEOPLE={me:ME};FR.forEach(p=>PEOPLE[p.id]=p);
const person=id=>PEOPLE[id]||(PEOPLE[id]=(()=>{const c=DATA.contacts.find(x=>x.id===id);return{id,name:c?c.name:id,k:hash(c?c.name:id)%3}})());
person("poop"); // 친구 목록에는 없지만 채팅방에 있는 사람
const CHANNELS=[{"id": "ch1", "name": "스타일온", "e": "👕", "c": "#222428"}, {"id": "ch2", "name": "푸드고", "e": "🍗", "c": "#ff6b35"}, {"id": "ch3", "name": "모두다이렉트", "e": "🚗", "c": "#2a6ef0"}, {"id": "ch4", "name": "신선마켓", "e": "🥬", "c": "#37b26c"}, {"id": "ch5", "name": "빠른택배", "e": "📦", "c": "#f5a623"}, {"id": "ch6", "name": "어반룩", "e": "🧥", "c": "#8a6d5a"}];
CHANNELS.forEach(c=>PEOPLE[c.id]={id:c.id,name:c.name,k:0,e:c.e,c:c.c,ch:1}); // 구독 채널

/* 채팅방 */
const ROOMS=ROOMS_SEED.map(r=>({...r,msgs:r.msgs.map(m=>({w:m.w,t:m.t,at:m.abs?new Date(m.abs):ago(...m._)}))}));
const CALLS=CALLS_SEED.map(([id,kind,res,n,t])=>({id,kind,res,n,t}));
const roomOf=id=>ROOMS.find(r=>r.id===id);
const roomName=r=>r.type==="group"?r.name:person(r.id).name;
const members=r=>r.type==="group"?r.members.map(person):[person(r.id)];
const last=r=>r.msgs[r.msgs.length-1];
const totalUnread=()=>ROOMS.reduce((s,r)=>s+(r.unread||0),0);

/* ---------- 아이콘 ---------- */
const S=(p,s=24,w=1.8,c="currentColor",f="none")=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="${f}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const IC={
 search:'<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500L20 20"/>',
 addf:'<circle cx="10" cy="8.500" r="3.800"/><path d="M3 20c0-4 3.200-6 7-6M18 13.500v6M15 16.500h6"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3l1.600 2.200 2.700-.6.800 2.600 2.600.8-.6 2.700L21 12l-2.200 1.600.6 2.700-2.600.8-.8 2.600-2.700-.6L12 21l-1.600-2.200-2.700.6-.8-2.600-2.600-.8.600-2.700L3 12l2.200-1.600-.6-2.700 2.600-.8.8-2.600 2.700.6z"/>',
 newchat:'<path d="M20 12a8 7 0 0 1-12 6l-4 1.500 1.200-3.600A7 7 0 1 1 20 12z"/><path d="M15 3v5M12.500 5.500h5"/>',
 openchat:'<path d="M3.500 11a6.500 5.500 0 0 1 13 0 6.500 5.500 0 0 1-13 0zM7 16l-1.200 3.300 3.700-1.800M12.500 6a6.500 5.500 0 0 1 8 5.500c0 1.800-1.100 3.400-2.800 4.400l1 3.200-3.600-1.800"/>',
 back:'<path d="M15 4l-8 8 8 8"/>',x:'<path d="M5 5l14 14M19 5L5 19"/>',
 up:'<path d="M12 19V6M6 11.500L12 5.500l6 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',
 chevU:'<path d="M5 15l7-7 7 7"/>',chevD:'<path d="M5 9l7 7 7-7"/>',chevR:'<path d="M9 5l7 7-7 7"/>',
 phone:'<path d="M5 4h3.500l1.800 4.500-2.300 1.500a11 11 0 0 0 6 6l1.500-2.300L20 15.500V19a1.500 1.500 0 0 1-1.500 1.500C10.200 20.500 3.500 13.800 3.500 5.500A1.500 1.500 0 0 1 5 4z"/>',
 video:'<rect x="2.500" y="6" width="13" height="12" rx="2.800"/><path d="M15.500 10.500l6-3.500v10l-6-3.500z"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',emo:'<circle cx="12" cy="12" r="8.500"/><path d="M8.800 14c1.800 2.200 4.600 2.200 6.400 0M9 9.800v.8M15 9.800v.8"/>',
 hash:'<path d="M9 4L7.500 20M16.500 4L15 20M4.500 9h16M3.500 15h16"/>',mute:'<path d="M12 3.500a4 4 0 0 1 4 4V12a4 4 0 0 1-8 0V7.500a4 4 0 0 1 4-4zM5 11a7 7 0 0 0 14 0M12 18v3"/>',
 speaker:'<path d="M4 9.500v5h3.500L12 18.500v-13L7.500 9.500zM15.500 9a4 4 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11"/>',cam:'<path d="M4 8h3l1.500-2h7L17 8h3v11H4zM12 16.500a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7z"/>',
 cake:'<rect x="5" y="11.500" width="14" height="8" rx="2" fill="#fff" stroke="none"/><path d="M5 14.500c1.600 1.300 2.700 1.300 3.500 0 1 1.300 2.100 1.300 3.500 0 1 1.300 2.100 1.300 3.500 0 .8 1.300 1.800 1.300 3.500 0" stroke="#f5636f" stroke-width="1.300" fill="none"/><path d="M12 8v3.500" stroke="#fff" stroke-width="1.500"/><circle cx="12" cy="6.300" r="1.300" fill="#fff" stroke="none"/>',
 smile:'<circle cx="12" cy="12" r="8.200" stroke="#fff" stroke-width="1.700" fill="none"/><path d="M8.500 13.800c1.900 2.200 5.100 2.200 7 0M9.200 9.600v1.200M14.800 9.600v1.200" stroke="#fff" stroke-width="1.600" fill="none"/>'
};
const ico=(k,s=24,w=1.8,c)=>S(IC[k],s,w,c);
/* 하단 탭 아이콘 (채워진 모양) */
const TABI=[
 a=>`<svg viewBox="0 0 24 24" width="29" height="29"><circle cx="12" cy="8" r="4.300" fill="${a}"/><path d="M3.800 21c0-5 3.800-7.200 8.200-7.200s8.200 2.200 8.200 7.200z" fill="${a}"/></svg>`,
 a=>`<svg viewBox="0 0 24 24" width="29" height="29"><path d="M12 3.500c5.500 0 9.500 3.400 9.500 7.800S17.500 19 12 19c-1 0-1.900-.1-2.800-.3L5 20.800l1-3.500C4 16 2.500 13.800 2.500 11.300 2.500 6.900 6.500 3.500 12 3.500z" fill="${a}"/></svg>`,
 a=>`<svg viewBox="0 0 24 24" width="29" height="29"><path d="M12 2.500c-4 0-7 3-7 6.800 0 5 7 12 7 12s7-7 7-12c0-3.800-3-6.800-7-6.800z" fill="${a}"/><path d="M12 6.500l1.200 2.500 2.700.3-2 1.900.5 2.700L12 12.500l-2.400 1.400.5-2.700-2-1.900 2.700-.3z" fill="#fff"/></svg>`,
 a=>`<svg viewBox="0 0 24 24" width="29" height="29"><path d="M5 3.500h3.500l2 5-2.500 1.700a12 12 0 0 0 5.800 5.800l1.700-2.500 5 2V19.500a1.500 1.500 0 0 1-1.500 1.500C10.500 21 3 13.500 3 5A1.500 1.500 0 0 1 4.500 3.500z" fill="${a}"/></svg>`,
 a=>`<svg viewBox="0 0 24 24" width="29" height="29" fill="${a}"><circle cx="5" cy="12" r="1.900"/><circle cx="12" cy="12" r="1.900"/><circle cx="19" cy="12" r="1.900"/></svg>`
];
const SIL=`<svg viewBox="0 0 40 40" width="100%" height="100%"><circle cx="20" cy="15.500" r="6.200" fill="#fff" opacity=".8"/><path d="M8 34c0-6.500 5-9.500 12-9.500S32 27.500 32 34z" fill="#fff" opacity=".8"/></svg>`;
/* 프로필 사진 (squircle) */
const kav=(p,s=40,rad=.36)=>{const im=ph(p.id);if(p.e)return`<span class="kav" style="width:${s}px;height:${s}px;border-radius:${Math.round(s*rad)}px;background:${p.c};display:grid;place-items:center;font-size:${Math.round(s*.5)}px;line-height:1">${p.e}</span>`;return`<span class="kav k${p.k}" style="width:${s}px;height:${s}px;border-radius:${Math.round(s*rad)}px;${im?`background-image:url(${E(im)});background-size:cover;background-position:center`:""}">${im?"":SIL}</span>`};
const gav=(ms,s=44)=>{const a=ms.slice(0,4);return`<span class="gav" style="width:${s}px;height:${s}px;border-radius:${Math.round(s*.36)}px">${a.map(p=>kav(p,Math.round(s*.4),.34)).join("")}</span>`};
const ravt=(r,s=44)=>r.type==="group"?gav(members(r).concat([ME]).slice(0,4),s):kav(person(r.id),s);

/* ---------- 화면 ---------- */
const refresh=()=>{const v=$("kki")?$("kki").value:null;rKakao($("appContent"));if(v!=null&&$("kki")){$("kki").value=v;$("kki").dispatchEvent(new Event("input"))}};
const dark=on=>{state.dark=!!on;const a=$("appScreen");a.classList.toggle("dark",!!on);theme()};
function rKakao(c){
 dark(!!KS.profile);const a=$("appScreen");a.style.background=KS.profile?"#1d2027":KS.room?"#a9bfd0":"#fff";
 if(KS.profile)return vProfile(c);if(KS.room)return vRoom(c);return vTabs(c)}

const TITLES=["친구","채팅","로컬","통화","더보기"];
function hdrIcons(){const t=KS.tab,g=`<button data-k="toast" data-m="설정은 지원하지 않아요">${ico("gear",26,1.7)}</button>`,s=`<button data-k="search">${ico("search",26,1.9)}</button>`;
 return[s+`<button data-k="toast" data-m="친구 추가는 지원하지 않아요">${ico("addf",27,1.7)}</button>`+g,
  s+`<button data-k="newchat">${ico("newchat",27,1.7)}</button><button data-k="toast" data-m="오픈채팅은 지원하지 않아요">${ico("openchat",27,1.7)}</button>`+g,
  s+g,s+`<button data-k="toast" data-m="통화 추가는 지원하지 않아요">${ico("phone",26,1.7)}</button>`+g,s+g][t]}
function vTabs(c){
 const t=KS.tab,badge=totalUnread();
 const bodies=[bFriends,bChats,bLocal,bCalls,bMore];
 c.innerHTML=`<div class="kk"><div class="kk-h"><h1>${TITLES[t]}</h1><div class="kk-ic">${t===4?`<button data-k="search">${ico("search",26,1.9)}</button><button data-k="toast" data-m="설정은 지원하지 않아요">${ico("gear",26,1.7)}</button>`:hdrIcons()}</div></div>
 ${KS.srch!==null&&[0,1].includes(t)?`<div class="kk-s">${ico("search",18,2,"#999")}<input id="kks" value="${E(KS.srch)}" placeholder="${t?"채팅방, 메시지 검색":"이름 검색"}" autocomplete="off"><button data-k="searchx">취소</button></div>`:""}
 <div class="kk-b" id="kkb">${bodies[t]()}</div>
 <div class="kk-t">${TABI.map((f,i)=>`<button data-tab="${i}" class="${i===t?"on":""}">${f(i===t?"#1b1b1d":"#bfc2c8")}${i===1&&badge?`<i class="kk-bd">${badge>99?"99+":badge}</i>`:""}</button>`).join("")}</div></div>`;
 bind(c);
 const si=$("kks");if(si){si.focus();si.setSelectionRange(si.value.length,si.value.length);si.oninput=e=>{KS.srch=e.target.value;$("kkb").innerHTML=bodies[t]();bind(c)}}}
function bind(c){
 c.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{KS.tab=+b.dataset.tab;KS.srch=null;vTabs(c)});
 c.querySelectorAll("[data-k]").forEach(b=>b.onclick=e=>{e.stopPropagation();const k=b.dataset.k;
  if(k==="toast")showToast(b.dataset.m);else if(k==="search"){KS.srch=KS.srch===null?"":null;vTabs(c)}else if(k==="searchx"){KS.srch=null;vTabs(c)}
  else if(k==="newchat"){KS.pick=true;pickSheet(c)}});
 c.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{KS.profile=b.dataset.p;refresh()});
 c.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>openRoom(b.dataset.r));
 c.querySelectorAll("[data-col]").forEach(b=>b.onclick=()=>{KS.col[b.dataset.col]=!KS.col[b.dataset.col];vTabs(c)});
 c.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{KS.filter=b.dataset.f;vTabs(c)});
 c.querySelectorAll("[data-call]").forEach(b=>b.onclick=e=>{e.stopPropagation();const[id,kind]=b.dataset.call.split(":");startK(kind,id)});
 c.querySelectorAll("[data-soon]").forEach(b=>b.onclick=()=>showToast("이 기능은 지원하지 않아요"))}

/* 친구 탭 */
const sec=(key,label,n)=>`<div class="kk-sec" data-col="${key}"><span>${label}${n!=null?` <b>${n}</b>`:""}</span>${ico(KS.col[key]?"chevD":"chevU",18,1.8,"#8a8d94")}</div>`;
function bdayCount(){const n=base(),lim=new Date(n.getFullYear(),n.getMonth(),n.getDate()+30);return(DATA.events||[]).filter(e=>/생일|생신/.test(e.title)&&(d=>d>=new Date(n.getFullYear(),n.getMonth(),n.getDate())&&d<=lim)(new Date(e.date+"T00:00:00"))).length}
function bFriends(){
 const q=(KS.srch||"").trim(),L=q?FR.filter(p=>p.name.includes(q)):FR;
 let h=q?"":`<div class="kk-me" data-p="me">${kav(ME,52,.38)}<b>${E(ME.name)}</b><span class="kk-pill" data-k="toast" data-m="프로필 편집은 지원하지 않아요">프로필 +</span></div>
 ${sec("bd","생일인 친구")}${KS.col.bd?"":`<div class="kk-row2" data-soon><i class="kk-sq" style="background:#f5636f">${ico("cake",30,1,"#fff")}</i><span>생일 더보기</span><em>${bdayCount()||1}${ico("chevR",15,2,"#777")}</em></div>`}
 ${sec("rc","추천 친구")}${KS.col.rc?"":`<div class="kk-row2" data-soon><i class="kk-sq" style="background:#8a77c9">${ico("smile",32,1,"#fff")}</i><span>더 많은 사람 찾기</span><em>2${ico("chevR",15,2,"#777")}</em></div>`}
 ${sec("ch","채널")}${KS.col.ch?"":`<div class="kk-row2" data-soon><i class="kk-sq ch">Ch</i><span>채널</span><em>36${ico("chevR",15,2,"#777")}</em></div>`}`;
 h+=sec("fr","친구",L.length)+(KS.col.fr&&!q?"":L.map(p=>`<div class="kk-fr" data-p="${p.id}">${kav(p,40,.38)}<span>${E(p.name)}</span></div>`).join(""));
 return h+(L.length?"":`<div class="kk-empty">검색 결과가 없어요</div>`)+`<div class="kk-pad"></div>`}

/* 채팅 탭 */
function sortedRooms(){return[...ROOMS].sort((a,b)=>(!!b.pin-!!a.pin)||last(b).at-last(a).at)}
function bChats(){
 const q=(KS.srch||"").trim(),un=totalUnread();
 let L=sortedRooms();if(KS.filter==="unread")L=L.filter(r=>r.unread);if(q)L=L.filter(r=>roomName(r).includes(q)||r.msgs.some(m=>m.t.includes(q)));
 const chips=`<div class="kk-chips"><button data-f="all" class="${KS.filter==="all"?"on":""}">전체</button><button data-f="unread" class="${KS.filter==="unread"?"on":""}">안 읽음${un?` <i>${un}</i>`:""}</button><button data-soon>오픈채팅</button><button class="sq" data-soon>${ico("menu",20,1.8)}</button></div>`;
 return chips+L.map(r=>{const l=last(r),n=r.type==="group"?members(r).length+1:0;return`<div class="kk-ch" data-r="${r.id}"><div class="kk-chav">${ravt(r,48)}</div><div class="kk-chm"><div class="kk-l1"><b>${E(roomName(r))}</b>${n?`<small>${n}</small>`:""}${r.pin?`<span class="pin"><svg viewBox="0 0 24 24" width="15" height="15" fill="#9a9da3"><path d="M14 3l7 7-2.200.6-3.300 3.300.5 4.100-1.500 1.500-3-3-4.800 4.800-1-1 4.800-4.800-3-3 1.500-1.500 4.100.5 3.300-3.300z"/></svg></span>`:""}</div><div class="kk-l2">${E(l.t)}</div></div><div class="kk-chr"><span>${listT(l.at)}</span>${r.unread?`<i class="kk-bd">${r.unread}</i>`:""}</div></div>`}).join("")+(L.length?"":`<div class="kk-empty">채팅방이 없어요</div>`)+`<div class="kk-pad"></div>`}

/* 로컬 탭 (스크롤만) */
function bLocal(){const cat=[["🎓","교육"],["🛍️","쇼핑"],["🍴","음식"],["🏛️","종교"],["🎬","미디어"],["💝","케어"],["🏠","라이프"],["⋯","더보기"]];
 return`<div class="kk-hero"><b>서울</b><p>📍 우리 동네 맛집 &amp; 커뮤니티 채널 소식 💬</p><span><svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M12 2.500a6.500 6.500 0 0 0-6.500 6.500c0 4.800 6.500 12 6.500 12s6.500-7.200 6.500-12A6.500 6.500 0 0 0 12 2.500zm0 8.800a2.300 2.300 0 1 1 0-4.600 2.300 2.300 0 0 1 0 4.600z"/></svg> 서울 ${ico("chevD",15,2.2,"#fff")}</span></div>
 <div class="kk-note">📢 <span>카카오톡 새로운 '로컬' 서비스 오픈!</span>${ico("chevR",16,2,"#999")}</div>
 <h3 class="kk-h3">카테고리</h3><div class="kk-cat">${cat.map(x=>`<div><i>${x[0]}</i><span>${x[1]}</span></div>`).join("")}</div>
 <h3 class="kk-h3">추천 채널</h3><div class="kk-card"><div><b>H마트 서울</b><p>안녕하세요, H마트에서 제공하는 다양한 소식 및 할인 정보를 알려드립니다.</p></div><i class="kk-hm">H</i></div>
 <div class="kk-card"><div><b>동네 맛집 모음</b><p>이번 주 인기 있는 동네 맛집과 새로 생긴 가게를 소개해 드려요.</p></div><i class="kk-hm" style="background:#ffb100">🍜</i></div><div class="kk-pad"></div>`}

/* 통화 탭 */
function bCalls(){
 return CALLS.map((x,i)=>{const r=roomOf(x.id),g=r&&r.type==="group",p=g?null:person(x.id),name=g?r.name:p.name,miss=x.res==="missed",
  icon=x.kind==="video"?S('<rect x="2.500" y="6" width="13" height="12" rx="2.500" fill="currentColor"/><path d="M15.500 10.500l6-3.500v10l-6-3.500z" fill="currentColor"/>',17,0):S(IC.phone,16,0,"currentColor","currentColor");
  return`<div class="kk-cl"><div class="kk-clav">${g?gav(members(r).concat([ME]),52):kav(p,52,.38)}</div><div class="kk-clm"><b class="${miss||x.res==="declined"?"miss":""}">${E(name)}${x.n>1?` <small>(${x.n})</small>`:""}</b><span>${x.res==="declined"?`<u class="x">${icoX(x.kind)}</u>`:`<u>${icon}</u>`}${x.t}</span></div><button class="kk-cb" data-call="${x.id}:voice">${S(IC.phone,19,0,"#1b1b1d","#1b1b1d")}</button><button class="kk-cb" data-call="${x.id}:video">${S('<rect x="2.500" y="6" width="13" height="12" rx="2.500" fill="currentColor"/><path d="M15.500 10.500l6-3.500v10l-6-3.500z" fill="currentColor"/>',20,0,"#1b1b1d")}</button></div>`}).join("")+`<div class="kk-pad"></div>`}
const icoX=k=>k==="video"?S('<rect x="2.500" y="6" width="13" height="12" rx="2.500" fill="currentColor"/><path d="M15.500 10.500l6-3.500v10l-6-3.500z" fill="currentColor"/>',17,0):S(IC.phone,16,0,"currentColor","currentColor");

/* 더보기 탭 (스크롤만) */
function bMore(){const G=[["지도",'<path d="M12 21s7-6.200 7-11.500a7 7 0 0 0-14 0C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>'],["택시",'<path d="M5 16.500l1.700-5.500h10.600L19 16.500M4 16.500h16v3.500H4zM8 11l1-4h6l1 4M7 20v1.500M17 20v1.500"/>'],["메일",'<rect x="3.500" y="6" width="17" height="12.500" rx="1"/><path d="M4 7l8 6.300L20 7"/>'],["캘린더",'<rect x="4" y="5.500" width="16" height="14.500" rx="1.500"/><path d="M8 3.500v4M16 3.500v4M9 13l2.200 2.200L15.500 11"/>'],
 ["톡클라우드",'<path d="M7 18.500a4.300 4.300 0 0 1-.6-8.500A5.800 5.800 0 0 1 17.500 9a4.800 4.800 0 0 1-.5 9.500z"/>'],["이모티콘",IC.emo],["선물하기",'<path d="M12 8L8.500 5.200A2.200 2.200 0 0 0 6.800 9M12 8l3.500-2.800A2.200 2.200 0 0 1 17.200 9"/><rect x="4" y="9" width="16" height="4" rx="1"/><path d="M5.500 13v6.500h13V13M12 9v10.500"/>'],["테마",'<path d="M9 3.500h6V9H9zM6 9h12v4.500H6zM7 13.500l.6 7h8.800l.6-7"/>'],
 ["오픈채팅",IC.openchat],["계정",'<circle cx="12" cy="12" r="9"/><path d="M9.500 8v8M9.500 12l4.800-4M10.800 11.500l3.600 4.500"/>'],["프로필 편집",'<rect x="4" y="4" width="13" height="16" rx="3.500"/><circle cx="10.500" cy="10" r="2.400"/><path d="M6.500 16.500c.8-2.500 5.200-2.500 6 0M15 17.500l5-5"/>'],["나의 채팅방",'<path d="M4 11a8 6.500 0 0 1 16 0 8 6.500 0 0 1-8 6.500c-.9 0-1.800-.1-2.600-.3L5 19.500l1-3.200A6.200 6.200 0 0 1 4 11z"/>'],
 ["친구 추가",IC.addf],["QR 코드",'<path d="M4 9V5h4M16 5h4v4M20 15v4h-4M8 19H4v-4M4 12h16"/>'],["채널",'<path d="M4 11a8 6.500 0 0 1 16 0 8 6.500 0 0 1-8 6.500c-.9 0-1.800-.1-2.600-.3L5 19.500l1-3.200A6.200 6.200 0 0 1 4 11z"/>'],["카카오팀",'<rect x="4" y="4" width="16" height="16" rx="5"/><path d="M12 8c-2.200 0-4 1.300-4 3s1.800 3 4 3l.6.0L14.500 16v-2.300C15.600 13.200 16 12.200 16 11c0-1.700-1.800-3-4-3z"/>']];
 return`<div class="kk-mp">${kav(ME,56,.38)}<div><b>${E(ME.name)}</b><span>${MY_EMAIL}</span></div></div><div class="kk-mg">${G.map((g,i)=>`<div data-soon><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1b1b1d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${g[1]}</svg><span>${g[0]}</span></div>`).join("")}</div>`}

/* 새 채팅 선택 시트 */
function pickSheet(c){const o=document.createElement("div");o.className="kk-sheet";o.innerHTML=`<div class="kk-sh"><div class="kk-sht"><b>대화상대 선택</b><button>${ico("x",22,2)}</button></div><div class="kk-shl">${FR.map(p=>`<div class="kk-fr" data-q="${p.id}">${kav(p,40,.38)}<span>${E(p.name)}</span></div>`).join("")}</div></div>`;
 c.querySelector(".kk").appendChild(o);o.onclick=e=>{if(e.target===o)o.remove()};o.querySelector("button").onclick=()=>o.remove();
 o.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{o.remove();openRoom(b.dataset.q)})}

/* ---------- 프로필 ---------- */
function vProfile(c){const p=person(KS.profile),me=p.id==="me",bg=["#3b4a5a,#1b232b","#3c4d57,#1c2a2c","#4a4663,#1f1d30"][p.k];
 c.innerHTML=`<div class="kk-pf" style="background:linear-gradient(180deg,${bg.split(",")[0]},${bg.split(",")[1]})"><div class="kk-pft"><button id="kpx">${ico("x",28,1.8,"#fff")}</button><div><button data-soon>${ico("gear",26,1.6,"#fff")}</button></div></div>
 <div class="kk-pfm">${kav(p,104,.38)}<b>${E(p.name)}</b></div>
 <div class="kk-pfa"><button data-a="chat"><i>${S('<path d="M12 3.500c5.500 0 9.500 3.400 9.500 7.800S17.500 19 12 19c-1 0-1.900-.1-2.800-.3L5 20.800l1-3.500C4 16 2.500 13.800 2.500 11.300 2.500 6.900 6.500 3.500 12 3.500z"/>',30,1.6,"#fff")}</i><span>${me?"나와의 채팅":"1:1 채팅"}</span></button>
 ${me?"":`<button data-a="voice"><i>${S(IC.phone,28,1.6,"#fff")}</i><span>보이스톡</span></button><button data-a="video"><i>${S(IC.video,30,1.6,"#fff")}</i><span>페이스톡</span></button>`}</div></div>`;
 c.querySelector("#kpx").onclick=()=>{KS.profile=null;refresh()};
 c.querySelectorAll("[data-soon]").forEach(b=>b.onclick=()=>showToast("이 기능은 지원하지 않아요"));
 c.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{const a=b.dataset.a;if(a==="chat"){KS.profile=null;openRoom(p.id)}else startK(a,p.id)})}

/* ---------- 채팅방 ---------- */
function openRoom(id){let r=roomOf(id);if(!r){r={id,type:"dm",unread:0,msgs:[]};ROOMS.push(r)}
 r.unread=0;KS.room=id;KS.profile=null;refresh()}
function vRoom(c){const r=roomOf(KS.room),n=r.type==="group"?members(r).length+1:0;
 let h="",prev=null;
 r.msgs.forEach((m,i)=>{const nx=r.msgs[i+1],pv=r.msgs[i-1],day=m.at.toDateString();
  if(!pv||pv.at.toDateString()!==day)h+=DL(m.at);
  const showT=!nx||nx.w!==m.w||KT(nx.at)!==KT(m.at)||nx.at.toDateString()!==day,mine=m.w==="me",p=mine?ME:person(m.w);
  const f=!pv||pv.w!==m.w||pv.at.toDateString()!==day;
  const l=!nx||nx.w!==m.w||nx.at.toDateString()!==day;
  if(mine)h+=`<div class="kk-m me ${f?"f":""} ${l?"l":""}">${showT?`<small>${KT(m.at)}</small>`:""}<span class="b">${E(m.t)}</span></div>`;
  else h+=`<div class="kk-m ot ${f?"f":""} ${l?"l":""}">${f?`<button class="av" data-p="${p.id}">${kav(p,36,.36)}</button>`:`<i class="av"></i>`}<div class="col">${f?`<em>${E(p.name)}</em>`:""}<div class="row"><span class="b">${E(m.t)}</span>${showT?`<small>${KT(m.at)}</small>`:""}</div></div></div>`});
 c.innerHTML=`<div class="kk room"><div class="kk-rh"><button id="krb" class="kg c">${ico("back",24,2.2,"#16202b")}</button><div class="tt" ${r.type==="dm"?`data-p="${r.id}"`:""}><b>${E(roomName(r))}</b>${n?`<b class="n">${n}</b>`:""}</div><div class="kg p"><button data-soon>${ico("search",24,1.9,"#16202b")}</button><button data-soon>${ico("menu",24,1.9,"#16202b")}</button></div></div>
 <div class="kk-rb" id="krbody">${h||DL(base())}</div>
 <div class="kk-in"><button data-soon class="kpl">${ico("plus",22,2.3,"#111")}</button><input id="kki" placeholder="메시지 입력" autocomplete="off"><button class="ksd" id="ksd">${SMI(22)}</button></div></div>`;
 const body=$("krbody");let touched=false;const stick=()=>{if(!touched&&body.isConnected)body.scrollTop=body.scrollHeight};
 stick();requestAnimationFrame(stick);[60,200,500].forEach(ms=>setTimeout(stick,ms));   /* 화면이 다 그려진 뒤에도 맨 아래로 */
 ["touchstart","wheel","pointerdown"].forEach(ev=>body.addEventListener(ev,()=>{touched=true},{passive:true}));
 $("krb").onclick=()=>{KS.room=null;refresh()};
 c.querySelectorAll("[data-soon]").forEach(b=>b.onclick=()=>showToast("이 기능은 지원하지 않아요"));
 c.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{KS.profile=b.dataset.p;refresh()});
 const inp=$("kki"),sd=$("ksd"),upd=()=>{const t=inp.value.trim();sd.classList.toggle("on",!!t);sd.innerHTML=t?ico("up",20,2.5,"#1b1b1d"):SMI(22)};
 inp.oninput=upd;inp.onkeydown=e=>{if(e.key==="Enter"&&!e.isComposing)send()};
 const send=()=>{const t=inp.value.trim();if(!t)return;r.msgs.push({w:"me",t,at:base()});inp.value="";refresh();$("kki")&&$("kki").focus();scheduleReply(r,t)};
 sd.onclick=send}
function scheduleReply(r,txt){if(r.id==="me")return;if(r.type==="dm"&&person(r.id).ch)return;
 const AL=r.type==="dm"?autoReplyFor(r.id,txt):null;   // 키워드 자동답변 (autoreply.js)
 if(AL)return playReplies(AL,l=>{r.msgs.push({w:r.id,t:l,at:base()});const here=state.cur==="appScreen"&&state.app==="kakao";
  if(here&&KS.room===r.id)refresh();else{r.unread=(r.unread||0)+1;if(here&&!KS.room&&!KS.profile)refresh()}});
 setTimeout(()=>{const who=r.type==="group"?r.members[Math.floor(Math.random()*r.members.length)]:r.id,pool=REPLY[who]||REPLY._,t=pool[Math.floor(Math.random()*pool.length)];
 r.msgs.push({w:who,t,at:base()});const here=state.cur==="appScreen"&&state.app==="kakao";
 if(here&&KS.room===r.id)refresh();else{r.unread=(r.unread||0)+1;if(here&&!KS.room&&!KS.profile)refresh()}},1200+Math.random()*1600)}

/* ---------- 보이스톡 / 페이스톡 ---------- */
function startK(kind,id){const dev=$("device");dev.querySelector(".kcall")?.remove();
 const r=roomOf(id),g=r&&r.type==="group",p=g?null:person(id),name=g?r.name:p.name,vid=kind==="video";
 CALLS.unshift({id,kind:vid?"video":"voice",res:"out",n:1,t:"방금 전"});
 const o=document.createElement("div");o.className="kcall "+(vid?"face":"voice");
 const mem=g?members(r).concat([ME]).slice(0,4):null,av=g?gav(mem,vid?120:132):kav(p,vid?120:132,.38);
 o.innerHTML=`<div class="kc-top"><small>${vid?"페이스톡":"보이스톡"}</small><b>${E(name)}${g?` <u>${members(r).length+1}</u>`:""}</b><span id="kcs">연결 중…</span></div>
 <div class="kc-av">${av}</div>${vid?`<div class="kc-me">${kav(ME,56,.38)}<small>나</small></div>`:""}
 <div class="kc-sub" id="kcd"></div>
 <div class="kc-btn"><button>${S(IC.mute,28,1.7,"#fff")}<span>음소거</span></button>${vid?`<button>${S(IC.cam,28,1.7,"#fff")}<span>카메라 전환</span></button>`:`<button>${S(IC.speaker,28,1.7,"#fff")}<span>스피커</span></button>`}<button class="end" id="kce">${S('<path d="M3 14c5-5 13-5 18 0l-3 3-3-1.500v-2.500a10 10 0 0 0-6 0v2.500L6 17z"/>',32,1,"#fff","#fff")}<span>종료</span></button></div>`;
 dev.appendChild(o);dev.classList.add("kcalling");
 const T=[],later=(f,ms)=>{const h=setTimeout(f,ms);T.push(h)},cs=o.querySelector("#kcs"),cd=o.querySelector("#kcd");let iv=null;
 const close=()=>{T.forEach(clearTimeout);clearInterval(iv);o.remove();dev.classList.remove("kcalling")};
 const sec=()=>{let s=0;cs.textContent="00:00";iv=setInterval(()=>{if(!o.isConnected)return close();s++;cs.textContent=`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`},1000)};
 const bye=()=>{clearInterval(iv);cs.textContent="통화 종료";later(close,1400)};
 const S2=!g&&(DATA.callScripts||{})[id];
 later(()=>{sec();if(!S2)return;const n=(KS.cs[id]=KS.cs[id]||0);KS.cs[id]=n+1;const L=S2[n%S2.length];let i=0;
  const next=()=>{if(!o.isConnected)return;if(i>=L.length)return later(bye,1800);const line=L[i++],k=line.indexOf(":"),who=line.slice(0,k).trim(),txt=line.slice(k+1).trim(),d=document.createElement("div");d.innerHTML=`<b>${E(who)}:</b> ${E(txt)}`;cd.appendChild(d);while(cd.children.length>2)cd.firstChild.remove();later(next,1300+txt.length*70)};next()},2400);
 o.querySelector("#kce").onclick=close;
 o.querySelectorAll(".kc-btn button:not(.end)").forEach(b=>b.onclick=()=>b.classList.toggle("act"));
 if(state.app==="kakao"&&!KS.room&&!KS.profile&&KS.tab===3)setTimeout(refresh,0)}

/* ---------- 앱 등록 ---------- */
names.kakao="카카오톡";
ICONS.kakao=`<svg viewBox="0 0 60 60"><defs><linearGradient id="kkY" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffec55"/><stop offset=".18" stop-color="#fbe017"/><stop offset=".85" stop-color="#f7d500"/><stop offset="1" stop-color="#edc400"/></linearGradient><linearGradient id="kkB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b2520"/><stop offset="1" stop-color="#3e1d19"/></linearGradient></defs><rect width="60" height="60" fill="url(#kkY)"/><path d="M14.6 37.5L15.4 50.2L27 42.2z" fill="url(#kkB)" stroke="#3e1d19" stroke-width="1.4" stroke-linejoin="round"/><ellipse cx="29.8" cy="27.4" rx="22.6" ry="16.6" fill="url(#kkB)"/><text x="29.8" y="33.2" text-anchor="middle" textLength="32.5" lengthAdjust="spacingAndGlyphs" font-family="'Arial Rounded MT Bold',Arial,Helvetica,sans-serif" font-weight="900" font-size="14.8" fill="#fbe04a" stroke="#fbe04a" stroke-width=".5" stroke-linejoin="round">TALK</text></svg>`;
document.querySelectorAll(".icon.kakao").forEach(el=>el.innerHTML=ICONS.kakao);
{const _ok=openApp;openApp=function(a){document.querySelector(".kcall")?.remove();$("device").classList.remove("kcalling");if(a==="kakao"){KS.srch=null;KS.profile=null}_ok(a)}}
{const _rk=renderApp;let was=false;renderApp=function(){_rk();if(state.app==="kakao"){was=true;rKakao($("appContent"))}else if(was){was=false;$("appScreen").style.background="";$("appScreen").classList.remove("dark")}}}
window.KK={state:KS,rooms:ROOMS,friends:FR};
})();
