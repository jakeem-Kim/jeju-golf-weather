/* ===== 골프 기상 허브 · 공통 데이터 & 로직 ===== */

/* 등록된 골프장 (여기에 추가하면 허브 드롭다운·상세 페이지에 자동 반영)
   zone: 지역 그룹 / lat·lon: 기상모델(약 11km)용 시·군·읍 단위 좌표(코스 위치 근사) */
const GOLF_COURSES = [
  /* ── 수도권 (서울·경기·인천) ── */
  { id:"hanyang",   name:"한양CC",            zone:"수도권", region:"경기 고양", addr:"고양시 덕양구", lat:37.66, lon:126.83 },
  { id:"newkorea",  name:"뉴코리아CC",        zone:"수도권", region:"경기 고양", addr:"고양시 덕양구 오금동", lat:37.68, lon:126.85 },
  { id:"taereung",  name:"태릉CC",            zone:"수도권", region:"서울 노원", addr:"서울 노원구 공릉동", lat:37.62, lon:127.09 },
  { id:"namseoul",  name:"남서울CC",          zone:"수도권", region:"경기 성남", addr:"성남시 수정구 상적동", lat:37.41, lon:127.04 },
  { id:"lakeside",  name:"레이크사이드CC",    zone:"수도권", region:"경기 용인", addr:"용인시 처인구 모현읍", lat:37.29, lon:127.19 },
  { id:"cc88",      name:"88CC",              zone:"수도권", region:"경기 용인", addr:"용인시 기흥구 청덕동", lat:37.27, lon:127.11 },
  { id:"eunhwasam", name:"은화삼CC",          zone:"수도권", region:"경기 용인", addr:"용인시 처인구 남동", lat:37.21, lon:127.23 },
  { id:"gold",      name:"골드CC",            zone:"수도권", region:"경기 용인", addr:"용인시 기흥구", lat:37.25, lon:127.14 },
  { id:"asiana",    name:"아시아나CC",        zone:"수도권", region:"경기 용인", addr:"용인시 처인구 원삼면", lat:37.18, lon:127.33 },
  { id:"hwasan",    name:"화산CC",            zone:"수도권", region:"경기 용인", addr:"용인시 처인구 백암면", lat:37.13, lon:127.36 },
  { id:"taekwang",  name:"태광CC",            zone:"수도권", region:"경기 용인", addr:"용인시 처인구 백암면", lat:37.11, lon:127.34 },
  { id:"nambu",     name:"남부CC",            zone:"수도권", region:"경기 용인", addr:"용인시 처인구 이동읍", lat:37.15, lon:127.20 },
  { id:"gonjiam",   name:"곤지암CC",          zone:"수도권", region:"경기 광주", addr:"광주시 도척면", lat:37.33, lon:127.31 },
  { id:"eastvalley",name:"이스트밸리CC",      zone:"수도권", region:"경기 광주", addr:"광주시 오포읍", lat:37.34, lon:127.16 },
  { id:"newseoul",  name:"뉴서울CC",          zone:"수도권", region:"경기 광주", addr:"광주시 오포읍 문형리", lat:37.36, lon:127.14 },
  { id:"namchon",   name:"남촌CC",            zone:"수도권", region:"경기 광주", addr:"광주시 초월읍", lat:37.39, lon:127.27 },
  { id:"jisan",     name:"지산CC",            zone:"수도권", region:"경기 이천", addr:"이천시 마장면", lat:37.23, lon:127.40 },
  { id:"newspring", name:"뉴스프링빌CC",      zone:"수도권", region:"경기 이천", addr:"이천시 부발읍", lat:37.28, lon:127.51 },
  { id:"southsprings",name:"사우스스프링스CC",zone:"수도권", region:"경기 이천", addr:"이천시 설성면", lat:37.11, lon:127.50 },
  { id:"blackstonei",name:"블랙스톤이천GC",   zone:"수도권", region:"경기 이천", addr:"이천시 신둔면", lat:37.31, lon:127.43 },
  { id:"lexfield",  name:"렉스필드CC",        zone:"수도권", region:"경기 여주", addr:"여주시 대신면", lat:37.36, lon:127.52 },
  { id:"ferrum",    name:"페럼클럽",          zone:"수도권", region:"경기 여주", addr:"여주시 산북면", lat:37.43, lon:127.63 },
  { id:"yeoju",     name:"여주CC",            zone:"수도권", region:"경기 여주", addr:"여주시 능서면", lat:37.27, lon:127.61 },
  { id:"ipo",       name:"이포CC",            zone:"수도권", region:"경기 여주", addr:"여주시 금사면", lat:37.34, lon:127.56 },
  { id:"sagewoody", name:"세이지우드 여주",   zone:"수도권", region:"경기 여주", addr:"여주시 강천면", lat:37.32, lon:127.68 },
  { id:"benest",    name:"안성베네스트GC",    zone:"수도권", region:"경기 안성", addr:"안성시 공도읍", lat:37.01, lon:127.19 },
  { id:"maestro",   name:"마에스트로CC",      zone:"수도권", region:"경기 안성", addr:"안성시 원곡면", lat:37.06, lon:127.14 },
  { id:"pinecreek", name:"파인크리크CC",      zone:"수도권", region:"경기 안성", addr:"안성시 미양면", lat:37.02, lon:127.29 },
  { id:"anseongq",  name:"안성큐CC",          zone:"수도권", region:"경기 안성", addr:"안성시 일죽면", lat:37.10, lon:127.56 },
  { id:"ildong",    name:"일동레이크GC",      zone:"수도권", region:"경기 포천", addr:"포천시 일동면", lat:38.02, lon:127.37 },
  { id:"bearcreekp",name:"베어크리크 포천",   zone:"수도권", region:"경기 포천", addr:"포천시 가산면", lat:37.92, lon:127.22 },
  { id:"montvert",  name:"몽베르CC",          zone:"수도권", region:"경기 포천", addr:"포천시 신북면", lat:37.98, lon:127.28 },
  { id:"adonis",    name:"아도니스CC",        zone:"수도권", region:"경기 양주", addr:"양주시 은현면", lat:37.86, lon:126.95 },
  { id:"royal",     name:"로얄CC",            zone:"수도권", region:"경기 양주", addr:"양주시 백석읍", lat:37.78, lon:126.93 },
  { id:"seowon",    name:"서원밸리CC",        zone:"수도권", region:"경기 파주", addr:"파주시 광탄면", lat:37.77, lon:126.88 },
  { id:"seoseoul",  name:"서서울CC",          zone:"수도권", region:"경기 김포", addr:"김포시 대곶면", lat:37.63, lon:126.55 },
  { id:"riviera",   name:"리베라CC",          zone:"수도권", region:"경기 가평", addr:"가평군 설악면", lat:37.72, lon:127.45 },
  { id:"crystal",   name:"크리스탈밸리CC",    zone:"수도권", region:"경기 가평", addr:"가평군 설악면", lat:37.66, lon:127.55 },
  { id:"shinwon",   name:"신원CC",            zone:"수도권", region:"경기 양평", addr:"양평군 강상면", lat:37.47, lon:127.55 },
  { id:"bbcheongna",name:"베어즈베스트 청라GC",zone:"수도권", region:"인천 서구", addr:"인천 서구 청라동", lat:37.53, lon:126.62 },
  { id:"club72",    name:"클럽72(스카이72)",  zone:"수도권", region:"인천 중구", addr:"인천 중구 영종도", lat:37.49, lon:126.55 },
  { id:"nicklaus",  name:"잭니클라우스GC코리아",zone:"수도권", region:"인천 연수", addr:"인천 연수구 송도동", lat:37.38, lon:126.64 },
  { id:"verthill",  name:"베르힐 영종 CC",    zone:"수도권", region:"인천 영종도", addr:"인천 중구 한상중앙로 66 · 서해안 임해", lat:37.525, lon:126.530 },

  /* ── 강원 ── */
  { id:"oakvalley", name:"오크밸리CC",        zone:"강원", region:"원주", addr:"원주시 지정면", lat:37.42, lon:127.83 },
  { id:"oakhills",  name:"오크힐스CC",        zone:"강원", region:"원주", addr:"원주시 문막읍", lat:37.30, lon:127.82 },
  { id:"jade",      name:"제이드팰리스GC",    zone:"강원", region:"춘천", addr:"춘천시 남산면", lat:37.79, lon:127.58 },
  { id:"labiebel",  name:"라비에벨CC",        zone:"강원", region:"춘천", addr:"춘천시 남산면", lat:37.77, lon:127.60 },
  { id:"elysian",   name:"엘리시안 강촌CC",   zone:"강원", region:"춘천", addr:"춘천시 남산면", lat:37.79, lon:127.55 },
  { id:"ladena",    name:"라데나GC",          zone:"강원", region:"춘천", addr:"춘천시 신북읍", lat:37.95, lon:127.73 },
  { id:"sonofelice",name:"소노펠리체비발디파크CC",zone:"강원", region:"홍천", addr:"홍천군 서면", lat:37.65, lon:127.69 },
  { id:"clubmow",   name:"클럽모우CC",        zone:"강원", region:"홍천", addr:"홍천군 서석면", lat:37.74, lon:128.10 },
  { id:"hilldrosay",name:"힐드로사이CC",      zone:"강원", region:"횡성", addr:"횡성군 우천면", lat:37.47, lon:127.99 },
  { id:"welli",     name:"웰리힐리CC",        zone:"강원", region:"횡성", addr:"횡성군 둔내면", lat:37.54, lon:128.22 },
  { id:"phoenix",   name:"휘닉스CC",          zone:"강원", region:"평창", addr:"평창군 봉평면", lat:37.58, lon:128.32 },
  { id:"alpensia",  name:"알펜시아700CC",     zone:"강원", region:"평창", addr:"평창군 대관령면", lat:37.66, lon:128.68 },
  { id:"highone",   name:"하이원CC",          zone:"강원", region:"정선", addr:"정선군 고한읍", lat:37.21, lon:128.82 },
  { id:"birchhill", name:"버치힐CC",          zone:"강원", region:"강릉", addr:"강릉시 왕산면", lat:37.68, lon:128.82 },
  { id:"shinedale", name:"샤인데일GC",        zone:"강원", region:"양양", addr:"양양군 손양면", lat:38.03, lon:128.60 },

  /* ── 충청 (충북·충남·대전·세종) ── */
  { id:"rainbow",   name:"레인보우힐스CC",    zone:"충청", region:"충북 음성", addr:"음성군 삼성면", lat:36.99, lon:127.54 },
  { id:"tgv",       name:"떼제베CC",          zone:"충청", region:"충북 음성", addr:"음성군 생극면", lat:37.03, lon:127.63 },
  { id:"kingsdale", name:"킹스데일GC",        zone:"충청", region:"충북 음성", addr:"음성군 원남면", lat:36.90, lon:127.60 },
  { id:"grand",     name:"그랜드CC",          zone:"충청", region:"충북 청주", addr:"청주시 상당구 낭성면", lat:36.60, lon:127.57 },
  { id:"cheongju",  name:"청주CC",            zone:"충청", region:"충북 청주", addr:"청주시 상당구", lat:36.63, lon:127.52 },
  { id:"silkriver", name:"실크리버CC",        zone:"충청", region:"충북 청주", addr:"청주시 청원구", lat:36.72, lon:127.48 },
  { id:"greenhill", name:"그린힐CC",          zone:"충청", region:"충북 진천", addr:"진천군 초평면", lat:36.86, lon:127.48 },
  { id:"players",   name:"더플레이어스GC",    zone:"충청", region:"충북 진천", addr:"진천군 문백면", lat:36.82, lon:127.42 },
  { id:"plazacc",   name:"프라자CC(제천)",    zone:"충청", region:"충북 제천", addr:"제천시 백운면", lat:37.10, lon:128.02 },
  { id:"resom",     name:"리솜포레CC",        zone:"충청", region:"충북 제천", addr:"제천시 백운면", lat:37.12, lon:128.00 },
  { id:"woojung",   name:"우정힐스CC",        zone:"충청", region:"충남 천안", addr:"천안시 동남구 목천읍", lat:36.75, lon:127.25 },
  { id:"cheonan",   name:"천안상록CC",        zone:"충청", region:"충남 천안", addr:"천안시 동남구 수신면", lat:36.75, lon:127.30 },
  { id:"taeanbeach",name:"태안비치GC",        zone:"충청", region:"충남 태안", addr:"태안군 남면", lat:36.68, lon:126.30 },
  { id:"goldenbay", name:"골든베이GC",        zone:"충청", region:"충남 태안", addr:"태안군 고남면", lat:36.55, lon:126.36 },
  { id:"pinestone", name:"파인스톤CC",        zone:"충청", region:"충남 아산", addr:"아산시 도고면", lat:36.75, lon:126.90 },
  { id:"beautiful", name:"아름다운CC",        zone:"충청", region:"충남 당진", addr:"당진시 정미면", lat:36.85, lon:126.75 },
  { id:"baekje",    name:"백제CC",            zone:"충청", region:"충남 논산", addr:"논산시 상월면", lat:36.25, lon:127.20 },
  { id:"daejeon",   name:"대전CC",            zone:"충청", region:"대전", addr:"대전 동구 세천동", lat:36.34, lon:127.48 },
  { id:"yuseong",   name:"유성CC",            zone:"충청", region:"대전", addr:"대전 유성구", lat:36.37, lon:127.32 },
  { id:"sejong",    name:"세종필드CC",        zone:"충청", region:"세종", addr:"세종시 전동면", lat:36.60, lon:127.28 },

  /* ── 영남 (경상·부산·대구·울산) ── */
  { id:"busan",     name:"부산CC",            zone:"영남", region:"경남 양산", addr:"양산시 동면", lat:35.35, lon:129.10 },
  { id:"dongrae",   name:"동래베네스트GC",    zone:"영남", region:"부산", addr:"부산 금정구 오륜동", lat:35.27, lon:129.11 },
  { id:"asiad",     name:"아시아드CC",        zone:"영남", region:"부산", addr:"부산 강서구 오리", lat:35.16, lon:128.94 },
  { id:"tongdo",    name:"통도파인이스트CC",  zone:"영남", region:"경남 양산", addr:"양산시 하북면", lat:35.49, lon:129.06 },
  { id:"eden",      name:"에덴밸리CC",        zone:"영남", region:"경남 양산", addr:"양산시 원동면", lat:35.38, lon:128.94 },
  { id:"palgong",   name:"팔공CC",            zone:"영남", region:"대구", addr:"대구 동구 능성동", lat:35.99, lon:128.72 },
  { id:"daegu",     name:"대구CC",            zone:"영남", region:"대구", addr:"대구 동구", lat:35.90, lon:128.70 },
  { id:"gyeongju",  name:"경주신라CC",        zone:"영남", region:"경북 경주", addr:"경주시 천북면", lat:35.92, lon:129.25 },
  { id:"changwon",  name:"창원CC",            zone:"영남", region:"경남 창원", addr:"창원시 의창구 동읍", lat:35.29, lon:128.62 },
  { id:"gimhae",    name:"김해가야CC",        zone:"영남", region:"경남 김해", addr:"김해시 상동면", lat:35.28, lon:128.90 },
  { id:"gumi",      name:"구미CC",            zone:"영남", region:"경북 구미", addr:"구미시 선산읍", lat:36.24, lon:128.30 },
  { id:"andong",    name:"안동CC",            zone:"영남", region:"경북 안동", addr:"안동시 남후면", lat:36.51, lon:128.68 },

  /* ── 호남 (전라·광주) ── */
  { id:"gwangju",   name:"광주CC",            zone:"호남", region:"광주", addr:"광주 광산구 삼거동", lat:35.22, lon:126.72 },
  { id:"pinehills", name:"파인힐스CC",        zone:"호남", region:"광주", addr:"광주 광산구", lat:35.20, lon:126.70 },
  { id:"mudeung",   name:"무등산CC",          zone:"호남", region:"전남 담양", addr:"담양군 대전면", lat:35.25, lon:126.98 },
  { id:"yeosu",     name:"여수경도CC",        zone:"호남", region:"전남 여수", addr:"여수시 경호동", lat:34.72, lon:127.76 },
  { id:"muan",      name:"무안CC",            zone:"호남", region:"전남 무안", addr:"무안군 청계면", lat:34.95, lon:126.46 },
  { id:"gunsan",    name:"군산CC",            zone:"호남", region:"전북 군산", addr:"군산시 옥산면", lat:35.95, lon:126.72 },
  { id:"sunwoon",   name:"골프존카운티 선운", zone:"호남", region:"전북 고창", addr:"고창군 아산면", lat:35.45, lon:126.62 },
  { id:"jeonju",    name:"전주CC",            zone:"호남", region:"전북 완주", addr:"완주군 구이면", lat:35.72, lon:127.15 },

  /* ── 제주 ── */
  { id:"skyhill",   name:"제주 롯데스카이힐 CC",zone:"제주", region:"서귀포", addr:"서귀포시 상예로 530 · 해발 약 250m", lat:33.277, lon:126.423 },
  { id:"volcano",   name:"볼카노 골프&리조트", zone:"제주", region:"서귀포", addr:"서귀포시 산록남로 1391 · 해발 약 400m 고지", lat:33.312, lon:126.412 },
  { id:"ninebridge",name:"클럽나인브릿지",    zone:"제주", region:"서귀포", addr:"서귀포시 안덕면", lat:33.30, lon:126.36 },
  { id:"pinx",      name:"핀크스GC",          zone:"제주", region:"서귀포", addr:"서귀포시 안덕면", lat:33.31, lon:126.35 },
  { id:"elysianj",  name:"엘리시안 제주CC",   zone:"제주", region:"제주시", addr:"제주시 애월읍", lat:33.42, lon:126.36 },
  { id:"blackstonej",name:"블랙스톤 제주GC",  zone:"제주", region:"제주시", addr:"제주시 조천읍 교래리", lat:33.44, lon:126.66 },
  { id:"ora",       name:"제주오라CC",        zone:"제주", region:"제주시", addr:"제주시 오라동", lat:33.46, lon:126.51 },
  { id:"raon",      name:"라온골프클럽",      zone:"제주", region:"제주시", addr:"제주시 한림읍", lat:33.36, lon:126.29 },
  { id:"haevichi",  name:"해비치CC",          zone:"제주", region:"서귀포", addr:"서귀포시 표선면", lat:33.33, lon:126.83 },
  { id:"teddy",     name:"테디밸리GC",        zone:"제주", region:"서귀포", addr:"서귀포시 안덕면", lat:33.27, lon:126.39 }
];

/* 예약된(즐겨찾는) 라운딩 — 허브 상단에 카드로 노출 */
const PRESET_ROUNDS = [
  { course:"skyhill",  date:"2026-08-15" },
  { course:"volcano",  date:"2026-08-16" },
  { course:"verthill", date:"2026-09-03" }
];

/* 드롭다운 지역 그룹 순서 */
const ZONE_ORDER = ["수도권","강원","충청","영남","호남","제주"];

function courseById(id){ return GOLF_COURSES.find(c=>c.id===id) || null; }

const MODELS = [
  { key:"kma_seamless",  label:"기상청 KMA",   flag:"🇰🇷" },
  { key:"jma_seamless",  label:"일본기상청 JMA", flag:"🇯🇵" },
  { key:"icon_seamless", label:"독일 DWD",     flag:"🇩🇪" },
  { key:"gfs_seamless",  label:"미국 NOAA",    flag:"🇺🇸" }
];
const PLAY_HOURS = [6,7,8,9,10,11,12,13,14,15,16,17,18,19];

const WMO = {0:["맑음","☀️"],1:["대체로 맑음","🌤️"],2:["부분 흐림","⛅"],3:["흐림","☁️"],45:["안개","🌫️"],48:["짙은 안개","🌫️"],51:["약한 이슬비","🌦️"],53:["이슬비","🌦️"],55:["강한 이슬비","🌦️"],56:["어는 이슬비","🌧️"],57:["강한 어는 이슬비","🌧️"],61:["약한 비","🌧️"],63:["비","🌧️"],65:["강한 비","🌧️"],66:["어는 비","🌧️"],67:["강한 어는 비","🌧️"],71:["약한 눈","🌨️"],73:["눈","🌨️"],75:["강한 눈","🌨️"],77:["싸락눈","🌨️"],80:["약한 소나기","🌦️"],81:["소나기","🌦️"],82:["강한 소나기","⛈️"],85:["소낙눈","🌨️"],86:["강한 소낙눈","🌨️"],95:["뇌우","⛈️"],96:["우박 동반 뇌우","⛈️"],99:["강한 우박 뇌우","⛈️"]};
function wmo(c){ return WMO[c] || ["-","❓"]; }

function windDir(deg){ if(deg==null) return "-"; const d=["북","북동","동","남동","남","남서","서","북서"]; return d[Math.round(deg/45)%8]; }
function fmt(v,dec=0,dash="—"){ return (v==null||isNaN(v)) ? dash : Number(v).toFixed(dec); }

function weekday(dateStr){ const d=new Date(dateStr+"T00:00:00"); return ["일","월","화","수","목","금","토"][d.getDay()]+"요일"; }
function daysUntil(dateStr){ const t=new Date(dateStr+"T00:00:00"); const now=new Date(); now.setHours(0,0,0,0); return Math.round((t-now)/86400000); }
function availDateStr(dateStr){ const t=new Date(dateStr+"T00:00:00"); t.setDate(t.getDate()-16); return t.toLocaleDateString('ko-KR',{month:'long',day:'numeric'})+"경 (예보 D-16)"; }

function capeRisk(cape, hasThunder){
  if(hasThunder) return {cls:"high",tag:"높음",txt:"뇌우 발생 예보 — 낙뢰 주의"};
  if(cape==null) return {cls:"low",tag:"정보없음",txt:"불안정 지수 데이터 없음"};
  if(cape>=2500) return {cls:"high",tag:"매우 높음",txt:"대기 매우 불안정(CAPE "+Math.round(cape)+")"};
  if(cape>=1000) return {cls:"high",tag:"높음",txt:"대기 불안정(CAPE "+Math.round(cape)+") — 오후 뇌우 가능"};
  if(cape>=500)  return {cls:"mid",tag:"보통",txt:"국지적 소나기 가능(CAPE "+Math.round(cape)+")"};
  return {cls:"low",tag:"낮음",txt:"대기 안정(CAPE "+Math.round(cape)+")"};
}

async function fetchMaybe(url){
  try{ const r=await fetch(url); if(!r.ok) return {ok:false, status:r.status}; return {ok:true, data:await r.json()}; }
  catch(e){ return {ok:false, status:0, err:e.message}; }
}
function mainURL(lat,lon,date){
  const h="temperature_2m,apparent_temperature,precipitation,precipitation_probability,wind_speed_10m,wind_gusts_10m,wind_direction_10m,relative_humidity_2m,cape,weather_code";
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=${h}&timezone=Asia%2FSeoul&wind_speed_unit=kmh&start_date=${date}&end_date=${date}&models=best_match`;
}
function srcURL(lat,lon,date){
  const d="temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,weather_code";
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=${d}&timezone=Asia%2FSeoul&wind_speed_unit=kmh&start_date=${date}&end_date=${date}&models=${MODELS.map(m=>m.key).join(",")}`;
}
