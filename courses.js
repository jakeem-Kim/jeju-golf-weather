/* ===== 골프 기상 허브 · 공통 데이터 & 로직 ===== */

/* 등록된 골프장 (여기에 추가하면 허브 드롭다운·상세 페이지에 자동 반영) */
const GOLF_COURSES = [
  { id:"skyhill",  name:"제주 롯데스카이힐 CC", region:"제주 · 서귀포",
    addr:"서귀포시 상예로 530 · 해발 약 250m", lat:33.277, lon:126.423 },
  { id:"volcano",  name:"볼카노 골프&리조트",   region:"제주 · 서귀포",
    addr:"서귀포시 산록남로 1391 · 해발 약 400m 고지", lat:33.312, lon:126.412 },
  { id:"verthill", name:"베르힐 영종 CC",       region:"인천 · 영종도",
    addr:"인천 중구 한상중앙로 66 · 서해안 임해", lat:37.525, lon:126.530 }
];

/* 예약된(즐겨찾는) 라운딩 — 허브 상단에 카드로 노출 */
const PRESET_ROUNDS = [
  { course:"skyhill",  date:"2026-08-15" },
  { course:"volcano",  date:"2026-08-16" },
  { course:"verthill", date:"2026-09-03" }
];

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
