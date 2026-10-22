/* 앱 화면 (iOS 26 스타일). 내용은 data.js 에서 수정 */
state.notices=DATA.notices;state.correctCode=DATA.passcode;
const UI={tab:{},pc:null,num:"",ph:null,wx:null,note:null,sw:{run:false,t0:0,el:0,laps:[]},tm:{run:false,end:0,left:0,sel:[0,2,30]},al:DATA.alarms.map(a=>({...a}))};
const ic=(p,s=24,w=2)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const P={back:'<path d="M15 5l-7 7 7 7"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',more:'<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',filter:'<path d="M4 8h16M7 12.500h10M10 17h4"/>',compose:'<path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5M17 4l3 3-8 8H9v-3z"/>',recent:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',person:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 4-7 8-7s8 2 8 7"/>',keypad:[5,12,19].flatMap(y=>[5,12,19].map(x=>`<circle cx="${x}" cy="${y}" r="1.6"/>`)).join(""),phone:'<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',alarm:'<circle cx="12" cy="13" r="7.500"/><path d="M12 9v4l2.500 1.500M4 5l3-2M20 5l-3-2"/>',stop:'<circle cx="12" cy="14" r="7"/><path d="M12 14v-4M10 3h4"/>',timer:'<circle cx="12" cy="12" r="9"/><path d="M12 12l3-4"/>',lib:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M3 17l5-4 4 3 4-4 5 4"/>',col:'<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M3 8v8M21 8v8"/>',up:'<path d="M12 19V5M5 12l7-7 7 7"/>',lock:'<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M9 11V8a3 3 0 0 1 6 0v3"/>'};
const cb=(id,p,x="")=>`<button class="cb g ${x}" id="${id}">${ic(p)}</button>`,pb=(id,t)=>`<button class="pb g" id="${id}">${t}</button>`;
const on=(id,f)=>{const e=$(id);if(e)e.onclick=f};
const CT=()=>DATA.contacts.filter(x=>!x.group&&!x.spam);
const av=(c,s=46)=>!c.photo&&/^[\d\-\s+()]+$/.test(c.name||"")?`<div class="av num" style="width:${s}px;height:${s}px"><svg viewBox="0 0 24 24" width="${s*.62}" height="${s*.62}" fill="#fff"><circle cx="12" cy="9" r="4.2"/><path d="M3.5 22c0-5.200 4-7.500 8.500-7.500s8.500 2.300 8.500 7.500z"/></svg></div>`:c.photo?`<img class="av" style="width:${s}px;height:${s}px" src="${esc(c.photo)}">`:`<div class="av" style="width:${s}px;height:${s}px;font-size:${s*.42}px">${esc([...c.name||"?"][0])}</div>`;
function shell(c,o){c.innerHTML=`<div class="ah ${o.nf?"nf":""}">${o.left||""}<div class="at">${o.title||""}</div>${o.right||""}</div><div class="sc ${o.cls||""}" id="sc">${o.body}</div>${o.bottom||""}`;state.dark=!!o.dark;const a=$("appScreen");a.classList.toggle("dark",!!o.dark);a.style.background=o.bg||"";theme();return $("sc")}
const tabbar=(it,a,x="")=>`<div class="tb"><div class="tabs g">${it.map((t,i)=>`<button data-t="${i}" class="${i===a?"on":""}">${ic(t[0])}<span>${t[1]}</span></button>`).join("")}</div>${x}</div>`;
const tabs=(c,app)=>c.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{UI.tab[app]=+b.dataset.t;renderApp()});
theme=function(){const N=$("notificationScreen").classList.contains("active"),K=$("controlScreen").classList.contains("active"),d=$("device");d.classList.toggle("lt",N||K||state.cur!=="appScreen"||!!state.dark);d.classList.toggle("locked",!K&&(N||["lockScreen","passcodeScreen"].includes(state.cur)));d.classList.toggle("cc",K);d.classList.toggle("pcs",state.cur==="passcodeScreen"&&!N&&!K)};
const _o=openApp;openApp=function(a){document.querySelector(".call")?.remove();if(a==="contacts"){UI.tab.phone=1;a="phone"}UI.pc=null;UI.ph=null;UI.wx=null;UI.note=null;_o(a)};
openChat=id=>{state.chat=id;renderApp()};
renderApp=function(){const c=$("appContent");$("appScreen").dataset.app=state.app||"";$("appScreen").dataset.v=state.chat?"chat":"list";({phone:rPhone,messages:rMsg,clock:rClock,weather:rWeather,photos:rPhotos,notes:rNotes,calendar:rCal,settings:rSet,camera:rCam,music:rMusic,safari:rSafari}[state.app]||(()=>{}))(c)};

/* ---------- 연락처 그룹(ㄱㄴㄷ → A-Z → #) / 통화 시각 표시 ---------- */
const CHO="ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",CHO_MAP={ㄲ:"ㄱ",ㄸ:"ㄷ",ㅃ:"ㅂ",ㅆ:"ㅅ",ㅉ:"ㅈ"},KO_ORDER="ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
function groupKey(n){const ch=[...n.trim()][0]||"#",c=ch.charCodeAt(0)-0xAC00;if(c>=0&&c<11172){const j=CHO[Math.floor(c/588)];return CHO_MAP[j]||j}if(/[a-z]/i.test(ch))return ch.toUpperCase();return"#"}
function groupRank(k){const i=KO_ORDER.indexOf(k);if(i>=0)return i;if(/^[A-Z]$/.test(k))return 100+k.charCodeAt(0);return 1000}
function whenStr(at){if(!at)return"";const a=new Date(at.replace(" ","T")),t=now(),day=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate()),diff=Math.round((day(t)-day(a))/864e5);
 if(diff<=0)return(a.getHours()<12?"오전 ":"오후 ")+(a.getHours()%12||12)+":"+String(a.getMinutes()).padStart(2,"0");if(diff===1)return"어제";if(diff<7)return["일","월","화","수","목","금","토"][a.getDay()]+"요일";return`${a.getMonth()+1}/${a.getDate()}/${String(a.getFullYear()).slice(2)}`}
/* ---------- 전화 ---------- */
function rPhone(c){
 if(UI.pc)return rDetail(c,DATA.contacts.find(a=>a.id===UI.pc));
 const t=UI.tab.phone??0,L=CT(),o={cls:"flat",bottom:tabbar([[P.recent,"최근 통화"],[P.person,"연락처"],[P.keypad,"키패드"]],t,cb("srch",P.search,"big"))};
 if(t===0){o.title="<b>최근 통화</b>";o.left=pb("ed","편집");o.right=cb("fl",P.filter);
  const R=DATA.contacts.flatMap(x=>(x.calls||[]).map(k=>({x,k}))).sort((a,b)=>(b.k.at||"").localeCompare(a.k.at||""));
  o.body=`<div class="favs">${L.filter(x=>x.favorite).map(x=>`<button class="fav" data-c="${x.id}"><div class="favt">${av(x,72)}</div><span>${esc(x.name)}</span></button>`).join("")}</div><h2 class="h2">최근 통화</h2><div class="rows">${R.map(({x,k})=>`<div class="rw" data-c="${x.id}">${av(x,46)}<div class="rm"><b class="${k.type==="missed"||k.type==="spam"?"red":""}">${esc(x.name)}</b><small class="${k.type==="spam"?"red":""}">${k.type==="missed"?"↙ ":k.dir==="out"?"↗ ":"↙ "}${esc(k.label||"휴대전화")}</small></div><span class="rt">${esc(whenStr(k.at))}</span><span class="cb g sm">${ic(P.phone,18)}</span></div>`).join("")||'<div class="empty">통화 기록 없음</div>'}</div>`}
 else if(t===1){o.title="<b>연락처</b>";o.left=cb("bk",P.back);o.right=cb("ad",P.plus);const g={};[...L].sort((a,b)=>a.name.localeCompare(b.name,"ko")).forEach(x=>(g[groupKey(x.name)]??=[]).push(x));const keys=Object.keys(g).sort((a,b)=>groupRank(a)-groupRank(b)||a.localeCompare(b));
  o.body=`<div class="rows"><div class="rw">${av(DATA.me,38)}<div class="rm"><b style="font-size:20px">${esc(DATA.me.name)}</b><small>내 카드</small></div></div></div>`+keys.map(k=>`<div class="gl">${esc(k)}</div><div class="rows">${g[k].map(x=>`<div class="rw" data-d="${x.id}">${av(x,38)}<div class="rm"><b>${esc(x.name)}</b></div></div>`).join("")}</div>`).join("")}
 else{o.cls="kpc";o.body=`<div class="kn" id="kn">${esc(UI.num)}</div><div class="kg">${"123456789*0#".split("").map(k=>`<button data-k="${k}"><b>${k}</b><small>${{2:"ABC",3:"DEF",4:"GHI",5:"JKL",6:"MNO",7:"PQRS",8:"TUV",9:"WXYZ",0:"+"}[k]||""}</small></button>`).join("")}</div><div class="krow"><span></span><button class="callb" id="cl">${ic(P.phone,34,2.2)}</button><button class="kdel" id="kd" style="visibility:${UI.num?"visible":"hidden"}"><svg viewBox="0 0 28 22" width="38" height="30"><path d="M9.500 1.500h14a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3h-14L1.500 11z" fill="#e4e4e8"/><path d="M12.500 7l7 8M19.500 7l-7 8" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg></button></div>`}
 shell(c,o);tabs(c,"phone");on("bk",home);on("ad",()=>showToast("data.js 에서 연락처를 추가하세요"));
 c.querySelectorAll("[data-c]").forEach(e=>e.onclick=()=>startCall(DATA.contacts.find(x=>x.id===e.dataset.c)));
 c.querySelectorAll("[data-d]").forEach(e=>e.onclick=()=>{UI.pc=e.dataset.d;renderApp()});
 c.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{UI.num+=b.dataset.k;renderApp()});on("kd",()=>{UI.num=UI.num.slice(0,-1);renderApp()});{const kd=$("kd");if(kd){let t;kd.onpointerdown=()=>{t=setTimeout(()=>{UI.num="";UI.longDel=1;renderApp()},600)};kd.onpointerup=kd.onpointerleave=()=>clearTimeout(t)}}
 on("cl",()=>{if(!UI.num)return;const d=UI.num.replace(/\D/g,""),x=CT().find(x=>(x.number||"").replace(/\D/g,"")===d);startCall(x||{name:UI.num})})}
function rDetail(c,x){shell(c,{left:cb("bk",P.back),cls:"det",body:`<div class="dh">${av(x,110)}<h1>${esc(x.name)}</h1><div class="da"><button id="dm" class="g">${ic(P.compose,22)}<span>메시지</span></button><button id="dc" class="g">${ic(P.phone,22)}<span>통화</span></button></div></div><div class="rows"><div class="rw"><div class="rm"><small>휴대전화</small><b style="color:#007aff;font-weight:400">${esc(x.number||"—")}</b></div></div></div>`});on("bk",()=>{UI.pc=null;renderApp()});on("dc",()=>startCall(x));on("dm",()=>{openApp("messages");openChat(x.id)})}
function startCall(x,opt={}){x=ensureC(x);recordCall(x,opt.incoming?"in":"out");const o=document.createElement("div");o.className="call";const B=[["스피커",'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6"/>'],["FaceTime",'<rect x="3" y="7" width="12" height="10" rx="2"/><path d="M15 11l6-3v8l-6-3z"/>'],["소리 끔",'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M4 4l16 16"/>'],["추가",'<circle cx="12" cy="8" r="4"/><path d="M5 20c0-4 3-6 7-6M18 14v6M15 17h6"/>'],["키패드",P.keypad],["종료",'<path d="M3 14c5-5 13-5 18 0l-3 3-3-1.500v-2.500a10 10 0 0 0-6 0v2.500L6 17z" fill="currentColor"/>']];
 o.innerHTML=`<div class="cn"><b>${esc(x.name)}</b><small id="cs">발신 중…</small></div><div class="cdlg" id="cd"></div><div class="cgr2">${B.map((b,i)=>`<button class="${i===5?"end":""}"><i class="cb">${ic(b[1],28)}</i><span>${b[0]}</span></button>`).join("")}</div>`;
 (opt.host||$("appScreen")).appendChild(o);const T=[],later=(f,ms)=>{const h=setTimeout(f,ms);T.push(h);return h},
  stop=()=>{T.forEach(clearTimeout);clearInterval(o._k)},cs=$("cs"),cd=o.querySelector("#cd"),
  sec=()=>{let s=0;cs.textContent="0:00";o._k=setInterval(()=>{if(!o.isConnected)return stop();s++;cs.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`},1000)},
  bye=()=>{clearInterval(o._k);cs.textContent="통화 종료";later(()=>o.remove(),1500)},
  S=(DATA.callScripts||{})[x.id];
 if(opt.incoming)cs.textContent="0:00";
 if(S||opt.script){const L=opt.script||(()=>{const n=(UI.cs=UI.cs||{})[x.id]||0;UI.cs[x.id]=n+1;return S[n%S.length]})();
  later(()=>{sec();let i=0;const next=()=>{if(i>=L.length)return later(bye,1800);const line=L[i++],k=line.indexOf(":"),who=line.slice(0,k).trim(),txt=line.slice(k+1).trim(),d=document.createElement("div");d.className="cline"+(who==="서이건"?" me":"");d.innerHTML=`<b>${esc(who)}:</b> ${esc(txt)}`;cd.appendChild(d);while(cd.children.length>2)cd.firstChild.remove();cd.scrollTop=cd.scrollHeight;later(next,1300+txt.length*70)};next()},opt.incoming?500:1800)}
 else if(x.invalid)later(()=>{cs.textContent="통화 연결 실패";const d=document.createElement("div");d.className="cline";d.innerHTML="<b>안내:</b> 지금 거신 전화번호는 없는 번호입니다. 확인하시고 다시 걸어 주십시오.";cd.appendChild(d);later(bye,4500)},1500);
 else later(()=>{cs.textContent="음성사서함으로 연결 중…";later(bye,2500)},6500);
 o.querySelector(".end").onclick=()=>{stop();o.remove()};o.querySelectorAll("button:not(.end)").forEach(b=>b.onclick=()=>b.classList.toggle("act"))}
/* ---------- 메시지 ---------- */
function threads(){const ids=DATA.threads||[],a=ids.map(id=>DATA.contacts.find(x=>x.id===id)).filter(Boolean);DATA.contacts.forEach(x=>{if((x.thread||(x.messages||[]).length)&&!a.includes(x))a.push(x)});return a}
const CHEV='<svg viewBox="0 0 10 16" width="8" height="13" fill="none" stroke="#c4c4c8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2l6 6-6 6"/></svg>';
const MIC='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="2.500" width="6" height="12" rx="3"/><path d="M5.500 11.500a6.500 6.500 0 0 0 13 0M12 18v3.500"/></svg>';
function rMsg(c){const id=state.chat;if(id)return rChat(c,id);
 shell(c,{cls:"flat",title:"<b>메시지</b>",left:pb("ed","편집"),right:cb("fl",P.filter),body:'<div class="rows msgs" id="ml"></div>',bottom:`<div class="tb"><div class="sp g">${ic(P.search,20)}<input id="ms" placeholder="검색"><span class="mic">${MIC}</span></div><button class="cb g big">${ic(P.compose,22)}</button></div>`});
 const fill=q=>{$("ml").innerHTML=threads().filter(x=>(x.name+JSON.stringify(x.messages||[])).includes(q)).map(x=>{const l=(x.messages||[]).at(-1)||["","",""];return `<div class="rw mr" data-m="${x.id}">${x.unread?'<i class="ud"></i>':""}${av(x,42)}<div class="mb"><div class="mh"><b>${esc(x.name)}</b><span class="mt">${esc(l[2]||"")}${CHEV}</span></div><div class="mp">${esc(l[1])}</div></div></div>`}).join("");c.querySelectorAll("[data-m]").forEach(e=>e.onclick=()=>openChat(e.dataset.m))};fill("");$("ms").oninput=e=>fill(e.target.value)}
function rChat(c,id){const x=DATA.contacts.find(a=>a.id===id);x.messages??=[];x.unread=false;x.unreadN=0;syncBadge();
 const M=x.messages,u=DATA.contacts.filter(y=>y.unread&&y.id!==id).length,
 body=M.map((m,i)=>{if(m[0]==="date")return`<div class="dsep">${esc(m[1])}</div>`;const n=M[i+1],last=!n||n[0]!==m[0],first=i===0||M[i-1][0]!==m[0];return `<div class="bubble ${m[0]}${last?" last":""}${first&&i?" first":""}">${esc(m[1])}</div>`}).join("")+(M.length&&M.at(-1)[0]==="out"?`<div class="rd"><b>${M.at(-1)[3]?"전달됨":"읽음"}</b>${M.at(-1)[3]?"":" "+esc(M.at(-1)[2]||"")}</div>`:"");
 shell(c,{left:`<button class="cb g pillb" id="bk">${ic(P.back)}${u?`<span class="ub">${u}</span>`:""}</button>`,right:`<button class="cb g" id="vc">${ic('<rect x="2.500" y="6.500" width="13" height="11" rx="3"/><path d="M15.500 10.500l5.500-3.500v10l-5.500-3.500z"/>',24,1.8)}</button>`,title:`<div class="chh">${av(x,56)}<b>${esc(x.name)}<i>${CHEV}</i></b></div>`,cls:"chat",body,bottom:`<div class="tb ctb"><button class="cb g plus" id="pl2">${ic(P.plus,22,2)}</button><div class="sp g"><input id="ci" placeholder="iMessage" autocomplete="off" enterkeyhint="send"><span class="mic" id="mic">${MIC}</span><button class="sendb" id="sd">${ic(P.up,18,2.800)}</button></div></div>`});
 $("sc").scrollTop=1e6;on("bk",()=>{state.chat=null;renderApp()});on("vc",()=>showToast("FaceTime은 시뮬레이션입니다"));on("pl2",()=>showToast("첨부 기능은 시뮬레이션입니다"));
 const sp=$("ci").closest(".sp"),ck=()=>sp.classList.toggle("typing",!!$("ci").value.trim());
 const send=()=>{const v=$("ci").value.trim();if(!v)return;const d=now(),lab=`${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`,ls=[...x.messages].reverse().find(m=>m[0]==="date");if(!ls||ls[1]!==lab)x.messages.push(["date",lab]);x.messages.push(["out",v,time(),1]);DATA.threads=[id,...(DATA.threads||[]).filter(t=>t!==id)];renderApp();$("ci")?.focus();{const L=autoReplyFor(id,v);if(L)playReplies(L,l=>deliver(id,[l]))}};on("sd",send);$("ci").oninput=()=>{ck()};$("ci").onkeydown=e=>{if(e.key==="Enter"&&!e.isComposing){e.preventDefault();send()}}}
/* ---------- 시계 ---------- */
/* 서울을 기준으로 시차 계산 (오늘/어제/내일, ±N시간) */
const tzi=tz=>{const n=new Date(),w=wall(tz,n),b=wall(SEOUL,n),u=x=>Date.UTC(x.y,x.mo-1,x.d,x.h,x.mi),off=Math.round((u(w)-u(b))/36e5),dd=Math.round((Date.UTC(w.y,w.mo-1,w.d)-Date.UTC(b.y,b.mo-1,b.d))/864e5);
 return{t:(w.h%12||12)+":"+String(w.mi).padStart(2,"0"),ap:w.h<12?"오전":"오후",lab:`${dd===0?"오늘":dd>0?"내일":"어제"}, ${off>=0?"+":""}${off}시간`}};
const fmt=ms=>{const s=ms/1e3;return`${String(Math.floor(s/60)).padStart(2,"0")}:${String(Math.floor(s%60)).padStart(2,"0")}.${String(Math.floor(s%1*100)).padStart(2,"0")}`};
function rClock(c){clearInterval(UI.swt);clearInterval(UI.tmt);const t=UI.tab.clock??0,o={dark:true,bottom:tabbar([[P.globe,"세계 시계"],[P.alarm,"알람"],[P.stop,"스톱워치"],[P.timer,"타이머"]],t)};
 if(t===0){o.left=pb("ed","편집");o.right=cb("ad",P.plus);o.body=`<h1 class="big">세계 시계</h1>${DATA.worldClock.map(w=>{const z=tzi(w.tz);return `<div class="wr"><div><small>${z.lab}</small><b>${esc(w.city)}</b></div><div class="wt">${z.t}<span>${z.ap}</span></div></div>`}).join("")}`}
 else if(t===1){o.left=pb("ed","편집");o.right=cb("ad",P.plus);o.body=`<h1 class="big">알람</h1>${UI.al.map((a,i)=>`<div class="wr"><div><div class="wt" style="font-size:54px;text-align:left">${a.time}<span>${a.ap}</span></div><small>${esc(a.label)}</small></div><label class="sw"><input type="checkbox" data-a="${i}" ${a.on?"checked":""}><i></i></label></div>`).join("")}`}
 else if(t===2){const s=UI.sw;o.body=`<div class="swd" id="swd">${fmt(s.run?Date.now()-s.t0+s.el:s.el)}</div><div class="swb"><button id="swl" class="rb gry">${s.run||s.el?(s.run?"랩":"재설정"):"랩"}</button><button id="sws" class="rb ${s.run?"red":"grn"}">${s.run?"중단":"시작"}</button></div><div class="laps">${s.laps.map((l,i)=>`<div class="wr"><span>랩 ${s.laps.length-i}</span><span>${fmt(l)}</span></div>`).join("")}</div>`}
 else{const m=UI.tm;o.left=pb("ed","편집");o.body=m.run||m.left?`<h1 class="big">타이머</h1><div class="swd" id="tmd">${fmtT(m.run?m.end-Date.now():m.left)}</div><div class="swb"><button id="tmc" class="rb gry">취소</button><button id="tms" class="rb ${m.run?"org":"grn"}">${m.run?"일시 정지":"재개"}</button></div>`:`<h1 class="big">타이머</h1><div class="pk">${[["시간",24],["분",60],["초",60]].map(([u,n],i)=>`<div class="pc" data-i="${i}">${Array.from({length:n},(_,k)=>`<div>${k}<small> ${u}</small></div>`).join("")}</div>`).join("")}</div><div class="swb"><button class="rb gry" id="tmc">취소</button><button class="rb grn" id="tms">시작</button></div>`}
 shell(c,o);tabs(c,"clock");c.querySelectorAll("[data-a]").forEach(i=>i.onchange=()=>UI.al[i.dataset.a].on=i.checked);
 if(t===2){const s=UI.sw;if(s.run)UI.swt=setInterval(()=>{const e=$("swd");e?e.textContent=fmt(Date.now()-s.t0+s.el):clearInterval(UI.swt)},30);
  on("sws",()=>{if(s.run){s.el+=Date.now()-s.t0;s.run=false}else{s.t0=Date.now();s.run=true}renderApp()});
  on("swl",()=>{if(s.run)s.laps.unshift(Date.now()-s.t0+s.el);else{s.el=0;s.laps=[]}renderApp()})}
 if(t===3){const m=UI.tm;c.querySelectorAll(".pc").forEach((e,i)=>e.scrollTop=m.sel[i]*40);
  if(m.run)UI.tmt=setInterval(()=>{const e=$("tmd"),l=m.end-Date.now();if(l<=0){clearInterval(UI.tmt);m.run=false;m.left=0;showToast("타이머 종료");renderApp()}else if(e)e.textContent=fmtT(l)},200);
  on("tmc",()=>{m.run=false;m.left=0;renderApp()});
  on("tms",()=>{if(m.run){m.left=m.end-Date.now();m.run=false}else{if(!m.left){m.sel=[...c.querySelectorAll(".pc")].map(e=>Math.round(e.scrollTop/40));m.left=((m.sel[0]*60+m.sel[1])*60+m.sel[2])*1e3}if(!m.left)return;m.end=Date.now()+m.left;m.run=true}renderApp()})}}
const fmtT=ms=>{const s=Math.max(0,Math.ceil(ms/1e3));return`${Math.floor(s/3600)?Math.floor(s/3600)+":":""}${String(Math.floor(s/60)%60).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`};
/* ---------- 날씨 ---------- */
function rWeather(c){const W=DATA.weather,w=UI.wx!=null?W[UI.wx]:null;
 if(!w){shell(c,{dark:true,nf:true,bg:"#12141f",right:cb("mo",P.more),body:`<h1 class="big">날씨</h1>${W.map((x,i)=>`<button class="wc" data-w="${i}" style="background:${x.bg}"><div><b>${esc(x.name)}</b><small>${esc(x.cond)}</small></div><div class="wtmp">${x.temp}°<small>최고:${x.hi}° 최저:${x.lo}°</small></div></button>`).join("")}`,bottom:`<div class="tb"><div class="sp g">${ic(P.search,20)}<input placeholder="도시 또는 공항 검색"></div></div>`});
  c.querySelectorAll("[data-w]").forEach(b=>b.onclick=()=>{UI.wx=+b.dataset.w;renderApp()});return}
 const all=w.daily.flatMap(d=>[d[2],d[3]]),mn=Math.min(...all),mx=Math.max(...all);
 shell(c,{dark:true,nf:true,bg:w.bg,left:cb("bk",P.back),cls:"wd2",body:`<div class="wh"><h2>${esc(w.name)}</h2><div class="wb">${w.temp}°</div><div>${esc(w.cond)}</div><div>최고:${w.hi}° 최저:${w.lo}°</div></div>${w.hourly.length?`<div class="card"><p>${esc(w.note)}</p><div class="hr">${w.hourly.map(h=>`<div><small>${h[0]}</small><span>${h[1]}</span><b>${h[2]}°</b></div>`).join("")}</div></div>`:""}${w.daily.length?`<div class="card"><small class="cap">10일간의 일기예보</small>${w.daily.map(d=>`<div class="dr"><b>${d[0]}</b><span>${d[1]}</span><i>${d[2]}°</i><div class="bar"><u style="left:${(d[2]-mn)/(mx-mn||1)*100}%;right:${100-(d[3]-mn)/(mx-mn||1)*100}%"></u></div><i>${d[3]}°</i></div>`).join("")}</div>`:""}`});on("bk",()=>{UI.wx=null;renderApp()})}
/* ---------- 사진 > 컬렉션 탭 ---------- */
function colRight(){const n=(DATA.me&&DATA.me.name||"나").trim()[0]||"나",ph=DATA.me&&DATA.me.photo;
 return`<div class="rr">${cb("mo",P.more,"m40")}<button class="cb m40 av" id="meav" style="${ph?`background:center/cover url(${esc(ph)})`:""}">${ph?"":esc(n)}</button></div>`}
function colBody(ps){
 const C=DATA.collections||{},base=ps.length-DATA.photos.length,ph=i=>DATA.photos[i],
  bg=i=>{const p=ph(i);return p&&p.src?`center/cover url(${esc(p.src)})`:"#c7c7cc"},
  pa=i=>ph(i)?`data-p="${base+i}"`:"",
  nxt=ic('<path d="M9 6l6 6-6 6"/>',14,3),dn=ic('<path d="M6 9l6 6 6-6"/>',13,3),
  head=(name,link,tog)=>`<div class="csh"><b>${name}${link?`<i>${nxt}</i>`:""}</b><button class="cch" ${tog?"data-tog":""} aria-label="${tog?"접기/펼치기":"더보기"}">${tog?dn:nxt}</button></div>`,
  tile=(a,lab)=>`<button class="ct" ${pa(a.photo)} style="background:${bg(a.photo)}">${lab&&a.name?`<span>${esc(a.name)}</span>`:""}</button>`,
  sec=(name,link,list,lab,cls="")=>`<section class="csec ${cls}">${head(name,link,true)}<div class="chs">${(list||[]).map(a=>tile(a,lab)).join("")}</div></section>`,
  mem=(C.memories||[]).map(m=>`<button class="cm" ${m.create?"":pa(m.photo)} style="background:${bg(m.photo)}">${m.create?`<span class="cpill">${ic('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',18,2)}<span>입력하여 생성</span></span>`:`<span class="cmt"><b>${esc(m.title||"")}</b><small>${esc(m.year||((ph(m.photo)&&ph(m.photo).date)||"").slice(0,4))}</small></span>`}</button>`).join("");
 return`<div class="coltt">컬렉션</div>`
  +`<section class="csec">${head("추억",true,true)}<div class="chs">${mem}</div></section>`
  +`<section class="csec">${head("고정됨",false,false)}<div class="chs">${(C.pinned||[]).map(a=>tile(a,true)).join("")}</div></section><div class="cln"></div>`
  +sec("앨범",true,C.albums,true)
  +sec("사람",true,C.people,false)
  +(C.featured&&C.featured.length?sec("추천 사진",true,C.featured,false):"")}
/* ---------- 사진 ---------- */
function rPhotos(c){const ps=[...Array.from({length:PHN()},(_,i)=>({src:"",c:`hsl(${i*47%360} 22% ${38+i%4*8}%)`,date:""})),...DATA.photos],t=UI.tab.photos??0;
 if(UI.ph!=null){const p=ps[UI.ph];shell(c,{dark:true,nf:true,bg:"#000",left:cb("bk",P.back),title:`<b>${p.date?(d=>{const[y,m,x]=d.split("-");return`${y}년 ${+m}월 ${+x}일`})(p.date):""}</b>`,cls:"pv",body:`<div class="pimg" style="background:${p.src?`center/contain no-repeat url(${esc(p.src)})`:p.c}"></div><div class="pl" id="pl"></div><div class="pr" id="pr"></div>`});
  on("bk",()=>{UI.ph=null;renderApp()});on("pl",()=>{UI.ph=(UI.ph+ps.length-1)%ps.length;renderApp()});on("pr",()=>{UI.ph=(UI.ph+1)%ps.length;renderApp()});return}
 shell(c,{cls:t?"pg colp":"pg",left:t?"":`<div class="ptl"><b>${t?"컬렉션":"보관함"}</b><small>${(DATA.photoCount||ps.length).toLocaleString("en-US")}장</small></div>`,right:t?colRight():`<div class="rr">${cb("fl",P.filter)}${pb("sl","선택")}</div>`,body:t?colBody(ps):`<div class="pgr">${ps.map((p,i)=>`<button class="pt" data-p="${i}" style="background:${p.src?`center/cover url(${esc(p.src)})`:p.c}"></button>`).join("")}</div>`,bottom:tabbar([[P.lib,"보관함"],[P.col,"컬렉션"]],t,cb("srch",P.search,"big"))});
 tabs(c,"photos");c.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{UI.ph=+b.dataset.p;renderApp()});c.querySelectorAll("[data-tog]").forEach(b=>b.onclick=()=>b.closest(".csec").classList.toggle("shut"));$("sc").scrollTop=t?0:1e6}
/* ---------- 메모 ---------- */
const nt=n=>n.title||n.text.split("\n")[0]||"새로운 메모";
const CHK=ic('<path d="M5 12.500l4.500 4.500L19 7.500"/>',14,3);
function askPw(n,ok,c){c.querySelector(".pwm")?.remove();
 const m=document.createElement("div");m.className="pwm";
 m.innerHTML=`<div class="pwb"><b>암호 입력</b><p>이 메모를 보려면 암호를 입력하세요.</p><input id="pwi" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="암호"><div class="pwe" id="pwe"></div><div class="pwa"><button id="pwc">취소</button><button id="pwo">확인</button></div></div>`;
 c.appendChild(m);const i=m.querySelector("#pwi"),e=m.querySelector("#pwe"),b=m.querySelector(".pwb");
 const go=()=>{if(i.value===(n.pw||"0000")){m.remove();ok()}else{e.textContent="암호가 올바르지 않습니다.";i.value="";b.classList.remove("shk");void b.offsetWidth;b.classList.add("shk")}};
 m.querySelector("#pwc").onclick=()=>m.remove();m.querySelector("#pwo").onclick=go;
 i.onkeydown=ev=>{if(ev.key==="Enter")go()};i.oninput=()=>{if(i.value.length>=4)go()};setTimeout(()=>i.focus(),50)}
function rNotes(c){const N=DATA.notes;
 if(UI.note!=null){const n=N[UI.note];
  if(n.list){shell(c,{left:cb("bk",P.back),cls:"nd",body:`<h1 class="nlt">${esc(nt(n))}</h1><div class="cl">${n.list.map((x,k)=>`<div class="ci ${x.d?"on":""}" data-k="${k}"><i>${x.d?CHK:""}</i><span>${esc(x.t)}</span></div>`).join("")}</div>`});
   c.querySelectorAll(".ci").forEach(e=>e.onclick=()=>{const x=n.list[+e.dataset.k];x.d=!x.d;e.classList.toggle("on",x.d);e.firstChild.innerHTML=x.d?CHK:""});
   on("bk",()=>{UI.note=null;renderApp()});return}
  shell(c,{left:cb("bk",P.back),cls:"nd",body:`<textarea id="nb" placeholder="메모">${esc(n.text)}</textarea>`});$("nb").oninput=e=>n.text=e.target.value;on("bk",()=>{if(!n.text.trim())N.splice(UI.note,1);UI.note=null;renderApp()});return}
 const row=(n,i)=>`<div class="rw nr" data-n="${i}"><div class="rm"><b>${n.locked?ic(P.lock,14)+" ":""}${esc(nt(n))}</b><small>${esc(n.date||"")} &nbsp;${n.locked?"잠김":esc(n.text.split("\n").slice(1).join(" ").trim())}</small></div></div>`,pin=N.map((n,i)=>n.pinned?row(n,i):"").join(""),rest=N.map((n,i)=>n.pinned?"":row(n,i)).join("");
 shell(c,{left:cb("bk",P.back),right:cb("mo",P.more),title:`<b>메모</b><small>${N.length}개의 메모</small>`,body:(pin?`<h2 class="h2">고정됨</h2><div class="rows">${pin}</div>`:"")+`<h2 class="h2">메모</h2><div class="rows">${rest}</div>`,bottom:`<div class="tb"><div class="sp g">${ic(P.search,20)}<input placeholder="검색"></div><button class="cb g big" id="nw">${ic(P.compose,24)}</button></div>`});
 on("bk",home);on("nw",()=>{N.unshift({text:"",date:now().toLocaleDateString("en-US",{month:"numeric",day:"numeric",year:"2-digit"})});UI.note=0;renderApp()});
 c.querySelectorAll("[data-n]").forEach(e=>e.onclick=()=>{const i=+e.dataset.n;if(N[i].locked)return askPw(N[i],()=>{UI.note=i;renderApp()},c);UI.note=i;renderApp()})}
/* ---------- 캘린더 ---------- */
function rCal(c){const T=now(),ty=T.getFullYear(),tm=T.getMonth(),ev={};DATA.events.forEach(e=>(ev[e.date]??=[]).push(e));let h="";UI.sel??=`${ty}-${String(tm+1).padStart(2,"0")}-${String(T.getDate()).padStart(2,"0")}`;
 for(let m=-12;m<=24;m++){const d0=new Date(ty,tm+m,1),Y=d0.getFullYear(),M=d0.getMonth(),n=new Date(Y,M+1,0).getDate();h+=`<div class="cmo" data-y="${Y}" data-m="${M}"><div class="cmh">${M+1}월</div><div class="cgr">${"<i></i>".repeat(d0.getDay())}`;
  for(let d=1;d<=n;d++){const k=`${Y}-${String(M+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,w=(d0.getDay()+d-1)%7;h+=`<button class="cd ${w%6===0?"we":""} ${Y===ty&&M===tm&&d===T.getDate()?"td":""} ${k===UI.sel?"sel":""}" data-k="${k}"><b>${d}</b>${(ev[k]||[]).slice(0,2).map(e=>`<u class="${e.color||"blue"}"></u>`).join("")}</button>`}h+="</div></div>"}
 const sc=shell(c,{left:pb("yr",`‹ ${ty}`),right:`<div class="pb g rr2">${ic(P.filter,22)}${ic(P.search,22)}<span id="ad">${ic(P.plus,22)}</span></div>`,body:h,cls:"cal",bottom:`<div class="cth"><b id="ct">${tm+1}월</b><div class="wk">${["일","월","화","수","목","금","토"].map(x=>`<span>${x}</span>`).join("")}</div></div><div class="tb"><button class="pb g" id="td">오늘</button></div>`});
 const cur=sc.querySelector(`[data-y="${ty}"][data-m="${tm}"]`),go=()=>sc.scrollTop=cur.offsetTop-196;go();
 sc.onscroll=()=>{let f=null;sc.querySelectorAll(".cmo").forEach(e=>{if(e.offsetTop-sc.scrollTop<=215)f=e});if(f){$("ct").textContent=(+f.dataset.m+1)+"월";$("yr").textContent="‹ "+f.dataset.y}};
 on("yr",home);const tk=`${ty}-${String(tm+1).padStart(2,"0")}-${String(T.getDate()).padStart(2,"0")}`;on("td",()=>{go();sc.querySelectorAll(".td").forEach(e=>e.classList.remove("td"));sc.querySelector(`[data-k="${tk}"]`).classList.add("td")});on("ad",()=>showToast("data.js 의 events 에 일정을 추가하세요"));
 sc.querySelectorAll(".cd").forEach(b=>b.onclick=()=>{sc.querySelectorAll(".td").forEach(e=>e.classList.remove("td"));b.classList.add("td");sc.querySelectorAll(".cd.sel").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");UI.sel=b.dataset.k;c.querySelector(".sheet")?.remove();const e=ev[b.dataset.k]||[],s=document.createElement("div");s.className="sheet g";s.innerHTML=`<b>${b.dataset.k.replace(/-/g,".")}</b>${e.map(x=>`<div class="ev"><i class="${x.color||"blue"}"></i><div>${esc(x.title)}<small>${esc(x.time||"")}</small></div></div>`).join("")||'<p>일정 없음</p>'}`;s.onclick=()=>s.remove();c.appendChild(s)})}
/* ---------- 설정 / 카메라 / 음악 ---------- */
function rSet(c){const G=[[["✈","에어플레인 모드","#ff9f0a"],["⌁","Wi-Fi","#007aff"],["ᛒ","Bluetooth","#007aff"],["▂","셀룰러","#34c759"]],[["♧","알림","#ff3b30"],["♪","사운드 및 햅틱","#ff2d55"],["☾","집중 모드","#5856d6"]],[["⚙","일반","#8e8e93"],["◉","디스플레이 및 밝기","#007aff"],["▣","Face ID 및 암호","#34c759"]]];
 shell(c,{left:cb("bk",P.back),body:`<h1 class="big">설정</h1><div class="sp g" style="margin-bottom:16px">${ic(P.search,20)}<input placeholder="검색"></div><div class="rows"><div class="rw">${av(DATA.me,58)}<div class="rm"><b style="font-size:20px">${esc(DATA.me.name)}</b><small>${esc(DATA.me.appleId)}</small></div></div></div>${G.map(g=>`<div class="rows" style="margin-top:20px">${g.map(r=>`<div class="rw st"><span class="si" style="background:${r[2]}">${r[0]}</span><div class="rm"><b style="font-weight:400">${r[1]}</b></div><span class="rt">›</span></div>`).join("")}</div>`).join("")}`});on("bk",home);c.querySelectorAll(".st").forEach(r=>r.onclick=()=>showToast(r.textContent.trim()))}
function rCam(c){const ph=DATA.photos[DATA.photos.length-1];shell(c,{dark:true,nf:true,bg:"#000",cls:"cam",body:`<div class="tp">${ic('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',24)}${ic('<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/>',24)}${ic(P.keypad,22)}</div><div class="cv" style="${DATA.cameraImage?`background:center/cover url(${esc(DATA.cameraImage)})`:""}"></div><div class="zm"><span>.5</span><span class="on">1×</span><span>2</span><span>4</span><span>8</span></div><button class="shb" id="shb"></button><div class="th" style="${ph?`background:center/cover url(${esc(ph.src)})`:""}"></div><div class="md"><span>비디오</span><span class="on">사진</span></div><div class="fp">${ic('<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5"/>',26)}</div><div class="fl" id="fl"></div>`});on("shb",()=>{const f=$("fl");f.classList.remove("on");void f.offsetWidth;f.classList.add("on")})}
function rMusic(c){const M=DATA.music||[],u=UI.mu??={i:null,play:false,t0:0,el:0,au:null};
 const fm=s=>`${Math.floor(s/60)}:${String(Math.floor(s)%60).padStart(2,"0")}`,
  dur=()=>{const m=M[u.i];return u.au&&isFinite(u.au.duration)?u.au.duration:(m&&m.sec)||0},
  cur=()=>u.au?u.au.currentTime:u.el+(u.play?(Date.now()-u.t0)/1e3:0),
  note=ic('<path d="M9 18V6l10-2v12"/><circle cx="6.500" cy="18" r="2.500"/><circle cx="16.500" cy="16" r="2.500"/>',22,2),
  pp=()=>ic(u.play?'<path d="M9 5v14M15 5v14"/>':'<path d="M7 4.500l12 7.500-12 7.500z"/>',24,2.500),
  row=(m,i)=>`<button class="rw mu" data-s="${i}"><div class="mart">${note}</div><div class="rm"><b>${esc(m.title)}</b><small>${esc(m.artist)}</small></div><span class="rt">${fm(m.sec||0)}</span></button>`,
  m=M[u.i],
  mini=m?`<div class="tb"><div class="mini g"><div class="mart">${note}</div><div class="rm"><b>${esc(m.title)}</b><small>${esc(m.artist)} · <span id="mut">${fm(cur())}</span></small></div><button class="cb" id="mpp">${pp()}</button><div class="mbar"><u id="mub"></u></div></div></div>`:"";
 shell(c,{left:cb("bk",P.back),body:`<h1 class="big">음악</h1><h2 class="h2">노래</h2>${M.length?`<div class="rows">${M.map(row).join("")}</div>`:'<div class="empty">노래가 없습니다</div>'}`,bottom:mini});
 on("bk",home);
 const tick=()=>{const t=$("mut");if(!t){clearInterval(UI.mut);return}const d=dur(),x=cur();
  if(d&&x>=d){u.play=false;u.el=0;if(u.au){u.au.pause();u.au.currentTime=0}$("mpp").innerHTML=pp()}
  t.textContent=fm(Math.min(x,d||x));$("mub").style.width=(d?Math.min(100,x/d*100):0)+"%"};
 clearInterval(UI.mut);if(m){tick();UI.mut=setInterval(tick,500);
  on("mpp",()=>{if(u.play){u.el=cur();u.play=false;u.au&&u.au.pause()}else{u.t0=Date.now();u.play=true;u.au&&u.au.play().catch(()=>{})}$("mpp").innerHTML=pp()})}
 c.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{const i=+b.dataset.s,s=M[i];if(u.au){u.au.pause();u.au=null}
  u.i=i;u.el=0;u.t0=Date.now();u.play=true;if(s.src){u.au=new Audio(s.src);u.au.play().catch(()=>{})}renderApp()})}
/* ---------- 아이콘 교체 (첨부 사진 참고) ---------- */
Object.assign(ICONS,{
music:`<svg viewBox="0 0 60 60">${G("mu","#ff4b75","#ff6c3b")}<g fill="#fff"><ellipse cx="20" cy="43" rx="7.5" ry="6"/><ellipse cx="38" cy="39" rx="7.5" ry="6"/><path d="M25 14l19-4v26h-4V19l-11 2.3V43h-4z"/></g></svg>`,
settings:`<svg viewBox="0 0 60 60">${G("se","#d6d6da","#8f8f95")}<circle cx="30" cy="30" r="24" fill="none" stroke="#38383c" stroke-width="5.5" stroke-dasharray="2.4 2.1"/><circle cx="30" cy="30" r="21" fill="#333337"/><circle cx="30" cy="30" r="15.5" fill="none" stroke="#7d7d83" stroke-width="4.5" stroke-dasharray="2 1.8"/><circle cx="30" cy="30" r="12" fill="#2b2b2f"/><g stroke="#a3a3a9" stroke-width="4" stroke-linecap="round"><path d="M30 30V16M30 30L42 37M30 30L18 37"/></g><circle cx="30" cy="30" r="4" fill="#a3a3a9"/></svg>`,
camera:`<svg viewBox="0 0 60 60">${G("ca","#e6e6e8","#b2b2b7")}<rect x="9" y="21" width="42" height="26" rx="4" fill="#343437"/><path d="M19 21l3-6h16l3 6z" fill="#343437"/><rect x="10" y="15" width="8" height="6" rx="1.5" fill="#343437"/><circle cx="30" cy="34" r="9" fill="none" stroke="#d2d2d6" stroke-width="3"/><circle cx="44" cy="26" r="2" fill="#ffd60a"/></svg>`,
contacts:`<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#d9cdc8"/><circle cx="27" cy="30" r="18.5" fill="none" stroke="#a0a0a0" stroke-width="4"/><circle cx="27" cy="26" r="6.5" fill="#a0a0a0"/><path d="M13 43c4-7 22-7 28 0a18.500 18.500 0 0 1-28 0z" fill="#a0a0a0"/><rect x="47" width="13" height="15" fill="#bbb"/><rect x="47" y="15" width="13" height="15" fill="#29b6f6"/><rect x="47" y="30" width="13" height="15" fill="#ff9500"/><rect x="47" y="45" width="13" height="15" fill="#00c853"/></svg>`});
/* ---------- 아이콘 v2 (첨부한 아이콘 사진 참고) ---------- */
const LG=(id,a,b,x1=0,y1=0,x2=0,y2=1)=>`<defs><linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`;
Object.assign(ICONS,{
phone:`<svg viewBox="0 0 60 60">${LG("p2a","#62e070","#2fbf4a")}${LG("p2b","#ffffff","#dff3e2")}<rect width="60" height="60" fill="url(#p2a)"/><path transform="translate(9.800 9.600) scale(1.680)" fill="url(#p2b)" d="M6.620 10.790c1.440 2.830 3.760 5.140 6.590 6.590l2.200-2.200c.27-.27.67-.36 1.020-.24 1.120.37 2.330.57 3.570.57.550 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.390 0-17-7.610-17-17 0-.55.45-1 1-1h3.500c.55 0 1 .45 1 1 0 1.250.2 2.450.57 3.570.11.35.03.74-.25 1.020l-2.200 2.200z"/></svg>`,
messages:`<svg viewBox="0 0 60 60">${LG("m2a","#6cea6f","#2cc34b")}<rect width="60" height="60" fill="url(#m2a)"/><ellipse cx="30" cy="27.500" rx="22.500" ry="17" fill="#fff"/><path d="M11 50c5.500-2 9-5.500 10.500-10.500l8.500 3.500c-3 6-10 8.500-19 7z" fill="#fff"/></svg>`,
weather:`<svg viewBox="0 0 60 60">${LG("w2a","#1f5fcf","#4aa8ec")}${LG("w2s","#ffd95a","#f3a928",0,0,1,1)}${LG("w2c","#ffffff","#a9cdf2",0,0,0,1)}<rect width="60" height="60" fill="url(#w2a)"/><circle cx="41" cy="19" r="12.500" fill="url(#w2s)"/><g fill="url(#w2c)" opacity=".96" transform="translate(-3 -2) scale(1.100)"><circle cx="19" cy="37" r="9.500"/><circle cx="29.500" cy="31" r="12"/><circle cx="42.500" cy="38" r="9"/><rect x="12" y="38" width="38" height="10" rx="5"/></g></svg>`,
photos:`<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/>${["#ffb340","#c3cb2f","#8cc63e","#00aec7","#62b4f4","#b567c9","#f48db0","#ff5959"].map((c,i)=>`<rect x="22" y="6.500" width="16" height="24.500" rx="8" fill="${c}" opacity=".88" style="mix-blend-mode:multiply" transform="rotate(${i*45} 30 30)"/>`).join("")}<circle cx="30" cy="30" r="2.600" fill="#fff"/></svg>`,
music:`<svg viewBox="0 0 60 60">${LG("mu2","#ff6a85","#f4243e")}<rect width="60" height="60" fill="url(#mu2)"/><g fill="#fff"><path d="M23.500 15.500L41.500 11.500V38h-4.500V20.500l-9 2V43h-4.500z"/><ellipse cx="22" cy="43.500" rx="6.800" ry="5.200" transform="rotate(-18 22 43.500)"/><ellipse cx="36.500" cy="39" rx="6.800" ry="5.200" transform="rotate(-18 36.500 39)"/></g></svg>`,
settings:`<svg viewBox="0 0 60 60">${LG("se2","#c9c9ce","#8e8e94")}<rect width="60" height="60" fill="url(#se2)"/><g fill="#3d3d42"><rect x="26" y="9" width="8" height="10" rx="2.500" transform="rotate(0 30 30)"/><rect x="26" y="9" width="8" height="10" rx="2.500" transform="rotate(45 30 30)"/><rect x="26" y="9" width="8" height="10" rx="2.500" transform="rotate(90 30 30)"/><rect x="26" y="9" width="8" height="10" rx="2.500" transform="rotate(135 30 30)"/><rect x="26" y="9" width="8" height="10" rx="2.500" transform="rotate(180 30 30)"/><rect x="26" y="9" width="8" height="10" rx="2.500" transform="rotate(225 30 30)"/><rect x="26" y="9" width="8" height="10" rx="2.500" transform="rotate(270 30 30)"/><rect x="26" y="9" width="8" height="10" rx="2.500" transform="rotate(315 30 30)"/><circle cx="30" cy="30" r="15.500"/></g><circle cx="30" cy="30" r="8" fill="#b9b9bf"/></svg>`
});
document.querySelectorAll(".icon").forEach(el=>{const k=Object.keys(ICONS).find(k=>el.classList.contains(k));if(k)el.innerHTML=ICONS[k]});
/* ---------- 알림센터(왼쪽 위): 잠금화면 모양 ---------- */
$("notificationScreen").innerHTML=`<div class="lock-wallpaper"></div><div class="lock-date" id="panelDate"></div><div class="lock-time" id="panelTime"></div><div class="nl" id="notificationList"></div><div class="lock-shortcuts"><button>${ic('<path d="M8 2h8v5l-2 3v12h-4V10L8 7z" fill="#fff"/>',22,1.5)}</button><button>${ic('<path d="M8 6h8l1.500 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.500z" fill="#fff"/><circle cx="12" cy="14" r="3.500" fill="#3a4a66"/>',24,1.5)}</button></div><div class="home-bar"></div>`;
/* ---------- 제어센터(오른쪽 위) ---------- */
(function(){const cc=$("controlScreen"),T=(p,x="",s=26)=>`<button class="cbn ${x}">${ic(p,s)}</button>`,
 MUTE='<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16.500 9.500l5 5M21.500 9.500l-5 5"/>',
 SPK='<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16.500 8.500a5 5 0 0 1 0 7M19 6a8.500 8.500 0 0 1 0 12"/>';
cc.innerHTML=`<span id="controlTime" hidden></span><span id="controlDate" hidden></span>
<div class="cc0"><span>${ic(P.plus,26)}</span><span>${ic('<path d="M12 3v8M6.500 6.500a8 8 0 1 0 11 0"/>',24)}</span></div>
<div class="ccs"><span><svg width="22" height="14" viewBox="0 0 22 14" fill="#fff"><rect y="9" width="4" height="5" rx="1"/><rect x="6" y="6" width="4" height="8" rx="1"/><rect x="12" y="3" width="4" height="11" rx="1"/><rect x="18" width="4" height="14" rx="1" opacity=".4"/></svg>LG U+ ${ic('<path d="M2 9a14 14 0 0 1 20 0M6 13a8 8 0 0 1 12 0M10 17a3 3 0 0 1 4 0"/>',20)}</span><span>${ic(P.alarm,18)}${ic('<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 1"/>',18)}${ic('<path d="M12 4v16M5 8l14 8M19 8L5 16"/>',17)} 32% <i class="bt"><u></u></i></span></div>
<div class="ccg">
<div class="tl conn"><button class="cbn">${ic('<path d="M21 15l-8-5V4a1 1 0 0 0-2 0v6l-8 5v2l8-2v4l-2 1.500V22l3-.8 3 .8v-1.500L13 19v-4l8 2z" fill="currentColor"/>',26,1)}</button><button class="cbn on b">${ic('<circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M7 12a5 5 0 0 1 10 0M3.500 12a8.500 8.500 0 0 1 17 0"/>',28)}</button><button class="cbn on b">${ic('<path d="M2 9a14 14 0 0 1 20 0M6 13a8 8 0 0 1 12 0M10 17a3 3 0 0 1 4 0"/>',30,2.4)}</button><div class="cmini"><i class="cn g1 on">${ic('<path d="M5 18v-2M10 18v-5M15 18V9M20 18V5"/>',17,3)}</i><i class="cn b on">${ic('<path d="M7 7l10 10-5 4V3l5 4L7 17"/>',16)}</i><i class="cn">${ic('<path d="M10 14l4-4M8.500 10.500l-2 2a3 3 0 0 0 4 4l2-2M15.500 13.500l2-2a3 3 0 0 0-4-4l-2 2M4 4l16 16"/>',16)}</i><i class="cn">${ic('<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/>',16)}</i></div></div>
<div class="tl med"><div class="art"></div><span class="ap">${ic('<circle cx="12" cy="11" r="2" fill="currentColor"/><path d="M8 11a4 4 0 0 1 8 0M5 11a7 7 0 0 1 14 0M8 19l4-5 4 5z"/>',22)}</span><div class="mtt"><b id="mTitle">재생 중인 노래 없음</b><small id="mArtist"></small></div><div class="mc">${ic('<path d="M11 6L4 12l7 6zM20 6l-7 6 7 6z" fill="currentColor"/>',30,1)}${ic('<path d="M7 4l13 8-13 8z" fill="currentColor"/>',36,1)}${ic('<path d="M13 6l7 6-7 6zM4 6l7 6-7 6z" fill="currentColor"/>',30,1)}</div></div>
<div class="vs" data-v="v"><i style="height:0%"></i><span>${ic(MUTE,30,2)}</span></div>
<div class="vs" data-v="b"><i style="height:69%"></i><span class="sun">${ic('<circle cx="12" cy="12" r="4.500" fill="currentColor"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2 2M16.700 16.700l2 2M18.700 5.300l-2 2M7.300 16.700l-2 2"/>',30)}</span></div>
<div class="tl dnd"><span class="mn">${ic('<path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z" fill="#6b5bd2" stroke="none"/>',26)}</span><b>방해 금지</b>${ic('<path d="M8 10l4-4 4 4M8 14l4 4 4-4"/>',16)}</div>
${T('<path d="M20 12a8 8 0 1 1-3-6.200M20 4v5h-5"/><rect x="9.500" y="11" width="5" height="4.500" rx="1" fill="currentColor"/>','on red',34)}${T('<rect x="2.500" y="7" width="16" height="10" rx="3"/><path d="M21 10.500v3"/><rect x="5" y="9.500" width="4" height="5" rx="1" fill="currentColor" stroke="none"/>')}
${T('<path d="M9 2.500h6v4l-1.500 2.500V21h-3V9L9 6.500z" fill="currentColor"/>')}${T('<rect x="5.500" y="2.500" width="13" height="19" rx="3"/><path d="M8.500 7h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" stroke-width="2.600"/>')}${T('<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M12 3a9 9 0 0 0 0 18z" fill="#f2eff8" stroke="none"/>','on dk')}${T('<rect x="3" y="6" width="13" height="10" rx="2"/><rect x="8" y="9" width="13" height="10" rx="2" fill="#4c5190"/>')}
${T(P.timer,'tm')}${T('<path d="M15.500 8c-2-3-7-2-6.500 1.500C9.500 13 15.500 11 15 15c-.5 3.500-5.500 3.500-7 .5" stroke-width="3"/>')}${T('<path d="M5 10v4M9 6v12M13 3v18M17 7v10M21 10v4" stroke-width="2.400"/>')}${T('<path d="M8 10a4 4 0 1 1 8 0c0 3.500-3 3.500-3 6.500a3 3 0 0 1-5.500 1.500M5 10a7 7 0 0 1 14 0" />')}
${T('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.500" fill="currentColor"/>')}${T('<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><rect x="8" y="8" width="3" height="3"/><rect x="13" y="8" width="3" height="3"/><rect x="8" y="13" width="3" height="3"/>','qr')}${T('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.500 2h-15zM10 20a2 2 0 0 0 4 0M4 4l16 16" />','on red')}<span></span>
${T('<path d="M4 4l16 16M13 6h.01M17 6h.01M17 10h.01M7 11h.01M7 15h.01M11 17h.01M17 14h.01M13 12h.01" stroke-width="2.600"/>')}</div>
<div class="ccside">${ic('<path d="M12 20s-7.500-4.600-7.500-10.200A4.300 4.300 0 0 1 12 7.200a4.300 4.300 0 0 1 7.500 2.600C19.500 15.400 12 20 12 20z" fill="currentColor"/>',26)}${ic('<path d="M9 18V6l10-2v12"/><circle cx="6.500" cy="18" r="2.500" fill="currentColor"/><circle cx="16.500" cy="16" r="2.500" fill="currentColor"/>',26)}${ic('<path d="M12 11v10M8.500 8a5 5 0 0 0 0 6M15.500 8a5 5 0 0 1 0 6M5.500 5.500a9 9 0 0 0 0 11M18.500 5.500a9 9 0 0 1 0 11"/><circle cx="12" cy="10.500" r="1.400" fill="currentColor"/>',26)}</div>`;
const setV=(v,p)=>{v.firstChild.style.height=p*100+"%";if(v.dataset.v==="v"){v.querySelector("span").innerHTML=ic(p<.03?MUTE:SPK,30,2);v.classList.toggle("lo",p<.12)}else $("device").style.filter=`brightness(${.5+.5*p})`};
cc.addEventListener("click",e=>{const b=e.target.closest(".cbn,.cmini .cn");if(b){if(b.classList.contains("tm"))return openApp("clock");if(b.classList.contains("qr"))return openApp("camera");b.classList.toggle("on")}else if(e.target===cc)closePanels()});
cc.querySelectorAll(".vs").forEach(v=>{const set=e=>{const r=v.getBoundingClientRect();setV(v,Math.max(0,Math.min(1,(r.bottom-e.clientY)/r.height)))};v.onpointerdown=e=>{v.setPointerCapture(e.pointerId);v.d=1;set(e)};v.onpointermove=e=>v.d&&set(e);v.onpointerup=()=>v.d=0});
cc.querySelector('.vs[data-v="v"]').classList.add("lo");
/* 음악 앱에서 노래를 틀면 제어센터에 뜹니다 (기본은 숨김) */
const PAL=["#e5484d","#f08c3a","#e8b931","#46b36b","#3a9bdc","#7a5cd6","#d9559c"];
new MutationObserver(()=>{const u=UI.mu,m=u&&u.i!=null&&(DATA.music||[])[u.i],md=cc.querySelector(".med");$("mTitle").textContent=m?m.title:"재생 중인 노래 없음";$("mArtist").textContent=m?m.artist:"";md.querySelector(".art").style.background=m?PAL[u.i%PAL.length]:"#8e8e93";
 md.querySelector(".mc").children[1].outerHTML=ic(m&&u.play?'<path d="M8 5v14M16 5v14" stroke-width="4"/>':'<path d="M7 4l13 8-13 8z" fill="currentColor"/>',36,1)}).observe(cc,{attributes:true,attributeFilter:["class"]});
})();

/* ---------- 전화 기록 ---------- */
function ensureC(x){if(x&&x.id)return x;const num=(x&&x.name)||"",id="n"+num.replace(/\D/g,"");let c=DATA.contacts.find(a=>a.id===id);if(!c){c={id,name:num,number:num,spam:true,calls:[],messages:[],photo:"",favorite:false};DATA.contacts.push(c)}return c}
function stamp(){const d=now(),p=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`}
function recordCall(x,dir,missed){x.calls??=[];x.calls.unshift(missed?K("in","부재중 전화",stamp(),"missed"):K(dir,"휴대전화",stamp()));if(state.app==="phone"&&state.cur==="appScreen")renderApp()}

/* ---------- 걸려 오는 전화 (iOS 수신 화면) ---------- */
function incomingCall(x,script){const dev=$("device");
 if(dev.querySelector(".call,.inc,.kcall"))return setTimeout(()=>incomingCall(x,script),2000);   /* 다른 사람과 통화 중(전화·보이스톡·페이스톡)이거나 이미 전화가 오는 중이면 끝날 때까지 기다렸다가 울림 */
 closePanels();
 const o=document.createElement("div");o.className="inc";
 o.innerHTML=`<div class="inn"><b>${esc(x.name)}</b><small>휴대전화</small></div>
 <button class="ia" data-a="later" style="left:32px">${ic('<circle cx="12" cy="13.500" r="7.500" fill="currentColor"/><path d="M12 9.500v4l2.500 1.500M3.500 6l3-3M20.500 6l-3-3" stroke="currentColor"/>',26,2)}<span>나중에 보기</span></button>
 <button class="ia" data-a="msg" style="right:32px">${ic('<path d="M12 4C7 4 3 7.200 3 11.200c0 2.200 1.200 4.100 3 5.400-.1 1.200-.7 2.500-1.700 3.400 2.200-.1 3.800-.9 4.900-1.800.9.200 1.800.3 2.800.3 5 0 9-3.200 9-7.200S17 4 12 4z" fill="currentColor" stroke="none"/>',26)}<span>메시지</span></button>
 <div class="isl"><div class="ik"><svg viewBox="10 10 40 40" width="38" height="38"><path d="M16 21c0-4 3-7 7-6l5 2c1 .5 1.500 1.500 1 2.500l-2 4c3 5 6 8 11 10l4-2c1-.5 2-.2 2.500 1l2 5c1 4-2 7-6 7C28 44 16 32 16 21z" fill="#30c85a"/></svg></div><span class="it">밀어서 통화하기</span></div><div class="ihb"></div>`;
 dev.appendChild(o);
 const pill=o.querySelector(".isl"),knob=o.querySelector(".ik"),k=()=>dev.getBoundingClientRect().width/390,max=()=>pill.clientWidth-knob.offsetWidth-12;let sx=null;
 const answer=()=>{o.remove();startCall(x,{incoming:true,host:dev,script})},
  miss=()=>{o.remove();recordCall(x,"in",true)};
 knob.onpointerdown=e=>{knob.setPointerCapture(e.pointerId);sx=e.clientX;knob.style.transition="none"};
 knob.onpointermove=e=>{if(sx==null)return;const dx=Math.max(0,Math.min(max(),(e.clientX-sx)/k()));knob.style.transform=`translateX(${dx}px)`;o.querySelector(".it").style.opacity=1-dx/max()*1.4};
 const end=e=>{if(sx==null)return;const dx=Math.max(0,Math.min(max(),(e.clientX-sx)/k()));sx=null;if(dx>max()*.7){knob.style.transform=`translateX(${max()}px)`;setTimeout(answer,120)}else{knob.style.transition="transform .25s";knob.style.transform="";o.querySelector(".it").style.opacity=""}};
 knob.onpointerup=end;knob.onpointercancel=end;
 o.querySelector('[data-a="later"]').onclick=miss;
 o.querySelector('[data-a="msg"]').onclick=()=>{miss();showToast("전화를 받지 못해 부재중 전화로 남았어요.")};
}
new MutationObserver(()=>$("device").classList.toggle("incall",!!$("device").querySelector(":scope>.call,:scope>.inc"))).observe($("device"),{childList:true});
/* 사이트에 들어오고 delay초 뒤에 전화가 옵니다 (data.js 의 incomingCalls) */
(DATA.incomingCalls||[]).forEach(q=>setTimeout(()=>{const x=DATA.contacts.find(c=>c.id===q.id);if(x)incomingCall(x,q.script)},(q.delay??30)*1000));

/* ---------- 아이콘 v3: 메모 / 음악 / 날씨 (첨부 사진 참고) + TFT (사진 그대로) ---------- */
Object.assign(ICONS,{
notes:`<svg viewBox="0 0 60 60">${LG("n3w","#ffffff","#efeff2")}${LG("n3y","#ffd93a","#ffc400")}<rect width="60" height="60" fill="url(#n3w)"/><rect width="60" height="17" fill="url(#n3y)"/><g fill="#e3a900">${Array.from({length:15},(_,i)=>`<circle cx="${3.5+i*3.6}" cy="17.600" r=".9"/>`).join("")}</g><g stroke="#bcbcc1" stroke-width="2.200" stroke-linecap="round"><path d="M9 31h42M9 44h42"/></g></svg>`,
music:`<svg viewBox="0 0 60 60">${LG("mu3","#fb5a72","#e91f3e")}${LG("mu3n","#ffffff","#ffdbe2")}<rect width="60" height="60" fill="url(#mu3)"/><g fill="url(#mu3n)"><path d="M20 17.500L43 11v27h-4.200V22.200L24.200 26.200V43H20z"/><ellipse cx="17.800" cy="43.500" rx="6.500" ry="5" transform="rotate(-20 17.800 43.500)"/><ellipse cx="36.600" cy="38.500" rx="6.500" ry="5" transform="rotate(-20 36.600 38.500)"/></g></svg>`,
weather:`<svg viewBox="0 0 60 60">${LG("w3a","#2f78e0","#43a2f2")}<rect width="60" height="60" fill="url(#w3a)"/><circle cx="38" cy="24.500" r="10" fill="#ffb92e"/><g fill="#fff" opacity=".93"><circle cx="19" cy="38.500" r="7"/><circle cx="28" cy="32.500" r="10"/><circle cx="38" cy="38.500" r="7"/><rect x="12" y="38.500" width="33" height="7" rx="3.500"/></g></svg>`,
tft:`<img src="images/tft.jpg" alt="">`,
fire24:`<img src="images/fire24.png" alt="">`});
document.querySelectorAll(".icon").forEach(el=>{const k=Object.keys(ICONS).find(k=>el.classList.contains(k));if(k)el.innerHTML=ICONS[k]});
names.tft="TFT";names.fire24="소방안전24";
{const _o2=openApp;openApp=function(a){if(a==="tft"){showToast("TFT는 아직 준비 중이에요.");return}if(a==="fire24"){showToast("소방안전24는 아직 준비 중이에요.");return}_o2(a)}}

/* ---------- 카메라: 실제 카메라로 사진을 찍고 갤러리(사진 앱)에 저장 ---------- */
const CAM={stream:null,face:"environment",zoom:1};
const idb=()=>new Promise((res,rej)=>{const r=indexedDB.open("iphone-photos",1);r.onupgradeneeded=()=>r.result.createObjectStore("p",{keyPath:"id"});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
async function idbPut(p){try{const db=await idb();db.transaction("p","readwrite").objectStore("p").put({id:p.id,src:p.src,date:p.date})}catch(e){}}
(async()=>{try{const db=await idb(),q=db.transaction("p").objectStore("p").getAll();q.onsuccess=()=>q.result.sort((a,b)=>a.id-b.id).forEach(p=>{DATA.photos.push(p);if(DATA.photoCount)DATA.photoCount++})}catch(e){}})();
function stopCam(){if(CAM.stream){CAM.stream.getTracks().forEach(t=>t.stop());CAM.stream=null}}
setInterval(()=>{if(CAM.stream&&(state.app!=="camera"||state.cur!=="appScreen"))stopCam()},700);
function applyZoom(){const v=$("cvid");if(v)v.style.transform=`${CAM.face==="user"?"scaleX(-1) ":""}scale(${CAM.zoom})`}
async function startCam(){stopCam();const v=$("cvid");if(!v)return;
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){showToast("이 브라우저에서는 카메라를 쓸 수 없어요.");return}
 try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:CAM.face,width:{ideal:1920},height:{ideal:1440}},audio:false});
  if(!$("cvid")||state.app!=="camera"){s.getTracks().forEach(t=>t.stop());return}
  CAM.stream=s;v.srcObject=s;v.play().catch(()=>{});applyZoom()}
 catch(e){showToast("카메라 권한을 허용해 주세요.")}}
function shoot(src,w,h,z){const cw=w/z,ch=h/z,k=Math.min(1,1600/cw),c=document.createElement("canvas");c.width=Math.round(cw*k);c.height=Math.round(ch*k);c.getContext("2d").drawImage(src,(w-cw)/2,(h-ch)/2,cw,ch,0,0,c.width,c.height);return c.toDataURL("image/jpeg",.88)}
function savePhoto(src){const p={id:Date.now(),src,date:stamp().slice(0,10)};DATA.photos.push(p);if(DATA.photoCount)DATA.photoCount++;idbPut(p);const th=document.querySelector(".cam .th");if(th)th.style.background=`center/cover url(${src})`;showToast("사진이 저장되었어요.")}
rCam=function(c){const ph=DATA.photos[DATA.photos.length-1];
 shell(c,{dark:true,nf:true,bg:"#000",cls:"cam",body:`<div class="tp">${ic('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',24)}${ic('<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/>',24)}${ic(P.keypad,22)}</div><div class="cv"><video id="cvid" autoplay playsinline muted></video></div><div class="zm"><span>.5</span><span class="on">1×</span><span>2</span><span>4</span><span>8</span></div><button class="shb" id="shb"></button><div class="th" id="cth" style="${ph?`background:center/cover url(${esc(ph.src)})`:""}"></div><div class="md"><span>비디오</span><span class="on">사진</span></div><div class="fp" id="cfp">${ic('<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5"/>',26)}</div><div class="fl" id="fl"></div>`});
 CAM.zoom=1;startCam();
 const zs=[1,1,2,4,8];c.querySelectorAll(".zm span").forEach((s,i)=>s.onclick=()=>{CAM.zoom=zs[i];c.querySelectorAll(".zm span").forEach(x=>x.classList.toggle("on",x===s));applyZoom()});
 on("cfp",()=>{CAM.face=CAM.face==="user"?"environment":"user";startCam()});
 on("cth",()=>{if(!DATA.photos.length)return;openApp("photos");UI.ph=PHN()+DATA.photos.length-1;renderApp()});
 on("shb",()=>{const f=$("fl");f.classList.remove("on");void f.offsetWidth;f.classList.add("on");const v=$("cvid");
  if(CAM.stream&&v.videoWidth){savePhoto(shoot(v,v.videoWidth,v.videoHeight,CAM.zoom));return}
  const i=document.createElement("input");i.type="file";i.accept="image/*";i.setAttribute("capture","environment");
  i.onchange=()=>{const fl=i.files[0];if(!fl)return;const im=new Image();im.onload=()=>{savePhoto(shoot(im,im.naturalWidth,im.naturalHeight,1));URL.revokeObjectURL(im.src)};im.src=URL.createObjectURL(fl)};i.click()})};

/* ---------- Safari ---------- */
Object.assign(ICONS,{safari:`<svg viewBox="0 0 60 60">${LG("sfa","#f9f9fb","#e4e4e9")}${LG("sfb","#41b0f7","#1668e3")}${LG("sfr","#ff4a40","#d60f1c",0,0,1,1)}${LG("sfw","#ffffff","#e2e2e7",0,0,1,1)}<rect width="60" height="60" fill="#d9d9de"/><rect x="1.500" y="1.500" width="57" height="57" rx="13" fill="url(#sfa)"/><circle cx="30" cy="30" r="24.300" fill="url(#sfb)"/><g stroke="#69e5ff" stroke-linecap="round">${Array.from({length:36},(_,i)=>{const a=i*10*Math.PI/180,big=i%3===0,r1=big?19.600:20.600,r2=22.200;return`<path stroke-width="${big?1:.8}" d="M${(30+r1*Math.sin(a)).toFixed(2)} ${(30-r1*Math.cos(a)).toFixed(2)}L${(30+r2*Math.sin(a)).toFixed(2)} ${(30-r2*Math.cos(a)).toFixed(2)}"/>`}).join("")}</g><path d="M27.300 27.300L32.700 32.700L14 46z" fill="url(#sfw)"/><path d="M27.300 27.300L32.700 32.700L46 14z" fill="url(#sfr)"/><circle cx="30" cy="30" r="2.900" fill="#ff8d93" stroke="#e0202b" stroke-width=".7"/></svg>`});
document.querySelectorAll(".icon.safari").forEach(el=>el.innerHTML=ICONS.safari);
const SF={view:"page",tab:null,priv:false,tabs:null};
const SFI={back:'<path d="M15 5l-7 7 7 7"/>',fwd:'<path d="M9 5l7 7-7 7"/>',share:'<path d="M12 15V3M8 7l4-4 4 4M7 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1"/>',book:'<path d="M12 6.500c-2-1.600-5-2.200-9-2.200v14c4 0 7 .6 9 2.200 2-1.600 5-2.200 9-2.200v-14c-4 0-7 .6-9 2.200zM12 6.500v14"/>',tabs:'<rect x="8" y="3" width="13" height="13" rx="3"/><path d="M16 19.500H7a4 4 0 0 1-4-4V8"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',check:'<path d="M5 12.500l5 5L20 7"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',lock:'<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M9 11V8a3 3 0 0 1 6 0v3"/>',reload:'<path d="M19 12a7 7 0 1 1-2.100-5M19 4v4h-4"/>',person:'<circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 21c0-5 4-7 8-7s8 2 8 7z" fill="currentColor"/>'};
const APPLE='<svg viewBox="0 0 24 24" width="40" height="40" fill="#6b6b6e"><path d="M16.400 12.700c0-2.300 1.900-3.400 2-3.500-1.100-1.600-2.800-1.800-3.400-1.800-1.400-.1-2.800.9-3.500.9-.7 0-1.800-.8-3-.8-1.500 0-3 .9-3.800 2.300-1.600 2.800-.4 7 1.200 9.300.8 1.100 1.700 2.400 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7c1.300 0 2.100-1.100 2.800-2.300.9-1.300 1.300-2.500 1.300-2.600-.1 0-2.500-1-2.500-3.800zM14.200 5.800c.6-.8 1.100-1.800.9-2.800-.9 0-2 .6-2.600 1.400-.6.700-1.100 1.700-.9 2.700 1 .1 2-.5 2.600-1.300z"/></svg>';
const sfTabs=()=>SF.tabs??=DATA.safari.tabs.map(t=>t.id),sfT=id=>DATA.safari.tabs.find(t=>t.id===id);
function sfPage(t){
 if(t.type==="score"){const L=t.live;return`<div class="sc-p"><div class="sc-h"><b>골라이브</b><span>실시간 스코어</span></div><div class="sc-d">${esc(t.date)}</div><div class="sc-chips"><span class="on">전체</span><span>K리그1</span><span>K리그2</span><span>EPL</span><span>라리가</span></div><div class="sc-live"><div class="sc-lg"><span>${esc(L.league)}</span><em>● ${esc(L.min)}</em></div><div class="sc-sc"><b>${esc(L.home)}</b><strong>${L.hs} : ${L.as}</strong><b>${esc(L.away)}</b></div><div class="sc-ev">${L.ev.map(e=>`<p>${esc(e)}</p>`).join("")}</div></div><h4>오늘의 경기</h4>${t.matches.map(m=>`<div class="sc-m"><span>${esc(m[0])}</span><b>${m[1]} : ${m[2]}</b><span>${esc(m[3])}</span><em class="${m[4].includes("'")?"lv":""}">${esc(m[4])}</em></div>`).join("")}<h4>순위</h4>${t.table.map((r,i)=>`<div class="sc-t"><i>${i+1}</i><span>${esc(r[0])}</span><em>${r[1]}</em><b>${r[2]}</b></div>`).join("")}</div>`}
 return`<div class="pp" style="--c:${t.color}"><div class="pp-head"><b>${esc(t.site)}</b><span>${esc(t.siteSub)}</span></div><div class="pp-body"><div class="pp-crumb">${esc(t.crumb)}</div><h1>${esc(t.title)}</h1><div class="pp-meta">${esc(t.authors)}<br>${esc(t.journal)}</div><div class="pp-btns"><span class="pp-b on">원문 보기 (PDF)</span><span class="pp-b">인용</span><span class="pp-b">저장</span></div><div class="pp-tabs"><span class="on">초록</span><span>목차</span><span>참고문헌</span></div><h3>초록</h3><p>${t.ko}</p><div class="pp-kw">${t.kw.map(k=>`<span>${esc(k)}</span>`).join("")}</div><h3>Abstract</h3><p class="en">${t.en}</p>${t.sec.map(s=>`<h3>${esc(s[0])}</h3><p>${esc(s[1])}</p>`).join("")}</div></div>`}
function sfToolbar(){return`<div class="sf-tb"><button class="d">${ic(SFI.back,24,2)}</button><button class="d">${ic(SFI.fwd,24,2)}</button><button id="sfs">${ic(SFI.share,23,1.8)}</button><button id="sfk">${ic(SFI.book,24,1.8)}</button><button id="sft">${ic(SFI.tabs,24,1.8)}</button></div>`}
function rSafari(c){
 const tabs=sfTabs(),tt=m=>showToast(m),redo=()=>renderApp(),dom=(c.querySelector(".x"),0);
 if(SF.view==="tabs"){
  const cards=SF.priv?"":tabs.map(id=>{const t=sfT(id);return`<div class="sf-card" data-o="${id}"><div class="sf-cv"><div class="sf-th">${sfPage(t)}</div></div><button class="sf-x" data-x="${id}">${ic(SFI.x,13,2.6)}</button><div class="sf-ct"><i style="background:${t.color}">${esc(t.icon)}</i><span>${esc(t.title)}</span></div></div>`}).join("");
  shell(c,{nf:true,bg:"#e8ebee",cls:"sf ov",body:`<div class="sf-ot"><button class="sf-c" id="sfm">${ic(SFI.more||P.more,22,2)}</button><button class="sf-c" id="sfq">${ic(P.search,22,2.2)}</button></div><div class="sf-grid">${cards||`<p class="sf-empty">${SF.priv?"열린 비공개 탭이 없습니다.":"열린 탭이 없습니다."}</p>`}</div>`,
   bottom:`<div class="sf-ob"><button class="sf-c" id="sfn">${ic(P.plus,24,2)}</button><div class="sf-seg"><button data-g="p" class="${SF.priv?"on":""}">비공개</button><button data-g="n" class="${SF.priv?"":"on"}">${tabs.length}개의 탭</button></div><button class="sf-c blue" id="sfd">${ic(SFI.check,24,2.4)}</button></div>`});
  on("sfm",()=>tt("탭 그룹은 시뮬레이션입니다."));on("sfq",()=>tt("탭 검색은 시뮬레이션입니다."));
  on("sfn",()=>{SF.view="page";SF.tab=null;redo()});on("sfd",()=>{SF.view="page";redo()});
  c.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{SF.priv=b.dataset.g==="p";redo()});
  c.querySelectorAll("[data-x]").forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.x;SF.tabs=tabs.filter(x=>x!==id);if(SF.tab===id)SF.tab=null;redo()});
  c.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{SF.tab=b.dataset.o;SF.view="page";redo()});return}
 if(SF.tab&&sfT(SF.tab)){const t=sfT(SF.tab);
  shell(c,{nf:true,bg:"#fff",cls:"sf pg2",body:sfPage(t),bottom:`<div class="sf-url"><span class="aa">aA</span><div class="u">${ic(SFI.lock,12,2.4)}${esc(t.domain)}</div><span class="rl">${ic(SFI.reload,17,2)}</span></div>${sfToolbar()}`})}
 else{
  const fav=DATA.safari.favorites.map((f,i)=>`<button class="sf-fi" data-f="${i}"><span class="sf-ft" style="${f.apple?"background:#ececf0":`background:${f.bg};color:${f.c}`};${f.small?"font-size:15px;":""}${f.t==="yahoo!"?"font-style:italic;":""}">${f.apple?APPLE:esc(f.t)}</span><span class="sf-fn">${esc(f.n)}</span></button>`).join(""),
  sug=DATA.safari.suggestions.map((s,i)=>`<button class="sf-sc" data-s="${i}"><span class="sf-si">${esc(s.ch)}</span><b>${esc(s.t)}</b><small>${esc(s.s)}</small></button>`).join("");
  shell(c,{nf:true,bg:"#f1f1f6",cls:"sf",body:`<div class="sf-st"><div class="sf-bar">${ic(P.search,19,2.4)}<input id="sfin" placeholder="검색 또는 웹사이트 이름 입력"><span class="mic">${ic(SFI.mic,20,2)}</span></div><div class="sf-priv"><h2>개인정보 보호 브라우징</h2><p>Safari는 기본적으로 추적을 방지하도록 개인정보 보호를 우선하여 설계되었습니다. 개인정보 보호 브라우징은 추가적인 보호 기능을 제공하며, 탭을 닫으면 방문한 페이지, 검색 기록, 자동 완성 정보를 Safari가 기억하지 않습니다.</p></div><div class="sf-hd"><span>${ic(SFI.person,24,0)}즐겨찾기</span></div><div class="sf-fav">${fav}</div><div class="sf-hd"><span>제안</span><em>모두 보기 ›</em></div><div class="sf-sg">${sug}</div></div>`,bottom:sfToolbar()});
  c.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>tt(`${DATA.safari.favorites[b.dataset.f].n} 페이지는 열 수 없어요.`));
  c.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{const s=DATA.safari.suggestions[b.dataset.s];if(!s.tab)return tt("이 페이지는 열 수 없어요.");if(!sfTabs().includes(s.tab))SF.tabs.push(s.tab);SF.tab=s.tab;redo()});
  const inp=$("sfin");inp.onkeydown=e=>{if(e.key==="Enter"){inp.blur();tt("검색은 시뮬레이션입니다.")}}}
 on("sft",()=>{SF.view="tabs";redo()});on("sfs",()=>tt("공유는 시뮬레이션입니다."));on("sfk",()=>tt("북마크는 시뮬레이션입니다."))}

/* 네이버 지도: 오류가 나도 다른 앱에 영향이 없도록 분리 */
try{if(DATA.nmap){
/* ---------- 네이버 지도 ---------- */
const NMD=DATA.nmap,NMP=NMD.places,NMCAT=NMD.cats;
Object.assign(ICONS,{map:`<svg viewBox="0 0 60 60">${LG("nmI0","#ffffff","#f1f3f6")}${LG("nmI1","#1b57f0","#31d65a")}<rect width="60" height="60" fill="url(#nmI0)"/><path d="M30 54C30 54 12.500 39 12.500 25.500a17.500 17.500 0 0 1 35 0C47.500 39 30 54 30 54z" fill="url(#nmI1)"/><path d="M21.500 33.500V17.500h5l6.500 9.300V17.500h5v16h-5l-6.500-9.300v9.300z" fill="#fff"/></svg>`});
names.map="네이버 지도";
document.querySelectorAll(".icon.map").forEach(el=>el.innerHTML=ICONS.map);
const NMLOGO=s=>`<svg viewBox="0 0 60 60" width="${s}" height="${s}">${LG("nmL1","#1b57f0","#31d65a")}<path d="M30 56C30 56 9 39 9 24.500a21 21 0 0 1 42 0C51 39 30 56 30 56z" fill="url(#nmL1)"/><path d="M20.500 32.500V16.500h5.500l8 10.300V16.500h5.500v16H34l-8-10.300v10.300z" fill="#fff"/></svg>`;
const NMAV=`<svg viewBox="0 0 36 36" width="36" height="36"><circle cx="18" cy="18" r="18" fill="#2fbf5b"/><path d="M5.500 17a12.500 11 0 0 1 25 0z" fill="#16181c"/><ellipse cx="13" cy="22" rx="4.200" ry="4.700" fill="#fff"/><ellipse cx="23" cy="22" rx="4.200" ry="4.700" fill="#fff"/><circle cx="14" cy="22.500" r="2" fill="#16181c"/><circle cx="22" cy="22.500" r="2" fill="#16181c"/></svg>`;
const NI={route:'<path d="M5 20v-6a4 4 0 0 1 4-4h9M14 5l5 5-5 5"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',gps:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.200" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',pin:'<path d="M12 21s-6.500-5.600-6.500-11a6.500 6.500 0 0 1 13 0c0 5.400-6.500 11-6.500 11z"/><circle cx="12" cy="10" r="2.200"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',star:'<path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100-4.400-4.300 6.100-.9z"/>',train:'<rect x="5" y="3" width="14" height="14" rx="4"/><path d="M5 11h14M8 21l1.500-4M16 21l-1.500-4"/>',swap:'<path d="M8 4v16M8 4L4 8M8 4l4 4M16 20V4M16 20l-4-4M16 20l4-4"/>',phone:'<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',note:'<path d="M5 4h14v16H5zM9 9h6M9 13h6M9 17h3"/>'};
const NMT=[
 a=>a?`<path d="M12 21.500s-7-6-7-11.500a7 7 0 0 1 14 0c0 5.500-7 11.500-7 11.500z" fill="currentColor"/><circle cx="12" cy="10" r="2.600" fill="#fff" stroke="none"/>`:`<path d="M12 21.500s-7-6-7-11.500a7 7 0 0 1 14 0c0 5.500-7 11.500-7 11.500z"/><circle cx="12" cy="10" r="2.600"/>`,
 a=>`<rect x="4" y="5" width="16" height="15" rx="3" ${a?'fill="currentColor"':""}/><path d="M8 3v4M16 3v4"/><path d="M9.500 16.500v-7l5 7v-7" stroke="${a?"#fff":"currentColor"}" stroke-width="1.800"/>`,
 a=>`<rect x="5" y="3.500" width="14" height="14" rx="3.500" ${a?'fill="currentColor"':""}/><path d="M5 11h14M8 21l1.500-3.500M16 21l-1.500-3.500" ${a?'':''}/><circle cx="9" cy="14.200" r=".9" fill="${a?"#fff":"currentColor"}"/><circle cx="15" cy="14.200" r=".9" fill="${a?"#fff":"currentColor"}"/>`,
 a=>`<rect x="3.500" y="10" width="17" height="7" rx="2" ${a?'fill="currentColor"':""}/><path d="M6 10l1.500-4.500h9L18 10M7 17v2.500M17 17v2.500"/><circle cx="8" cy="13.500" r=".9" fill="${a?"#fff":"currentColor"}"/><circle cx="16" cy="13.500" r=".9" fill="${a?"#fff":"currentColor"}"/>`,
 a=>`<circle cx="12" cy="12" r="9" ${a?'fill="currentColor"':""}/><path d="M12 7.500l1.400 3 3.200.4-2.400 2.200.7 3.200-2.900-1.600-2.900 1.600.7-3.200-2.400-2.200 3.200-.4z" stroke="${a?"#fff":"currentColor"}"/>`
];
const NMTN=["발견","예약","대중교통","내비게이션","북마크"];
const NMS=[96,300,690];
const NM={tab:0,z:1,cx:NMD.me.x,cy:NMD.me.y,ay:290,sel:null,cat:null,view:"home",seg:1,chip:0,snap:1,saved:new Set(NMD.saved||[]),mode:2,route:null,tvSub:0,dt:0};
const nmP=id=>NMP.find(p=>p.id===id);
const nmDist=p=>p.dm||Math.round(Math.hypot(p.x-NMD.me.x,p.y-NMD.me.y)*1.4/10)*10;
const nmDs=m=>m>=1000?(m/1000).toFixed(1)+"km":m+"m";
const nmClr=p=>(NMCAT[p.cat]||["📍","#666"]);
const nmArr=m=>{const d=new Date(now().getTime()+m*6e4),h=d.getHours();return(h<12?"오전 ":"오후 ")+(h%12||12)+":"+String(d.getMinutes()).padStart(2,"0")};
const nmDay=a=>{const d=new Date(now().getTime()+a*864e5);return`${d.getMonth()+1}.${d.getDate()}.(${"일월화수목금토"[d.getDay()]})`};
const nmStar=(on,s=22)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="${on?"#ffb300":"none"}" stroke="${on?"#ffb300":"currentColor"}" stroke-width="1.8" stroke-linejoin="round">${NI.star}</svg>`;
const NMXS=[60,185,310,430,550,670,790,910,1000,1120,1240,1360,1480,1580],NMYS=[20,120,220,320,420,520,620,720,820,920,1020,1120,1220,1320,1420,1520,1620,1720];

function nmMap(){
 if(NM.svg)return NM.svg;
 let r=20261021;const rnd=()=>(r=(r*1664525+1013904223)%4294967296)/4294967296,xs=NMXS,ys=NMYS,sp={};
 NMP.forEach(p=>{if(!p.cell)return;const i=xs.findIndex((x,k)=>p.x>=x&&p.x<(xs[k+1]||0)),j=ys.findIndex((y,k)=>p.y>=y&&p.y<(ys[k+1]||0));if(i>=0&&j>=0)sp[i+","+j]=p.cell});
 const R=(x,y,w,h,f,s="#dcdcd6",rx=2)=>`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width=".7"/>`;
 let B="";
 for(let i=0;i<xs.length-1;i++)for(let j=0;j<ys.length-1;j++){
  const x=xs[i]+8,y=ys[j]+8,w=xs[i+1]-xs[i]-16,h=ys[j+1]-ys[j]-16,t=sp[i+","+j];
  if(t==="park"){B+=R(x,y,w,h,"#d5e9c6","#bfd9ad",6);for(let k=0;k<9;k++)B+=`<circle cx="${(x+10+rnd()*(w-20)).toFixed(0)}" cy="${(y+10+rnd()*(h-20)).toFixed(0)}" r="${(5+rnd()*4).toFixed(1)}" fill="#b9dba6"/>`}
  else if(t==="school"){B+=R(x,y,w,h,"#f4efde","#e2dcc3",3)+R(x+8,y+8,w*.6,h*.38,"#fbf8ee","#d9d2b6")+R(x+8,y+h*.52,w-16,h*.4,"#e3efd5","#cbdab8",5)}
  else if(t==="fire"){B+=R(x,y,w,h,"#f8e4e1","#e8c1bb",3)+R(x+6,y+8,w-12,h*.46,"#fff","#e0a8a1")+R(x+6,y+h*.6,w*.55,h*.32,"#f3c7c1","#d99a93")+R(x+w*.68,y+h*.62,w*.24,h*.3,"#fff","#e0a8a1")}
  else if(t==="villa"){B+=R(x,y,w,h,"#f4f4f2","#d8d8d2",3)+R(x+8,y+10,w*.52,h*.5,"#fff","#c9c9c2")+R(x+w*.6,y+10,w*.3,h*.38,"#fafafa","#c9c9c2")+R(x+8,y+h*.7,w-16,h*.2,"#ececea","#d0d0ca")}
  else if(t==="culture"){B+=R(x,y,w,h,"#eee7f6","#d8cce9",3)+R(x+8,y+8,w-16,h-16,"#faf6fd","#cdbfe3",12)}
  else if(t==="hosp"){B+=R(x,y,w,h,"#e6f1f7","#c2d9e6",3)+R(x+8,y+8,w*.6,h-16,"#fbfdfe","#bdd3e0")+R(x+w*.7,y+h*.3,w*.22,h*.5,"#f3f9fc","#bdd3e0")}
  else if(t==="apt"){const n=3;for(let a=0;a<n;a++)B+=R(x+6+a*(w-12)/n,y+8,(w-12)/n-6,h-16,"#e6e8ee","#c8ccd6",3);}
  else{const c=1+(rnd()>.45),q=1+(rnd()>.4);for(let a=0;a<c;a++)for(let b=0;b<q;b++){const bw=w/c,bh=h/q,n=3+rnd()*4;B+=R(x+a*bw+n,y+b*bh+n,bw-n*2,bh-n*2,["#fcfcfb","#f6f6f3","#f0f0ed"][rnd()*3|0])}}
 }
 let S="";xs.forEach(x=>S+=`<path d="M${x} 0V1800"/>`);ys.forEach(y=>S+=`<path d="M0 ${y}H1600"/>`);
 const T=(x,y,t,o="")=>`<text x="${x}" y="${y}" ${o}>${t}</text>`;
 NM.svg=`<svg width="1600" height="1800" viewBox="0 0 1600 1800" font-family="-apple-system,'Apple SD Gothic Neo','Noto Sans KR',sans-serif">
<defs><clipPath id="nmcl"><path d="M1010 0L930 130L720 270L500 385L270 480L0 590V1800H1600V0Z"/></clipPath></defs>
<rect width="1600" height="1800" fill="#eeeeea"/>
<g clip-path="url(#nmcl)">${B}
<g fill="none" stroke="#d6d6d0" stroke-width="12">${S}</g><g fill="none" stroke="#fff" stroke-width="9.500">${S}</g>
<path d="M1000 0V1800" stroke="#e6aa63" stroke-width="23" fill="none"/><path d="M1000 0V1800" stroke="#f9d4a4" stroke-width="18" fill="none"/>
<path d="M0 820H1600" stroke="#e2cb92" stroke-width="17" fill="none"/><path d="M0 820H1600" stroke="#faebc4" stroke-width="13" fill="none"/>
<path d="M1580 0V1800" stroke="#e2cb92" stroke-width="17" fill="none"/>
</g>
<path d="M0 0H900L820 90L640 200L450 300L250 390L0 470Z" fill="#a9d3f4"/>
<path d="M900 0H975L895 120L690 245L480 350L260 445L0 545V470L250 390L450 300L640 200L820 90Z" fill="#cfe6bd"/>
<path d="M1010 0L930 130L720 270L500 385L270 480L0 590" stroke="#e6aa63" stroke-width="26" fill="none"/>
<path d="M1010 0L930 130L720 270L500 385L270 480L0 590" stroke="#f9d4a4" stroke-width="21" fill="none"/>
<path d="M1010 0L930 130L720 270L500 385L270 480L0 590" stroke="#fff" stroke-width="1.500" stroke-dasharray="10 9" fill="none" opacity=".8"/>
${T(300,230,"시광강",'font-size="26" font-style="italic" letter-spacing="8" fill="#6da7da" transform="rotate(-27 300 230)"')}
${T(620,155,"시광강",'font-size="22" font-style="italic" letter-spacing="6" fill="#6da7da" transform="rotate(-27 620 155)"')}
${T(250,418,"시광강변로",'font-size="12" fill="#a97a3c" transform="rotate(-24 250 418)"')}
${T(800,1215,"시광동",'font-size="40" font-weight="500" fill="#9a9a96" text-anchor="middle" letter-spacing="3"')}${T(800,1245,"Sigwang-dong",'font-size="22" fill="#a8a8a3" text-anchor="middle"')}
${T(1240,1470,"작도동",'font-size="40" font-weight="500" fill="#9a9a96" text-anchor="middle" letter-spacing="3"')}${T(1240,1500,"Jakdo-dong",'font-size="22" fill="#a8a8a3" text-anchor="middle"')}
${T(1240,640,"시광2동",'font-size="34" font-weight="500" fill="#9a9a96" text-anchor="middle" letter-spacing="2"')}
${T(1007,1260,"작도대로",'font-size="12" fill="#a97a3c" transform="rotate(90 1007 1260)"')}
${T(1007,560,"작도대로",'font-size="12" fill="#a97a3c" transform="rotate(90 1007 560)"')}
${T(420,826,"시광로",'font-size="11" fill="#a28a4d"')}${T(1300,826,"시광로",'font-size="11" fill="#a28a4d"')}
<g id="nmRt" fill="none" stroke-linecap="round" stroke-linejoin="round"></g>
</svg>`;
 return NM.svg}

function nmMarkers(){$("nmMk").innerHTML=NMP.map(p=>{const[e,c]=nmClr(p);return`<button class="nm-mk" data-id="${p.id}" style="--c:${c}"><i></i><span>${esc(p.name)}</span></button>`}).join("")+`<div class="nm-me" id="nmMe"><b></b><i></i></div>`}
function nmCam(){const z=NM.z,w=$("nmWorld");if(!w)return;w.style.transform=`translate(${195-NM.cx*z}px,${NM.ay-NM.cy*z}px) scale(${z})`;
 const pos=(el,x,y)=>{const sx=195+(x-NM.cx)*z,sy=NM.ay+(y-NM.cy)*z;el.style.transform=`translate(${sx.toFixed(1)}px,${sy.toFixed(1)}px)`;el.style.display=(sx<-120||sx>510||sy<-80||sy>920)?"none":""};
 $("nmMk").querySelectorAll(".nm-mk").forEach(m=>{const p=nmP(m.dataset.id);pos(m,p.x,p.y)});pos($("nmMe"),NMD.me.x,NMD.me.y)}
function nmFly(f){const n=$("nm");n.classList.add("anim");f();nmCam();clearTimeout(nmFly.t);nmFly.t=setTimeout(()=>n.classList.remove("anim"),450)}
function nmMarkClass(){const ch=NM.cat!=null?NMD.chips[NM.cat].cats:null;$("nmMk").querySelectorAll(".nm-mk").forEach(m=>{const p=nmP(m.dataset.id);m.classList.toggle("on",p.id===NM.sel);m.classList.toggle("f",!!ch&&!ch.includes(p.cat)&&p.id!==NM.sel)})}
const nmNear=(i,s)=>{let b=i[0];i.forEach(v=>{if(Math.abs(v-s)<Math.abs(b-s))b=v});return b};
function nmPath(p){const m=NMD.me,ys=nmNear(NMYS,m.y),xs=nmNear(NMXS,p.x),d=`M${m.x} ${m.y}V${ys}H${xs}V${p.y}H${p.x}`,len=Math.abs(m.y-ys)+Math.abs(m.x-xs)+Math.abs(ys-p.y)+Math.abs(xs-p.x);return{d,m:Math.max(20,Math.round(len*1.4/10)*10)}}
function nmRouteDraw(){const g=$("nmRt");if(!g)return;if(!NM.route){g.innerHTML="";return}const p=nmP(NM.route),{d}=nmPath(p);g.innerHTML=`<path d="${d}" stroke="#fff" stroke-width="15"/><path d="${d}" stroke="#1e5dff" stroke-width="9"/><path d="${d}" stroke="#fff" stroke-width="1.800" stroke-dasharray="1 14" opacity=".9"/>`}
function nmSnap(i){NM.snap=i;$("nm").style.setProperty("--sh",NMS[i]+"px");$("nmSheet").classList.toggle("full",i===2);nmFloat()}
function nmFloat(){$("nmBk").classList.toggle("hide",NM.view!=="home"||NM.snap>1);$("nmFl").classList.toggle("hide",NM.snap===2)}
const nmTm=t=>t>=60?`<b>${Math.floor(t/60)}</b>시간 <b>${t%60}</b>분`:`<b>${t}</b>분`;
const nmModes=p=>{const m=p.dm||nmPath(p).m,w=Math.max(1,Math.round(m/75)),car=p.car||Math.max(2,Math.round(m/380)+2),tr=Math.max(5,Math.round(car*1.8+6)),bk=Math.max(1,Math.round(m/230));return[{e:"🚌",n:"대중교통",t:tr,s:`도보 ${Math.min(9,Math.max(2,Math.round(w*.3)))}분 · 버스·지하철 이용`},{e:"🚗",n:"자동차",t:car,s:`${nmDs(m)} · 택시 약 ${(3800+Math.round(m/130)*100).toLocaleString("ko-KR")}원`},{e:"🚶",n:"도보",t:w,s:`${nmDs(m)} · 평지 위주`},{e:"🚲",n:"자전거",t:bk,s:`${nmDs(m)} · 자전거도로 이용`}]};
const nmUp=a=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${a}</svg>`;
function nmThumb(p,s=84){const[e,c]=nmClr(p);return`<div class="th" style="width:${s}px;height:${s}px;background:linear-gradient(135deg,${c}44,${c}cc)">${e}</div>`}
function nmRowP(p){const[e,c]=nmClr(p);return`<div class="nm-row" data-id="${p.id}">${nmThumb(p,64)}<div class="m"><b>${esc(p.name)}</b><small>${esc(p.cat)}${p.tag?" · "+esc(p.tag):""} · ${nmDs(nmDist(p))}</small>${p.rt?`<small class="rt"><s>★</s> ${p.rt} <span>리뷰 ${p.rv}</span></small>`:""}</div><button class="st ${NM.saved.has(p.id)?"on":""}" data-st="${p.id}">${nmStar(NM.saved.has(p.id),24)}</button></div>`}
function vHome(){
 const t=NM.seg,chips=["# 인기 급상승","저장 많은","예약 많은","리뷰 많은"];
 let list;
 if(t===1){const T=[...NMD.trend],k=NM.chip%T.length;const L=T.slice(k).concat(T.slice(0,k));list=L.map((x,i)=>{const p=x.place&&nmP(x.place);return`<div class="nm-row" ${p?`data-id="${p.id}"`:`data-fake="1"`}><div class="th" style="background:linear-gradient(135deg,${x.g[0]},${x.g[1]})">${x.e}</div><div class="m"><b><em>${i+1}</em>${esc(x.n)}</b><small>${esc(x.cat)} · ${esc(x.loc)}</small><div class="tg">${esc(x.tag)}</div></div><button class="st ${p&&NM.saved.has(p.id)?"on":""}" ${p?`data-st="${p.id}"`:""}>${nmStar(p&&NM.saved.has(p.id),24)}</button></div>`}).join("")}
 else list=NMD.hot.map(nmP).map((p,i)=>nmRowP(p).replace(`<b>${esc(p.name)}</b>`,`<b><em>${i+1}</em>${esc(p.name)}</b>`)).join("");
 return`<div class="nm-seg"><button data-seg="0" class="${t===0?"on":""}">${nmUp('<path d="M12 21s-6.500-5.600-6.500-11a6.500 6.500 0 0 1 13 0c0 5.400-6.500 11-6.500 11z" fill="currentColor"/>').replace('width="22" height="22"','width="18" height="18"')}시광동</button><button data-seg="1" class="${t===1?"on":""}"><span class="fl">🔥</span>전국 트렌드</button></div>
<div class="nm-h"><b>${t===1?"전국 인기":"우리 동네 인기"}</b><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#9a9ca3" stroke-width="1.800"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.5"/></svg><small>● 2분 전 업데이트</small></div>
<div class="nm-c2">${chips.map((c,i)=>`<button data-chip="${i}" class="${NM.chip%4===i?"on":""}">${c}</button>`).join("")}</div><div class="nm-list">${list}</div>`}
function vCat(){const ch=NMD.chips[NM.cat],L=NMP.filter(p=>ch.cats.includes(p.cat)).sort((a,b)=>nmDist(a)-nmDist(b));return`<div class="nm-pt"><div><h2><span class="ce">${ch.e}</span>${esc(ch.n)}</h2><small>내 주변 ${L.length}곳 · 가까운 순</small></div><button class="x" data-x>${nmUp(NI.x)}</button></div><div class="nm-list">${L.map(nmRowP).join("")}</div>`}
function vPlace(){const p=nmP(NM.sel),[e,c]=nmClr(p),sv=NM.saved.has(p.id),d=nmDist(p),w=Math.max(1,Math.round(d/75)),I=(ic,t)=>t?`<div class="r"><span>${ic}</span><p>${t}</p></div>`:"";
 return`<div class="nm-pt"><div><h2>${esc(p.name)}</h2><small>${esc(p.cat)}${p.tag?" · "+esc(p.tag):""}</small></div><button class="x" data-x>${nmUp(NI.x)}</button></div>
<div class="nm-mt">${p.rt?`<span><b><s>★</s> ${p.rt}</b> 리뷰 ${p.rv}</span><i></i>`:""}<span>${nmDs(d)}</span><i></i><span>${p.car?`차로 ${p.car}분`:`도보 ${w}분`}</span></div>
<div class="nm-ac"><button data-a="dep"><span>${nmUp(NI.route)}</span>출발</button><button class="pri" data-a="arr"><span>${nmUp(NI.route)}</span>도착</button><button data-a="sv" class="${sv?"on":""}"><span>${nmStar(sv,22)}</span>저장</button><button data-a="sh"><span>${nmUp(SFI.share)}</span>공유</button></div>
<div class="nm-ph">${[0,1,2].map(i=>`<div style="background:linear-gradient(${135+i*40}deg,${c}55,${c}cc)">${i===0?e:["🪑","✨"][i-1]}</div>`).join("")}</div>
<div class="nm-if">${I(nmUp(NI.pin),esc(p.addr)+"<small>시광동 · 도로명</small>")}${I(nmUp(NI.clock),p.hrs&&p.hrs!=="-"?esc(p.hrs):"")}${I(nmUp(NI.phone),esc(p.tel))}${I(nmUp(NI.note),esc(p.desc))}</div>`}
function vRoute(){const p=nmP(NM.route),M=nmModes(p),md=NM.mode,a=M[md];return`<div class="nm-pt"><div><h2>길찾기</h2><small>${esc(p.name)}까지 ${nmDs(p.dm||nmPath(p).m)}</small></div><button class="x" data-x>${nmUp(NI.x)}</button></div>
<div class="nm-rt2"><div class="nm-ft"><div class="d a"></div><div class="d b"></div><div class="tt"><div>내 위치</div><div><b>${esc(p.name)}</b></div></div><button data-sw>${nmUp(NI.swap)}</button></div></div>
<div class="nm-md">${M.map((m,i)=>`<button data-md="${i}" class="${i===md?"on":""}"><span>${m.e}</span>${m.n}</button>`).join("")}</div>
<div class="nm-rc"><div class="tm">${nmTm(a.t)}</div><div class="ds"><div>${esc(a.s)}</div><small>도착 ${nmArr(a.t)}${md===2?" · 추천 경로":""}</small></div></div>
<button class="nm-go2" data-a="go">안내 시작</button>`}
function nmShow(){$("nmSB").innerHTML=({home:vHome,cat:vCat,place:vPlace,route:vRoute}[NM.view])();$("nmSB").scrollTop=0;nmSnap(NM.snap);nmMarkClass();nmRouteDraw();$("nmChips").querySelectorAll(".nm-chip").forEach((b,i)=>b.classList.toggle("on",i===NM.cat))}
function nmSelect(id){const p=nmP(id);if(!p)return;NM.sel=id;NM.route=null;NM.view="place";NM.snap=1;nmFly(()=>{NM.cx=p.x;NM.cy=p.y;if(NM.z<1)NM.z=1});nmShow()}
function nmBack(){NM.sel=null;NM.route=null;NM.view=NM.cat!=null?"cat":"home";NM.snap=1;nmShow()}
function nmRoute(id){const p=nmP(id);NM.sel=id;NM.route=id;NM.view="route";NM.snap=1;NM.mode=(p.dm&&p.dm>2000)?1:2;const q=nmPath(p),m=NMD.me,dx=Math.abs(m.x-p.x),dy=Math.abs(m.y-p.y);nmFly(()=>{NM.cx=(m.x+p.x)/2;NM.cy=(m.y+p.y)/2;NM.z=Math.max(.4,Math.min(1.3,330/(dx+90),230/(dy+90)))});nmShow()}
function nmCat(i){NM.cat=NM.cat===i?null:i;NM.sel=null;NM.route=null;NM.view=NM.cat!=null?"cat":"home";NM.snap=1;if(NM.cat!=null){const L=NMP.filter(p=>NMD.chips[NM.cat].cats.includes(p.cat));if(L.length){const q=L.reduce((a,p)=>(nmDist(p)<nmDist(a)?p:a));nmFly(()=>{NM.cx=(q.x+NMD.me.x)/2;NM.cy=(q.y+NMD.me.y)/2;NM.z=1})}}nmShow()}
function nmGo(id,route){nmTab(0);route?nmRoute(id):nmSelect(id)}
function nmSearch(on){const s=$("nmSrch");s.classList.toggle("on",on);if(on){$("nmQ").value="";nmQuery("");setTimeout(()=>$("nmQ").focus(),80)}else $("nmQ").blur()}
function nmQuery(q){q=q.trim();const L=$("nmRes");
 if(!q){L.innerHTML=`<div class="sh"><b>내 장소</b></div><div class="qk"><button data-id="${NMD.home}">🏠<span>집</span><small>${esc(nmP(NMD.home).name)}</small></button><button data-id="${NMD.work}">🏢<span>회사</span><small>${esc(nmP(NMD.work).name)}</small></button><button data-fake="1">＋<span>장소 추가</span></button></div><div class="sh"><b>최근 검색</b><button data-clr>전체 삭제</button></div>${NMD.recent.map((t,i)=>`<div class="sr rc" data-q="${esc(t)}"><span class="ci">${nmUp(NI.clock)}</span><div class="m"><b>${esc(t)}</b></div><button data-del="${i}">${nmUp(NI.x)}</button></div>`).join("")||'<div class="em">최근 검색 기록이 없어요</div>'}<div class="sh"><b>카테고리</b></div><div class="cg">${NMD.chips.map((c,i)=>`<button data-cat="${i}"><span>${c.e}</span>${c.n}</button>`).join("")}</div>`;return}
 const R=NMP.filter(p=>(p.name+p.cat+p.addr+p.tag).replace(/\s/g,"").includes(q.replace(/\s/g,""))).sort((a,b)=>nmDist(a)-nmDist(b));
 L.innerHTML=R.length?R.map(p=>{const[e,c]=nmClr(p);return`<div class="sr" data-id="${p.id}"><span class="ci" style="background:${c}22;color:${c}">${e}</span><div class="m"><b>${esc(p.name).replace(esc(q),m=>`<u>${m}</u>`)}</b><small>${esc(p.cat)} · ${esc(p.addr)}</small></div><em>${nmDs(nmDist(p))}</em></div>`}).join(""):`<div class="em">‘${esc(q)}’ 검색 결과가 없어요</div>`}
function nmFind(t){const q=t.trim();if(!q)return;NMD.recent=[q,...NMD.recent.filter(x=>x!==q)].slice(0,8);const p=NMP.find(p=>p.name.replace(/\s/g,"").includes(q.replace(/\s/g,"")))||NMP.find(p=>(p.cat+p.tag).includes(q));if(p){nmSearch(false);nmGo(p.id)}else showToast("검색 결과가 없어요")}
function nmTab(i){NM.tab=i;$("nmTb").querySelectorAll("button").forEach((b,k)=>{b.classList.toggle("on",k===i);b.querySelector("svg").innerHTML=NMT[k](k===i)});const v=$("nmTv");v.classList.toggle("on",i>0);if(i>0){v.innerHTML=TV[i]();v.scrollTop=0}}
const tvP=(p,x="")=>`<div class="tr" data-id="${p.id}">${nmThumb(p,52)}<div class="m"><b>${esc(p.name)}</b><small>${esc(p.cat)} · ${nmDs(nmDist(p))}</small></div>${x}</div>`;
const TV=[null,
()=>{const B=[["green",NMD.booking.day,NMD.booking.time,2,"예약 확정"],["kal",4,"오후 12:30",4,"예약 확정"],["sodam",-10,"오전 11:00",2,"이용 완료"]];return`<h1>예약</h1><div class="tv-seg"><button class="on">예약 내역</button><button>이용 완료</button></div>${B.map(b=>{const p=nmP(b[0]);return`<div class="bk"><div class="bh"><span class="pl ${b[4]==="이용 완료"?"dn":""}">${b[4]}</span><small>${nmDay(b[1])} ${b[2]} · ${b[3]}명</small></div>${tvP(p)}<div class="ba"><button data-id="${p.id}" data-route="1">길찾기</button><button data-fake="1">예약 변경</button></div></div>`}).join("")}<div class="em">네이버 예약을 사용하는 매장을 지도에서 바로 예약할 수 있어요.</div>`},
()=>`<h1>대중교통</h1><button class="tv-sb" data-sb>${nmUp(NI.route)}<span>어디로 갈까요?</span></button><div class="tv-q"><button data-id="${NMD.home}" data-route="1">🏠<span>집</span><small>${esc(nmP(NMD.home).name)}</small></button><button data-id="${NMD.work}" data-route="1">🏢<span>회사</span><small>${esc(nmP(NMD.work).name)}</small></button></div>
<h2>내 주변 지하철</h2><div class="card"><div class="ln"><i style="background:#ef7c1c">3</i><div class="m"><b>시광역</b><small>작도시청 방면</small></div><div class="ar"><b>3분</b><small>11분 후</small></div></div><div class="ln"><i style="background:#ef7c1c">3</i><div class="m"><b>시광역</b><small>시광대교 방면</small></div><div class="ar"><b>5분</b><small>14분 후</small></div></div></div>
<h2>내 주변 버스</h2><div class="card"><div class="ln"><i style="background:#2b7de9;border-radius:8px">12</i><div class="m"><b>시광소방서 앞</b><small>작도시청 방면</small></div><div class="ar"><b class="rd">곧 도착</b><small>9분 후</small></div></div><div class="ln"><i style="background:#2b7de9;border-radius:8px">33</i><div class="m"><b>시광소방서 앞</b><small>시광역 방면</small></div><div class="ar"><b>6분</b><small>16분 후</small></div></div><div class="ln"><i style="background:#37b24d;border-radius:8px">마을3</i><div class="m"><b>작도빌라 입구</b><small>시광구청 방면</small></div><div class="ar"><b>12분</b><small>27분 후</small></div></div></div>`,
()=>`<h1>내비게이션</h1><button class="tv-sb" data-sb>${nmUp(NI.pin)}<span>목적지 검색</span></button><div class="tv-q"><button data-id="${NMD.home}" data-route="1">🏠<span>집</span><small>${esc(nmP(NMD.home).name)}</small></button><button data-id="${NMD.work}" data-route="1">🏢<span>회사</span><small>${esc(nmP(NMD.work).name)}</small></button></div><h2>최근 목적지</h2><div class="card">${["fire","green","kal","hosp"].map(i=>tvP(nmP(i),`<button class="go" data-id="${i}" data-route="1">출발</button>`)).join("")}</div>`,
()=>{const L=[...NM.saved].map(nmP).filter(Boolean);return`<h1>북마크</h1><div class="tv-seg"><button class="on">내 장소</button><button>최근 본</button><button>길찾기</button></div><div class="fd"><div><span>⭐</span><b>즐겨찾기</b><small>${L.length}</small></div><div><span>🚩</span><b>가고 싶은 곳</b><small>0</small></div><div><span>🍴</span><b>맛집</b><small>0</small></div></div><h2>저장한 장소 ${L.length}</h2>${L.length?`<div class="card">${L.map(p=>tvP(p,`<span class="sv">${nmStar(true,22)}</span>`)).join("")}</div>`:'<div class="em">저장한 장소가 없어요.<br>장소 정보에서 별표를 눌러 저장해 보세요.</div>'}`}];
function nmBind(){
 const m=$("nmMapL"),P=new Map(),K=()=>$("device").getBoundingClientRect().width/390;let pd=null,s0=null,mv=false;
 const clamp=()=>{NM.cx=Math.max(200,Math.min(1400,NM.cx));NM.cy=Math.max(260,Math.min(1620,NM.cy))};
 m.onpointerdown=e=>{P.set(e.pointerId,{x:e.clientX,y:e.clientY});if(P.size===1){mv=false;pd={x:e.clientX,y:e.clientY,cx:NM.cx,cy:NM.cy}}else{const[a,b]=[...P.values()];s0={d:Math.hypot(a.x-b.x,a.y-b.y)||1,z:NM.z};mv=true}};
 m.onpointermove=e=>{if(!P.has(e.pointerId))return;P.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(P.size>=2&&s0){const[a,b]=[...P.values()];NM.z=Math.max(.4,Math.min(1.8,s0.z*Math.hypot(a.x-b.x,a.y-b.y)/s0.d));nmCam();return}
  if(P.size===1&&pd){const dx=e.clientX-pd.x,dy=e.clientY-pd.y;if(!mv){if(Math.hypot(dx,dy)<6)return;mv=true;try{m.setPointerCapture(e.pointerId)}catch(_){}}const q=K()*NM.z;NM.cx=pd.cx-dx/q;NM.cy=pd.cy-dy/q;clamp();nmCam()}};
 const up=e=>{P.delete(e.pointerId);if(mv)NM.dt=Date.now();if(!P.size){pd=null;s0=null}else if(P.size===1){const v=[...P.values()][0];pd={x:v.x,y:v.y,cx:NM.cx,cy:NM.cy};s0=null}};
 m.onpointerup=up;m.onpointercancel=up;
 m.onwheel=e=>{e.preventDefault();NM.z=Math.max(.4,Math.min(1.8,NM.z*Math.exp(-e.deltaY*.0015)));nmCam()};
 m.onclick=e=>{if(Date.now()-NM.dt<250)return;const b=e.target.closest(".nm-mk");if(b)return nmSelect(b.dataset.id);if(NM.view==="place"||NM.view==="route")nmBack()};
 /* 시트 드래그 */
 const hd=$("nmHd"),sh=$("nmSheet"),nm=$("nm");let y0=0,h0=0,cur=0,dn=false;
 hd.onpointerdown=e=>{dn=true;y0=e.clientY;h0=NMS[NM.snap];cur=h0;sh.classList.add("drag");nm.classList.add("dr");hd.setPointerCapture(e.pointerId)};
 hd.onpointermove=e=>{if(!dn)return;cur=Math.max(NMS[0],Math.min(NMS[2],h0-(e.clientY-y0)/K()));nm.style.setProperty("--sh",cur+"px")};
 const hu=()=>{if(!dn)return;dn=false;sh.classList.remove("drag");nm.classList.remove("dr");let i=NM.snap;if(cur>h0+25)i=Math.min(2,i+1);else if(cur<h0-25)i=Math.max(0,i-1);else if(Math.abs(cur-h0)<4)i=i===1?2:1;nmSnap(i)};
 hd.onpointerup=hu;hd.onpointercancel=hu;
 /* 시트 안 클릭 */
 $("nmSB").onclick=e=>{const t=e.target,c=s=>t.closest(s);let b;
  if(b=c("[data-st]")){const id=b.dataset.st;NM.saved.has(id)?NM.saved.delete(id):NM.saved.add(id);showToast(NM.saved.has(id)?"저장했어요":"저장을 취소했어요");nmShow();return}
  if(b=c("[data-x]"))return NM.view==="route"?(NM.view="place",NM.route=null,nmShow()):nmBack();
  if(b=c("[data-seg]")){NM.seg=+b.dataset.seg;nmShow();return}
  if(b=c("[data-chip]")){NM.chip=+b.dataset.chip;nmShow();return}
  if(b=c("[data-md]")){NM.mode=+b.dataset.md;nmShow();return}
  if(c("[data-sw]"))return showToast("출발지와 도착지를 바꿀 수 없어요 (시뮬레이션)");
  if(b=c("[data-a]")){const a=b.dataset.a;if(a==="arr")return nmRoute(NM.sel);if(a==="dep")return showToast("출발지로 설정했어요");if(a==="sh")return showToast("공유는 시뮬레이션입니다");if(a==="go")return showToast("내비게이션은 시뮬레이션입니다");if(a==="sv"){NM.saved.has(NM.sel)?NM.saved.delete(NM.sel):NM.saved.add(NM.sel);showToast(NM.saved.has(NM.sel)?"저장했어요":"저장을 취소했어요");nmShow();return}}
  if(b=c("[data-fake]"))return showToast("이 장소는 다른 지역에 있어요");
  if(b=c("[data-id]"))nmSelect(b.dataset.id)};
 /* 검색창 · 칩 · 버튼 */
 $("nmBar").onclick=e=>{if(e.target.closest(".av"))return showToast("네이버 로그인은 시뮬레이션입니다");if(e.target.closest(".mi"))return showToast("음성 검색은 시뮬레이션입니다");nmSearch(true)};
 $("nmGo").onclick=()=>nmSearch(true);
 $("nmChips").onclick=e=>{const b=e.target.closest("[data-c]");if(b)nmCat(+b.dataset.c)};
 $("nmGps").onclick=()=>nmFly(()=>{NM.cx=NMD.me.x;NM.cy=NMD.me.y;NM.z=1});
 $("nmLy").onclick=()=>showToast("지도 유형 변경은 시뮬레이션입니다");$("nmPn").onclick=()=>showToast("내 장소 지도는 시뮬레이션입니다");$("nmSt").onclick=()=>nmTab(4);
 $("nmBk").onclick=e=>{const p=nmP(NMD.booking.place);if(e.target.closest(".sub"))return showToast("지하철 경로는 시뮬레이션입니다");if(e.target.closest(".dr2"))return nmRoute(p.id);nmTab(1)};
 $("nmTb").onclick=e=>{const b=e.target.closest("button");if(b)nmTab(+b.dataset.t)};
 $("nmTv").onclick=e=>{const t=e.target;let b;if(t.closest("[data-sb]"))return nmSearch(true);if(b=t.closest("[data-id]"))return nmGo(b.dataset.id,!!(b.dataset.route||t.closest("[data-route]")));if(t.closest("[data-fake]"))showToast("예약 변경은 시뮬레이션입니다")};
 $("nmQ").oninput=e=>nmQuery(e.target.value);$("nmQ").onkeydown=e=>{if(e.key==="Enter")nmFind(e.target.value)};
 $("nmBkb").onclick=()=>nmSearch(false);
 $("nmRes").onclick=e=>{const t=e.target;let b;if(t.closest("[data-clr]")){NMD.recent=[];nmQuery("");return}if(b=t.closest("[data-del]")){NMD.recent.splice(+b.dataset.del,1);nmQuery("");return}if(b=t.closest("[data-cat]")){nmSearch(false);nmTab(0);nmCat(+b.dataset.cat);return}if(b=t.closest("[data-q]")){$("nmQ").value=b.dataset.q;nmFind(b.dataset.q);return}if(b=t.closest("[data-id]")){NMD.recent=[nmP(b.dataset.id).name,...NMD.recent.filter(x=>x!==nmP(b.dataset.id).name)].slice(0,8);nmSearch(false);nmGo(b.dataset.id);return}if(t.closest("[data-fake]"))showToast("장소 추가는 시뮬레이션입니다")}}
function rMap(c){
 state.dark=false;const A=$("appScreen");A.classList.remove("dark");A.style.background="#eeeeea";theme();
 const W=(DATA.weather&&DATA.weather[0])||{temp:18,cond:"흐림"},wi=/맑/.test(W.cond)?"☀️":/비/.test(W.cond)?"🌧":/흐/.test(W.cond)?"☁️":"⛅",bk=nmP(NMD.booking.place);
 c.innerHTML=`<div class="nm" id="nm"><div class="nm-ml" id="nmMapL"><div class="nm-world" id="nmWorld">${nmMap()}</div><div class="nm-mkl" id="nmMk"></div></div>
<div class="nm-top"><button class="nm-bar" id="nmBar">${NMLOGO(24)}<span>네이버 지도 검색</span><i class="mi">${MIC}</i><i class="av">${NMAV}</i></button><button class="nm-go" id="nmGo">${nmUp(NI.route).replace('width="22" height="22"','width="26" height="26"')}</button></div>
<div class="nm-chips" id="nmChips">${NMD.chips.map((x,i)=>`<button class="nm-chip" data-c="${i}"><span>${x.e}</span>${x.n}</button>`).join("")}</div>
<div class="nm-wx"><span>${wi}</span><b>${W.temp}°</b><small><i></i>PM10</small></div>
<div class="nm-rts"><button class="nm-rb" id="nmLy">${nmUp(NI.layers)}</button><button class="nm-rb" id="nmSt">${nmStar(false,22)}</button><button class="nm-rb" id="nmPn">${nmUp(NI.pin)}</button></div>
<div class="nm-fl" id="nmFl"><button class="nm-rb gps" id="nmGps">${nmUp(NI.gps)}</button><div class="nm-bkrow" id="nmBk"><div class="nm-bk"><div class="bi"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M9.500 16.500v-7l5 7v-7"/></svg></div><div class="bm"><b>${esc(bk.name)} <s>N</s></b><small>${nmDay(NMD.booking.day)} · ${NMD.booking.time} · 🚌 ${NMD.booking.mins}분</small></div><span class="dr2">${nmUp(NI.route)}</span></div><span class="sub">${nmUp(NI.train)}</span></div></div>
<div class="nm-sheet" id="nmSheet"><div class="nm-hd" id="nmHd"><i></i></div><div class="nm-sb" id="nmSB"></div></div>
<div class="nm-tv" id="nmTv"></div>
<div class="nm-tb" id="nmTb">${NMTN.map((n,i)=>`<button data-t="${i}" class="${i===NM.tab?"on":""}">${nmUp(NMT[i](i===NM.tab))}<span>${n}</span></button>`).join("")}</div>
<div class="nm-sr" id="nmSrch"><div class="nm-sh"><button id="nmBkb">${nmUp(P.back)}</button><div class="nm-in">${NMLOGO(20)}<input id="nmQ" placeholder="장소 · 버스 · 지하철 · 주소 검색" autocomplete="off"></div></div><div class="nm-res" id="nmRes"></div></div></div>`;
 nmMarkers();nmBind();nmCam();nmShow();nmTab(NM.tab)}
{const _rm=renderApp;renderApp=function(){_rm();if(state.app==="map")rMap($("appContent"))}}

}}catch(e){console.error("네이버 지도 오류",e)}

/* ---------- 메시지 배지 / 새 메시지 도착 ---------- */
function syncBadge(){const n=DATA.contacts.reduce((s,x)=>s+(x.unread?(x.unreadN||1):0),0),b=$("messageBadge");if(!b)return;b.textContent=n;b.style.display=n?"":"none"}
function showBanner(x,body,onTap){let b=$("banner");if(!b){b=document.createElement("div");b.id="banner";b.className="banner";$("device").appendChild(b)}
 b.innerHTML=`<div class="bn-av">${av(x,34)}<span class="bn-app">${ic('<path d="M4 5h16v11H9l-5 4z"/>',10,2.4)}</span></div><div class="bn-tx"><b>${esc(x.name)}</b><span>${esc(body)}</span></div><small>지금</small>`;
 b.onclick=()=>{b.classList.remove("show");onTap&&onTap()};b.classList.remove("show");void b.offsetWidth;b.classList.add("show");clearTimeout(showBanner.t);showBanner.t=setTimeout(()=>b.classList.remove("show"),4500)}
function deliver(id,texts){const x=DATA.contacts.find(a=>a.id===id);if(!x)return;x.messages??=[];
 const d=now(),lab=`${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`,ls=[...x.messages].reverse().find(m=>m[0]==="date");
 if(!ls||ls[1]!==lab)x.messages.push(["date",lab]);texts.forEach(t=>x.messages.push(["in",t,time()]));
 DATA.threads=[id,...(DATA.threads||[]).filter(t=>t!==id)];
 const inApp=state.cur==="appScreen"&&state.app==="messages",viewing=inApp&&state.chat===id;
 if(!viewing){x.unread=true;x.unreadN=(x.unreadN||0)+texts.length}syncBadge();
 if(inApp){const v=$("ci")?$("ci").value:"";renderApp();if(v&&$("ci")){$("ci").value=v;$("ci").closest(".sp").classList.add("typing")}}
 if(!viewing){const last=texts.at(-1);(state.notices=state.notices||[]).unshift({app:"메시지",time:"지금",title:x.name,body:last,chat:id});
  try{renderNotifications()}catch(e){}
  showBanner(x,last,()=>{if(state.unlocked&&state.cur!=="passcodeScreen"){closePanels();openApp("messages");openChat(id)}})}}
syncBadge();
/* 사이트를 열고 12초 뒤 "서이건", 20초 뒤 "이번 주말에 시간 되냐?" 가 위도윤에게서 도착 */
setTimeout(()=>deliver("c1",["서이건"]),12000);
setTimeout(()=>deliver("c1",["이번 주말에 시간 되냐?"]),20000);

/* ---------- 사진 삭제 (보기 화면의 휴지통 / 보관함의 "선택") ---------- */
const LSG=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch(e){return f}},LSS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let PH_DEL=LSG("iphone-ph-del",0),SEED_DEL=LSG("iphone-seed-del",[]);
function PHN(){return Math.max(0,24-PH_DEL)}
DATA.photos.forEach((p,i)=>{if(p.id==null)p._s=i});
DATA.photos=DATA.photos.filter(p=>!SEED_DEL.includes(p._s));
if(DATA.photoCount)DATA.photoCount=Math.max(0,DATA.photoCount-PH_DEL-SEED_DEL.length);
const TRASH='<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>';
function delPhotos(list){
 const n=PHN();list=[...new Set(list)].sort((x,y)=>y-x);
 list.forEach(i=>{
  if(DATA.photoCount)DATA.photoCount--;
  if(i<n){PH_DEL++;return}
  const p=DATA.photos[i-n];if(!p)return;DATA.photos.splice(i-n,1);
  if(p.id!=null)idb().then(db=>db.transaction("p","readwrite").objectStore("p").delete(p.id)).catch(()=>{});
  else SEED_DEL.push(p._s)});
 LSS("iphone-ph-del",PH_DEL);LSS("iphone-seed-del",SEED_DEL)}
function delSheet(c,cnt,ok){
 c.querySelector(".pdm")?.remove();const m=document.createElement("div");m.className="pdm";
 m.innerHTML=`<div class="pds"><div class="pdt">${cnt>1?cnt+"장의 사진":"이 사진"}이 삭제됩니다.</div><button class="pdd">${cnt>1?cnt+"장의 사진 삭제":"사진 삭제"}</button></div><button class="pdc">취소</button>`;
 m.onclick=e=>{if(e.target===m)m.remove()};m.querySelector(".pdc").onclick=()=>m.remove();
 m.querySelector(".pdd").onclick=()=>{m.remove();ok()};c.appendChild(m)}
{const _rp=rPhotos;rPhotos=function(c){
 _rp(c);
 if(UI.ph!=null){
  const b=document.createElement("button");b.className="ptr";b.setAttribute("aria-label","삭제");b.innerHTML=ic(TRASH,24,2);
  b.onclick=e=>{e.stopPropagation();delSheet(c,1,()=>{delPhotos([UI.ph]);const t=PHN()+DATA.photos.length;UI.ph=t?Math.min(UI.ph,t-1):null;renderApp();showToast("사진이 삭제되었어요.")})};
  c.querySelector(".sc").appendChild(b);return}
 const sl=$("sl");if(!sl)return;
 let sel=null;const tiles=[...c.querySelectorAll(".pt")];
 const trash=document.createElement("button");trash.className="ptr bt";trash.innerHTML=ic(TRASH,24,2);trash.style.display="none";c.appendChild(trash);
 const upd=()=>{tiles.forEach(t=>t.classList.toggle("sel",!!sel&&sel.has(+t.dataset.p)));
  sl.textContent=sel?"취소":"선택";
  const h=c.querySelector(".ptl b"),sm=c.querySelector(".ptl small");
  if(h)h.textContent=sel?(sel.size?`${sel.size}장 선택됨`:"항목 선택"):"보관함";if(sm)sm.style.display=sel?"none":"";
  trash.style.display=sel?"grid":"none";trash.disabled=!sel||!sel.size;trash.style.opacity=sel&&sel.size?1:.35};
 trash.onclick=()=>{if(!sel||!sel.size)return;const k=sel.size;delSheet(c,k,()=>{delPhotos([...sel]);renderApp();showToast(k>1?`${k}장의 사진이 삭제되었어요.`:"사진이 삭제되었어요.")})};
 sl.onclick=()=>{sel=sel?null:new Set();upd()};
 tiles.forEach(t=>{const f=t.onclick;t.onclick=e=>{if(!sel){f&&f.call(t,e);return}const i=+t.dataset.p;sel.has(i)?sel.delete(i):sel.add(i);upd()}})};}
