/* 네이버 앱 (kakao.js 다음에 로드) — 홈=증시, 투데이=뉴스, 나머지 탭은 디자인만 */
(()=>{
const E=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const NS={tab:1,sel:null,per:1,art:null,bk:false,mk:"kr",tabs:{}};
/* ---------- 시세 (가상 데이터) : id,이름,코드,현재가,등락%,소수자리,구분 ---------- */
const MK=[["kospi","코스피","KOSPI",5704.73,-.54,2,"idx"],["kosdaq","코스닥","KOSDAQ",1042.18,.31,2,"idx"],["spx","S&P 500","SPX",7757.12,.27,2,"idx"],["ndq","나스닥","NASDAQ",26318.4,.41,2,"idx"],["usd","원/달러","USD/KRW",1326.1,.08,2,"idx"],
["ss","삼성전자","005930",118400,-.67,0,"kr"],["hy","SK하이닉스","000660",612000,1.12,0,"kr"],["hd","현대차","005380",284500,-.35,0,"kr"],["nv","NAVER","035420",241000,.42,0,"kr"],["kk","카카오","035720",58300,-1.02,0,"kr"],["lg","LG에너지솔루션","373220",428000,.71,0,"kr"],["kia","기아","000270",131200,.23,0,"kr"],
["tsla","테슬라","TSLA",438.2,2.14,2,"us"],["nvda","엔비디아","NVDA",214.65,.88,2,"us"],["aapl","애플","AAPL",281.3,-.21,2,"us"],["msft","마이크로소프트","MSFT",562.1,.35,2,"us"],["goog","알파벳","GOOGL",301.45,-.46,2,"us"],["amzn","아마존","AMZN",247.8,.64,2,"us"]]
.map(a=>({id:a[0],n:a[1],c:a[2],p:a[3],b:a[3]/(1+a[4]/100),d:a[5],k:a[6],hi:a[3]*1.006,lo:a[3]*.991,v:Math.round(a[3]*37+4e5)}));
const G=id=>MK.find(x=>x.id===id),pc=s=>(s.p/s.b-1)*100,cl=s=>pc(s)>=0?"up":"dn",fx=(v,d)=>v.toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
const pt=s=>`${pc(s)>=0?"▲":"▼"} ${Math.abs(pc(s)).toFixed(2)}%`,px=s=>(s.k==="us"?"$":"")+fx(s.p,s.d);
function tick(){MK.forEach(s=>{s.p*=1+(Math.random()-.5)*.0014;s.hi=Math.max(s.hi,s.p);s.lo=Math.min(s.lo,s.p)});
 document.querySelectorAll("[data-px]").forEach(e=>{const s=G(e.dataset.px);e.textContent=px(s)});
 document.querySelectorAll("[data-pc]").forEach(e=>{const s=G(e.dataset.pc);e.textContent=pt(s);e.className=cl(s)});
 document.querySelectorAll("[data-pp]").forEach(e=>{const s=G(e.dataset.pp);e.innerHTML=`${(pc(s)>=0?"+":"-")+fx(Math.abs(s.p-s.b),s.d)} <span class="${cl(s)}">${pt(s)}</span>`;e.className=cl(s)})}
setInterval(()=>{if(state.app==="naver"&&NS.tab===1)tick()},2500);
/* ---------- 아이콘 ---------- */
const S=(p,w=24,s=1.9,c="currentColor",f="none")=>`<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="${f}" stroke="${c}" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const NLOGO=(w=30)=>`<svg viewBox="0 0 24 24" width="${w}" height="${w}"><path d="M3 3h6.2l5.6 8.6V3H21v18h-6.2L9.2 12.4V21H3z" fill="#03c75a"/></svg>`;
const TI=[
 on=>`<svg viewBox="0 0 30 30" width="30" height="30"><defs><linearGradient id="nvs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a3df0"/><stop offset="1" stop-color="#9b5cf6"/></linearGradient></defs><rect x="2" y="3" width="26" height="25" rx="7" fill="url(#nvs)"/><path d="M10 6c0-3 10-3 10 0" stroke="#fff" stroke-width="2" fill="none"/><text x="15" y="22" text-anchor="middle" font-size="11" font-weight="900" fill="#fff" font-family="Arial">N+</text></svg>`,
 on=>on?`<svg viewBox="0 0 30 30" width="30" height="30"><path d="M15 2l11 6v14l-11 6L4 22V8z" fill="#222" stroke="#222" stroke-width="3" stroke-linejoin="round"/><path d="M10.5 21V9h3.3l3.8 6V9h2.9v12h-3.3l-3.8-6v6z" fill="#fff"/></svg>`:`<svg viewBox="0 0 30 30" width="30" height="30"><path d="M15 3l10 5.5v13L15 27 5 21.500v-13z" fill="none" stroke="#333" stroke-width="2.600" stroke-linejoin="round"/><path d="M11 20V10h2.700l3.500 5.300V10H20v10h-2.700l-3.500-5.300V20z" fill="#333"/></svg>`,
 on=>`<svg viewBox="0 0 30 30" width="30" height="30"><rect x="4" y="4" width="22" height="22" rx="6" fill="${on?"#222":"none"}" stroke="#333" stroke-width="2"/><path d="M9.500 11.500h11M9.500 16h7M9.500 20.500h4" stroke="${on?"#fff":"#333"}" stroke-width="2" stroke-linecap="round"/></svg>`,
 on=>`<svg viewBox="0 0 30 30" width="30" height="30"><circle cx="15" cy="15" r="11" fill="none" stroke="#333" stroke-width="2.200"/><path d="M12 10.500l8 4.500-8 4.500z" fill="#333" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>`,
 on=>`<span style="width:30px;height:30px;border-radius:50%;background:#e5e6ea;display:grid;place-items:center;font-size:18px;border:1px solid #ddd">🐱</span>`];
/* ---------- 차트 ---------- */
const rnd=sd=>()=>(sd=(sd*1664525+1013904223)%4294967296)/4294967296;
function series(s,per){const n=[48,56,60,72][per],r=rnd([...s.id].reduce((a,c)=>a+c.charCodeAt(0),per*97)),v=[.004,.012,.03,.07][per];let w=[0];for(let i=1;i<n;i++)w.push(w[i-1]+(r()-.5));const m=Math.max(...w.map(Math.abs))||1;
 return w.map((x,i)=>s.p*(1+(x-w[n-1])/m*v*(per?1:.6)))}
function chart(s,per){const a=series(s,per),W=340,H=200,mn=Math.min(...a),mx=Math.max(...a),y=v=>14+(H-34)*(1-(v-mn)/(mx-mn||1)),x=i=>i/(a.length-1)*W,col=pc(s)>=0?"#e8404a":"#2a6ef0",d=a.map((v,i)=>(i?"L":"M")+x(i).toFixed(1)+" "+y(v).toFixed(1)).join("");
 return{a,svg:`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" id="nvsv"><defs><linearGradient id="nvg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".22"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs><path d="${d}L${W} ${H}L0 ${H}Z" fill="url(#nvg)"/><path d="${d}" fill="none" stroke="${col}" stroke-width="2.200" vector-effect="non-scaling-stroke"/><line id="nvl" x1="0" x2="0" y1="0" y2="${H}" stroke="#999" stroke-width="1" stroke-dasharray="3" visibility="hidden" vector-effect="non-scaling-stroke"/></svg><div class="nv-tip" id="nvt"> 최고 ${fx(mx,s.d)} · 최저 ${fx(mn,s.d)}</div>`}}
/* ---------- 홈 ---------- */
function vHome(){
 const cards=`<button class="nv-cd" data-w><div><b>구름 조금 18.0°</b><small>작도시, 한국</small></div><span style="font-size:34px">⛅</span></button>`+["kospi","kosdaq","spx","ndq","usd"].map(i=>{const s=G(i);return`<button class="nv-cd" data-s="${i}"><div><b data-px="${i}">${px(s)}</b><small>${s.n} <span data-pc="${i}" class="${cl(s)}">${pt(s)}</span></small></div></button>`}).join("");
 const L=MK.filter(s=>s.k===NS.mk);
 return`<div class="nv-top"><button data-t="menu">${S('<path d="M4 7h16M4 12h16M4 17h16"/>',30,1.8)}</button><span class="nv-pay" style="margin-left:12px;margin-right:auto">pay</span><button>${S('<path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15zM10 21h4"/>',28,1.7)}</button></div>
 <div class="nv-sr"><em>AI탭에서 대화하기</em>${NLOGO(32)}<span style="display:flex;gap:16px;align-items:center">${S('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.500"/>',30,2.300,"#16c3b5")}<span style="color:#3a7bff;font-size:28px">✦</span></span></div>
 <div class="nv-ban"><div>버거하우스<b>새로운 아이콘이 왔어요!</b></div><span>🍔</span></div>
 <div class="nv-cards">${cards}</div>
 <div class="nv-sec"><h3>증시 <small style="font-size:12.5px;color:#999;font-weight:500">실시간 · 가상 시세</small></h3><div class="nv-seg">${[["kr","국내"],["us","해외"]].map(a=>`<button data-mk="${a[0]}" class="${NS.mk===a[0]?"on":""}">${a[1]}</button>`).join("")}</div>
 ${L.map(s=>`<button class="nv-row" data-s="${s.id}"><div><b>${s.n}</b><small>${s.c}</small></div><div><b data-px="${s.id}">${px(s)}</b><small data-pc="${s.id}" class="${cl(s)}">${pt(s)}</small></div></button>`).join("")}</div>
 <div class="nv-sec" style="margin-top:0;border-radius:0;padding-top:4px"><h3>환율 계산기</h3><div class="nv-row" style="border:1px solid #e1e3e8;border-radius:12px;padding:12px 14px"><span style="color:#888">미국 USD</span><input id="nvu" value="1" inputmode="decimal" style="width:90px;border:0;outline:0;text-align:right;font-size:18px;font-weight:700"></div><div class="nv-row" style="border:1px solid #e1e3e8;border-radius:12px;padding:12px 14px;margin-top:8px"><span style="color:#888">대한민국 KRW</span><b id="nvk">${fx(G("usd").p,2)} 원</b></div></div><div style="height:40px;background:#fff"></div>`}
function vDetail(){const s=G(NS.sel),c=chart(s,NS.per);
 return`<div class="nv-dh"><button data-t="back">${S('<path d="M15 4l-8 8 8 8"/>',28,2)}</button><b>${s.n}</b><small style="color:#999">${s.c}</small></div>
 <div class="nv-px"><h1 data-px="${s.id}">${px(s)}</h1><div data-pp="${s.id}" class="${cl(s)}">${pc(s)>=0?"+":"-"}${fx(Math.abs(s.p-s.b),s.d)} <span class="${cl(s)}">${pt(s)}</span></div></div>
 <div class="nv-ch" id="nvc">${c.svg}</div>
 <div class="nv-pr">${["1일","1주","3개월","1년"].map((t,i)=>`<button data-pr="${i}" class="${NS.per===i?"on":""}">${t}</button>`).join("")}</div>
 <div class="nv-g">${[["전일 종가",fx(s.b,s.d)],["시가",fx(s.b*1.002,s.d)],["고가",fx(s.hi,s.d)],["저가",fx(s.lo,s.d)],["거래량",s.k==="idx"?"-":fx(s.v,0)],["상태","장중"]].map(a=>`<div>${a[0]}<b>${a[1]}</b></div>`).join("")}</div>`}
/* ---------- 투데이 (뉴스) ---------- */
const PUB=[["작도일보","📰","300만",[["작도시, 내년 시내버스 노선 전면 개편…환승 체계 손본다","🚌"],["시광구 달빛로 보행자 전용거리 시범 운영 개시","🚶"],["작도 센트럴파크 단지 어린이 안전 점검 강화","🏢"],["올가을 단풍 절정 앞당겨져…달맞이 수목원 방문객 급증","🍁"],["시광강변공원 야간 조명 교체 공사 이번 주 마무리","🌃"]],[["시광 레이크뷰 상가 공실률 2년 만에 최저","🏬"],["작도문화회관 주말 공연 3건 매진 행렬","🎭"],["심야 약국 지원사업 확대…시민 접근성 개선","💊"],["시광역 3호선 출퇴근 혼잡도 소폭 개선","🚇"],["작도시립도서관 무료 Wi-Fi 구역 넓힌다","📚"]]],
["시광신문","🗞️","120만",[["시광소방서, 가을철 화재 예방 특별 점검 돌입","🚒"],["시광구청 주민자치센터 디지털 교육 확대","💻"],["시광종합병원 응급의료센터 야간 인력 보강","🏥"],["관내 초등학교 통학로 개선 사업 착수","🏫"],["시광중학교 학부모 설명회 내일 개최","📝"]],[["달빛로 맛집 거리 '야시장' 열린다","🍢"],["국밥부터 마라탕까지…야식 거리 인기","🍜"],["시광프라자 입점 학원 안전 합동 점검","🏬"],["작도체육관 생활체육 강좌 수강생 모집","🏸"],["시광우체국 택배 접수 마감 시간 연장","📦"]]],
["한울경제","💹","85만",[["코스피 장중 약보합…외국인 매도에 숨 고르기","📉"],["원·달러 환율 1,320원대 중반 등락","💵"],["반도체 대형주 강세…시총 상위 종목 혼조","💾"],["기준금리 동결 기대감…채권시장 관망세","🏦"],["미국 증시 혼조 마감, 나스닥 소폭 상승","🗽"]],[["개인 투자자 순매수 이어져…거래대금 증가","📈"],["배당주 펀드로 자금 유입 늘어","💰"],["공모주 청약 경쟁률 상승…IPO 시장 온기","🧾"],["예금 금리 인하 조짐…투자처 고민 커져","🪙"],["ETF 순자산 사상 최대 경신","📊"]]],
["달빛스포츠","⚽","64만",[["작도시 프로축구단 홈 3연승 질주","⚽"],["시광구 생활체육대회 이번 주말 개막","🏅"],["e스포츠 리그 결승 앞두고 티켓 예매 오픈","🎮"],["마라톤 동호인 5천 명 시광강변 달린다","🏃"],["농구 대표팀 평가전 하루 앞으로","🏀"]],[["가을 야외 '달빛 콘서트' 라인업 공개","🎤"],["신작 영화 주말 박스오피스 1위 예상","🎬"],["작도 아쿠아월드 겨울 시즌 준비 돌입","🎢"],["웹툰 원작 드라마 촬영지 시광구 인기","📺"],["도서관 가을 독서주간 행사 풍성","📖"]]]];
const ISS=[[["민선 9기 작도시정 출범","시민 소통 창구 확대, 지역화폐 월 한도 상향 검토"],["2027년 4월 보궐선거","후보 등록 일정과 주요 쟁점을 정리했어요"]],[["가을 단풍 명소 총정리","달맞이 수목원 등 이번 주말 절정 코스 안내"],["겨울 시즌 개장 임박","작도 아쿠아월드 이벤트와 요금 한눈에"]],[["금리 동결 전망","시장 참가자들이 보는 다음 일정과 변수"],["공모주 캘린더","이번 달 청약 일정 및 상장 예정 종목"]],[["프로축구 순위 경쟁","남은 5경기 시나리오와 우승 확률"],["가을 공연 캘린더","주말 야외 콘서트·전시 일정 모음"]]];
const BRK=["작도시 시광구 일대 정전…복구 작업 중","시광대교 하행선 3중 추돌…일부 정체","기상청 '내일 전국 강풍 주의보' 발표","코스피 5,700선 등락…외국인 순매도 지속","작도 아쿠아월드 겨울 개장 일정 확정"];
const GR=["#dfe9ff,#b8cdf5","#ffe6d5,#f9bf9e","#dcf5e4,#a9dfbd","#f3e1ff,#d3adf0","#fff3c9,#f5d97a"];
const tm=m=>{const d=new Date(now().getTime()-m*6e4);return`${d.getMonth()+1}월 ${d.getDate()}일 ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`};
const PL=["관계자는 “현재 상황을 면밀히 살피며 필요한 조치를 이어가겠다”고 밝혔다.","이번 사안을 두고 지역 주민들 사이에서는 기대와 우려가 엇갈리는 분위기다.","전문가들은 향후 흐름을 조금 더 지켜봐야 한다고 입을 모았다.","관계 기관은 협의를 거쳐 후속 대책을 순차적으로 발표할 계획이다.","최근 몇 달 사이 인근 지역에서도 비슷한 움직임이 이어진 것으로 알려졌다.","자세한 내용은 추후 공지를 통해 안내될 예정이다."];
function vNews(){
 const nav=`<div class="nv-nav">${NLOGO(32)}${["뉴스","엔터","스포츠","경제","쇼핑"].map((t,i)=>`<span class="${i?"":"on"}">${t}</span>`).join("")}<span style="margin-left:auto;color:#03c75a">${S('<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500L20 20"/>',28,2.200)}</span></div>`;
 const bk=`<div class="nv-bk"><button data-bk><span class="tg">속보</span><span class="hd">${E(BRK[0])}</span><span class="sr">한울뉴스<br>${tm(7).slice(-5)}</span>${S(NS.bk?'<path d="M5 15l7-7 7 7"/>':'<path d="M5 9l7 7 7-7"/>',20,1.800,"#555")}</button>${NS.bk?`<div class="ls">${BRK.slice(1).map((t,i)=>`<div>${E(t)}</div>`).join("")}</div>`:""}</div>`;
 const blocks=PUB.map((p,pi)=>{const t=NS.tabs[pi]||0,L=p[3+t];return`<div class="nv-gap"></div><div class="nv-pb"><div class="nv-ph"><span class="nv-lg">${p[1]}</span><div><b>${p[0]}<u>★ ${p[2]}</u></b><small>${tm(30+pi*47)}</small></div><i>⋮</i></div>
 <div class="nv-tb"><button data-tb="${pi}:0" class="${t?"":"on"}">${["주요뉴스","주요뉴스"][0]}</button><button data-tb="${pi}:1" class="${t?"on":""}">${["로컬이슈 & 화제"][0]}</button></div>
 ${L.slice(0,4).map((h,i)=>`<button class="nv-hl" data-a="${pi}:${t}:${i}">${E(h[0])}</button>`).join("")}
 <div class="nv-im">${[0,1].map(i=>{const h=L[i];return`<button data-a="${pi}:${t}:${i}"><i style="background:linear-gradient(135deg,${GR[(pi+i+t)%5]})">${h[1]}</i><span>${E(h[0])}</span></button>`}).join("")}</div><div class="nv-is">${ISS[pi].map(x=>`<div><u>이슈</u><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div></div>`}).join("");
 return nav+`<div class="nv-b" style="flex:1">`+`<div class="nv-ad"><i>🍲</i><div><b>공부하다 출출한 순간,</b><small>따뜻함을 채우는 시간 수프하우스</small></div></div><div class="nv-ed"><b>언론사편집</b><span>기자 ▾</span><span>연재 ▾</span><em>MY ›</em></div>${bk}${blocks}<div style="height:24px"></div></div>`}
function vArt(){const[pi,t,i]=NS.art.split(":").map(Number),p=PUB[pi],h=p[3+t][i],b=[...h[0]].reduce((a,c)=>a+c.charCodeAt(0),0);
 return`<div class="nv-dh"><button data-t="aback">${S('<path d="M15 4l-8 8 8 8"/>',28,2)}</button><b style="font-size:16px">${p[0]}</b></div><div class="nv-b"><div class="nv-art"><h1>${E(h[0])}</h1><small>${p[0]} · 입력 ${tm(30+pi*47+i*9)}</small><div class="im" style="background:linear-gradient(135deg,${GR[b%5]})">${h[1]}</div>
 <p>${E(h[0])}. 이번 소식은 작도시와 인근 지역을 중심으로 관심을 모으고 있다.</p>${[0,1,2,3].map(k=>`<p>${PL[(b+k*2)%PL.length]}</p>`).join("")}<p style="color:#888;font-size:14px">ⓒ ${p[0]} 무단 전재 및 재배포 금지</p></div></div>`}
/* ---------- 디자인 전용 탭 ---------- */
const vShop=()=>`<div class="nv-top"><b style="font-size:22px">${NLOGO(26)} 쇼핑</b></div><div class="nv-b nv-pg"><h2>오늘의 특가</h2><div class="gr">${[["🧥","울 블렌드 코트","59,000원"],["👟","데일리 러닝화","39,900원"],["🎧","무선 이어폰","29,800원"],["🍎","제철 과일 세트","19,900원"]].map(a=>`<div class="pd"><i>${a[0]}</i><p>${a[1]}</p><b>${a[2]}</b></div>`).join("")}</div></div>`;
const vClip=()=>`<div class="nv-clip">🎬<p>@작도일상<br>시광강변의 가을 산책 🍂</p><div><span>♡</span><span>💬</span><span>↗</span></div></div>`;
const vMy=()=>`<div class="nv-me"><i>🐱</i><div><b>이건</b><br><small style="color:#888">내 활동 · 프로필 관리</small></div></div><div class="nv-b"><div class="nv-mn">${["최근 본","찜한 상품","구독","저장한 글","설정"].map(t=>`<div><span>${t}</span><span style="color:#bbb">›</span></div>`).join("")}</div></div>`;
/* ---------- 렌더 ---------- */
function rNaver(c){const a=$("appScreen");a.style.background="#edf0f6";state.dark=false;a.classList.remove("dark");theme();
 const t=NS.tab,det=t===1&&NS.sel,art=t===2&&NS.art,white=t===2||det||t===0||t===4;
 let body=det?vDetail():art?vArt():[vShop,()=>vHome(),vNews,vClip,vMy][t]();
 const scroll=!det&&!art&&t!==2&&t!==3&&t!==0&&t!==4&&t!==2;
 c.innerHTML=`<div class="nv ${white?"w":""}">${(t===2&&!art)||t===3?body:`<div class="nv-b">${body}</div>`}<div class="nv-t">${[0,1,2,3,4].map(i=>`${i===1?'<span class="nvsp"></span>':""}<button data-n="${i}" class="${i===t?"on":""}"><i>${TI[i](i===t)}</i>${["쇼핑","홈","투데이","클립","마이"][i]}</button>`).join("")}</div></div>`.replace('<span class="nvsp"></span>','').replace(/(<button data-n="1")/,'<span class="nvsp"></span>$1');
 if(!white||t===1)c.firstChild.style.background=det?"#fff":"#edf0f6";
 bind(c)}
function bind(c){
 c.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>{NS.tab=+b.dataset.n;NS.sel=null;NS.art=null;rNaver(c)});
 c.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{NS.sel=b.dataset.s;NS.per=0;rNaver(c)});
 c.querySelectorAll("[data-mk]").forEach(b=>b.onclick=()=>{NS.mk=b.dataset.mk;rNaver(c)});
 c.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{NS.per=+b.dataset.pr;rNaver(c)});
 c.querySelectorAll("[data-t=back]").forEach(b=>b.onclick=()=>{NS.sel=null;rNaver(c)});
 c.querySelectorAll("[data-t=aback]").forEach(b=>b.onclick=()=>{NS.art=null;rNaver(c)});
 c.querySelectorAll("[data-t=menu],[data-w]").forEach(b=>b.onclick=()=>showToast("이 기능은 지원하지 않아요"));
 c.querySelectorAll("[data-bk]").forEach(b=>b.onclick=()=>{NS.bk=!NS.bk;rNaver(c)});
 c.querySelectorAll("[data-tb]").forEach(b=>b.onclick=()=>{const[p,t]=b.dataset.tb.split(":");const y=c.querySelector(".nv-b").scrollTop;NS.tabs[p]=+t;rNaver(c);c.querySelector(".nv-b").scrollTop=y});
 c.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{NS.art=b.dataset.a;rNaver(c)});
 const u=$("nvu");if(u)u.oninput=()=>{const v=parseFloat(u.value.replace(/,/g,""))||0;$("nvk").textContent=fx(v*G("usd").p,2)+" 원"};
 const ch=$("nvc");if(ch){const s=G(NS.sel),d=chart(s,NS.per),mv=e=>{const r=ch.getBoundingClientRect(),sc=r.width/ (ch.offsetWidth||r.width),f=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)),i=Math.round(f*(d.a.length-1)),l=$("nvl");l.setAttribute("x1",f*340);l.setAttribute("x2",f*340);l.setAttribute("visibility","visible");$("nvt").textContent=fx(d.a[i],s.d)};
  ch.onpointermove=mv;ch.onpointerdown=mv;ch.onpointerleave=()=>{$("nvl").setAttribute("visibility","hidden");$("nvt").textContent=" 최고 "+fx(Math.max(...d.a),s.d)+" · 최저 "+fx(Math.min(...d.a),s.d)}}}
/* ---------- 앱 등록 ---------- */
names.naver="네이버";
ICONS.naver=`<svg viewBox="0 0 60 60"><defs><linearGradient id="nvI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fe27a"/><stop offset="1" stop-color="#05bd57"/></linearGradient></defs><rect width="60" height="60" fill="url(#nvI)"/><path d="M17.500 15.500h8.600l8 12.300V15.500h8.400v29h-8.600l-8-12.300v12.300h-8.400z" fill="#e3f8ec"/></svg>`;
document.querySelectorAll(".icon.naver").forEach(el=>el.innerHTML=ICONS.naver);
{const _o=openApp;openApp=function(a){if(a==="naver"){NS.sel=null;NS.art=null}_o(a)}}
{const _r=renderApp;let was=false;renderApp=function(){_r();if(state.app==="naver"){was=true;rNaver($("appContent"))}else if(was){was=false;$("appScreen").style.background="";$("appScreen").classList.remove("dark")}}}
})();
