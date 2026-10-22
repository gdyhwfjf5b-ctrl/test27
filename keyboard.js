/* 폰 화면 안에서 뜨는 가상 키보드 (한글 두벌식 / 영문 / 숫자·기호)
   - 입력칸에 포커스가 가면 화면 아래에서 올라오고, 앱 화면이 그만큼 줄어듭니다.
   - 진짜 폰 키보드는 inputmode="none" 으로 막습니다. (컴퓨터 키보드로 치는 건 그대로 됩니다)
   - 모양/높이는 keyboard.css 의 --kbh 에서 바꿉니다. */
(function(){
const dev=document.getElementById("device");if(!dev)return;
const $=id=>document.getElementById(id);

/* ───────── 한글 조합 ───────── */
const CHO="ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",JUNG="ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ",
JONG=["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const VC={"ㅗㅏ":"ㅘ","ㅗㅐ":"ㅙ","ㅗㅣ":"ㅚ","ㅜㅓ":"ㅝ","ㅜㅔ":"ㅞ","ㅜㅣ":"ㅟ","ㅡㅣ":"ㅢ"};
const FC={"ㄱㅅ":"ㄳ","ㄴㅈ":"ㄵ","ㄴㅎ":"ㄶ","ㄹㄱ":"ㄺ","ㄹㅁ":"ㄻ","ㄹㅂ":"ㄼ","ㄹㅅ":"ㄽ","ㄹㅌ":"ㄾ","ㄹㅍ":"ㄿ","ㄹㅎ":"ㅀ","ㅂㅅ":"ㅄ"};
const split=m=>{const o={};for(const k in m)o[m[k]]=[k[0],k[1]];return o},VS=split(VC),FS=split(FC);
const isV=c=>JUNG.includes(c),canT=c=>JONG.includes(c);
let H=null;   // 조합 중인 글자 {el,s,L,V,T}

const chr=h=>{if(h.V==null)return h.L;return String.fromCharCode(0xAC00+(CHO.indexOf(h.L)*21+JUNG.indexOf(h.V))*28+(h.T?JONG.indexOf(h.T):0))};
const fire=(el,t,d)=>el.dispatchEvent(new InputEvent("input",{bubbles:true,inputType:t||"insertText",data:d||null}));
const sel=el=>{try{const a=el.selectionStart,b=el.selectionEnd;if(a!=null)return[a,b]}catch(e){}return[el.value.length,el.value.length]};
function put(el,s,a,b){
  const ml=el.maxLength;if(ml>0&&el.value.length-(b-a)+s.length>ml)return false;
  try{el.setRangeText(s,a,b,"end")}catch(e){el.value=el.value.slice(0,a)+s+el.value.slice(b)}
  fire(el);return true}
function live(el){   // 조합 상태가 아직 유효한지 (사용자가 커서를 옮기거나 지우면 끊는다)
  if(!H||H.el!==el)return null;const[a,b]=sel(el);
  if(a!==b||a!==H.s+1||el.value[H.s]!==chr(H)){H=null;return null}return H}
function newComp(el,j){const[a]=sel(el);if(put(el,j,a,a))H={el,s:a,L:j,V:null,T:null};else H=null}
function render(h){put(h.el,chr(h),h.s,h.s+1)}

function typeJamo(el,j){
  if(el.selectionStart!==el.selectionEnd){const[a,b]=sel(el);put(el,"",a,b);H=null}
  const h=live(el);
  if(!h){if(isV(j)){const[a,b]=sel(el);put(el,j,a,b)}else newComp(el,j);return}
  if(!isV(j)){
    if(h.V==null)return newComp(el,j);
    if(!h.T){if(canT(j)){h.T=j;return render(h)}return newComp(el,j)}
    const c=FC[h.T+j];if(c){h.T=c;return render(h)}return newComp(el,j)}
  /* 모음 */
  if(h.V==null){h.V=j;return render(h)}
  if(!h.T){const c=VC[h.V+j];if(c){h.V=c;return render(h)}H=null;const[a,b]=sel(el);put(el,j,a,b);return}
  let L;if(FS[h.T]){L=FS[h.T][1];h.T=FS[h.T][0]}else{L=h.T;h.T=null}
  render(h);newComp(el,L);const h2=live(el);if(h2){h2.V=j;render(h2)}}

function backspace(el){
  const h=live(el);
  if(h){
    if(h.T)h.T=FS[h.T]?FS[h.T][0]:null;
    else if(h.V!=null)h.V=VS[h.V]?VS[h.V][0]:null;
    else{put(el,"",h.s,h.s+1);H=null;return}
    return render(h)}
  H=null;let[a,b]=sel(el);if(a===b){if(a===0)return;a--}
  if(el.setRangeText){el.setRangeText("",a,b,"end");fire(el,"deleteContentBackward")}}

function typeText(el,s){H=null;const[a,b]=sel(el);put(el,s,a,b)}
function enter(el){
  H=null;const e=new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:true,cancelable:true});
  if(!el.dispatchEvent(e))return;
  if(el.tagName==="TEXTAREA"){typeText(el,"\n");return}
  if(el.form){el.form.requestSubmit?el.form.requestSubmit():el.form.dispatchEvent(new Event("submit",{cancelable:true}));return}
  el.blur()}

/* ───────── 자판 모양 ───────── */
const L={
 ko:[["ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ","ㅃㅉㄸㄲㅆㅛㅕㅑㅒㅖ"],["ㅁㄴㅇㄹㅎㅗㅓㅏㅣ","ㅁㄴㅇㄹㅎㅗㅓㅏㅣ"],["ㅋㅌㅊㅍㅠㅜㅡ","ㅋㅌㅊㅍㅠㅜㅡ"]],
 en:[["qwertyuiop","QWERTYUIOP"],["asdfghjkl","ASDFGHJKL"],["zxcvbnm","ZXCVBNM"]],
 num:[["1234567890"],["-/:;()₩&@\""],[".,?!'"]],
 sym:[["[]{}#%^*+="],["_\\|~<>$€£•"],[".,?!'"]]};
const ICO={
 bk:'<svg viewBox="0 0 24 24"><path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7z"/><path d="M12.500 9.500l5 5m0-5l-5 5"/></svg>',
 sh:'<svg viewBox="0 0 24 24"><path d="M12 4l8 9h-5v6H9v-6H4z"/></svg>',
 gl:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>'};
const S={lang:"ko",layer:"alpha",shift:0,mode:"text"};   // shift: 0 꺼짐 / 1 한 번 / 2 고정
let lastShift=0,cur=null;

const kb=document.createElement("div");kb.className="vkb";kb.id="vkb";dev.appendChild(kb);
const ent=()=>{const h=cur&&(cur.enterKeyHint||cur.getAttribute("enterkeyhint"));return{send:"전송",search:"검색",go:"이동",done:"완료",next:"다음"}[h]||"return"};

function build(){
  kb.classList.toggle("num",S.mode!=="text");kb.innerHTML="";
  const R=()=>{const r=document.createElement("div");r.className="r";kb.appendChild(r);return r};
  const K=(r,label,cls,act,val)=>{const k=document.createElement("div");k.className="k "+(cls||"");k.innerHTML=label;k.dataset.a=act||"ch";if(val!=null)k.dataset.v=val;r.appendChild(k);return k};
  if(S.mode!=="text"){
    const pad=[["1",""],["2","ABC"],["3","DEF"],["4","GHI"],["5","JKL"],["6","MNO"],["7","PQRS"],["8","TUV"],["9","WXYZ"]];
    for(let i=0;i<3;i++){const r=R();r.className="r pad";for(let j=0;j<3;j++){const p=pad[i*3+j];K(r,p[0]+(p[1]?`<small>${p[1]}</small>`:""),"n",null,p[0])}}
    const r=R();r.className="r pad";
    S.mode==="decimal"?K(r,".","n f",null,"."):K(r,"","n f","none");
    K(r,"0","n",null,"0");K(r,ICO.bk,"n f","bk");
  }else{
    const alpha=S.layer==="alpha",rows=alpha?L[S.lang]:L[S.layer],up=S.shift?1:0;
    const r1=R();[...rows[0][alpha?up:0]].forEach(c=>K(r1,c,"",null,c));
    const r2=R();if(rows[1][0].length<10&&alpha)K(r2,"","ins","none");[...rows[1][alpha?up:0]].forEach(c=>K(r2,c,"",null,c));if(rows[1][0].length<10&&alpha)K(r2,"","ins","none");
    const r3=R();
    if(alpha)K(r3,ICO.sh,"f w sh"+(S.shift===2?" caps":S.shift?" on":""),"shift");
    else K(r3,S.layer==="num"?"#+=":"123","f w",S.layer==="num"?"sym":"num");
    [...rows[2][alpha?up:0]].forEach(c=>K(r3,c,"",null,c));
    K(r3,ICO.bk,"f w","bk");
    const r4=R();
    K(r4,alpha?"123":(S.lang==="ko"?"가나다":"ABC"),"f w","layer");
    K(r4,ICO.gl,"f","lang");
    K(r4,S.lang==="ko"?"스페이스":"space","sp","ch"," ");
    K(r4,ent(),"f ret"+(ent()!=="return"?" act":""),"ret");
  }
  const b=document.createElement("div");b.className="bot";b.innerHTML="<i></i>";kb.appendChild(b);
  kb.classList.toggle("dark",!!(cur&&cur.closest("#appScreen.dark")));
}

/* ───────── 누르기 ───────── */
let popEl=null,rep=null;
const popOff=()=>{if(popEl){popEl.remove();popEl=null}};
function pop(k){popOff();if(!k.dataset.v||k.dataset.v===" "||S.mode!=="text")return;
  popEl=document.createElement("div");popEl.className="pop";popEl.textContent=k.dataset.v;popEl.style.left=k.offsetLeft+k.offsetWidth/2-18+"px";popEl.style.top=k.offsetTop+"px";kb.appendChild(popEl)}
function press(k){
  const el=cur;if(!el||!el.isConnected)return;
  const a=k.dataset.a,v=k.dataset.v;
  if(a==="ch"){
    if(S.lang==="ko"&&S.layer==="alpha"&&v&&/[ㄱ-ㅣ]/.test(v))typeJamo(el,v);else typeText(el,v);
    if(S.shift===1&&S.layer==="alpha"){S.shift=0;build()}
  }else if(a==="bk")backspace(el);
  else if(a==="ret")enter(el);
  else if(a==="shift"){const t=Date.now();S.shift=S.shift===2?0:S.shift===1?(t-lastShift<400?2:0):1;lastShift=t;build()}
  else if(a==="layer"){S.layer=S.layer==="alpha"?"num":"alpha";S.shift=0;build()}
  else if(a==="sym"){S.layer="sym";build()}
  else if(a==="num"){S.layer="num";build()}
  else if(a==="lang"){S.lang=S.lang==="ko"?"en":"ko";S.layer="alpha";S.shift=0;H=null;build()}
  if(S.mode!=="text"&&a==="ch"){}
}
kb.addEventListener("pointerdown",e=>{
  e.preventDefault();const k=e.target.closest(".k");if(!k||k.dataset.a==="none")return;
  k.classList.add("dn");pop(k);press(k);
  if(k.dataset.a==="bk"){clearTimeout(rep);rep=setTimeout(function t(){if(!cur)return;backspace(cur);rep=setTimeout(t,60)},420)}
});
["pointerup","pointercancel","pointerleave"].forEach(ev=>kb.addEventListener(ev,e=>{clearTimeout(rep);popOff();kb.querySelectorAll(".dn").forEach(k=>k.classList.remove("dn"))}));
kb.addEventListener("mousedown",e=>e.preventDefault());
kb.addEventListener("contextmenu",e=>e.preventDefault());

/* ───────── 보이기 / 숨기기 ───────── */
const TYPES=/^(text|search|password|tel|url|email|number)$/;
const isField=el=>el&&((el.tagName==="INPUT"&&TYPES.test(el.type))||el.tagName==="TEXTAREA")&&!el.readOnly&&!el.disabled;
function tame(root){(root.matches&&root.matches("input,textarea")?[root]:[]).concat([...(root.querySelectorAll?root.querySelectorAll("input,textarea"):[])]).forEach(el=>{
  if(!isField(el)||el.dataset.vk)return;el.dataset.vk=1;el.dataset.im=el.getAttribute("inputmode")||"";el.setAttribute("inputmode","none")})}
let hideT=null;
function show(el){
  clearTimeout(hideT);if(cur!==el){H=null}cur=el;
  const im=el.dataset.im||"";S.mode=(im==="numeric"||im==="tel")?"numeric":im==="decimal"?"decimal":"text";
  if(el.type==="tel"||el.type==="number")S.mode=el.type==="number"?"decimal":"numeric";
  S.layer="alpha";S.shift=0;build();kb.classList.add("on");dev.classList.add("kb-open");
  if(el.id==="ci"||el.id==="kki")setTimeout(()=>{const b=$("krbody")||document.querySelector(".sc.chat");if(b)b.scrollTop=b.scrollHeight},320)}
function hide(){cur=null;H=null;kb.classList.remove("on");dev.classList.remove("kb-open")}
const check=()=>{clearTimeout(hideT);hideT=setTimeout(()=>{const a=document.activeElement;if(isField(a)){if(a!==cur||!kb.classList.contains("on"))show(a)}else hide()},90)};

document.addEventListener("focusin",e=>{if(isField(e.target)){tame(e.target);if(e.target.getAttribute("inputmode")!=="none")e.target.setAttribute("inputmode","none");show(e.target)}});
document.addEventListener("focusout",check);
new MutationObserver(m=>{m.forEach(r=>r.addedNodes.forEach(n=>n.nodeType===1&&tame(n)));if(cur&&!cur.isConnected)check()}).observe(document.body,{childList:true,subtree:true});
tame(document.body);
/* 컴퓨터 키보드로 직접 칠 땐 한글 조합 상태를 비운다 */
document.addEventListener("keydown",e=>{if(e.isTrusted)H=null},true);
})();
