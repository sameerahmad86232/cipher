/* Server-side AlAdhan proxy. Only date, city/country or coordinates, and a
   small allowlist of supported calculation settings are accepted. */
const ALADHAN='https://api.aladhan.com/v1';
const METHODS=new Set(['1','2','3','4','5']);
function json(data,status=200,headers={}){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});}
export default {
 async fetch(request){
  if(request.method!=='GET')return json({error:'Method not allowed'},405,{Allow:'GET'});
  const input=new URL(request.url).searchParams;
  const date=input.get('date')||'';
  const city=(input.get('city')||'').trim(),country=(input.get('country')||'').trim();
  const latStr=input.get('latitude'),lngStr=input.get('longitude');
  const method=input.get('method')||'1',school=input.get('school')||'1';
  if(!/^\d{2}-\d{2}-\d{4}$/.test(date)||!METHODS.has(method)||!['0','1'].includes(school))return json({error:'Invalid date or calculation settings'},400);
  const [dd,mm,yyyy]=date.split('-').map(Number);
  const parsed=new Date(Date.UTC(yyyy,mm-1,dd));
  if(parsed.getUTCFullYear()!==yyyy||parsed.getUTCMonth()!==mm-1||parsed.getUTCDate()!==dd||yyyy<2020||yyyy>2100)return json({error:'Invalid date'},400);
  const params=new URLSearchParams({method,school});
  let path='';
  if(latStr!==null||lngStr!==null){
   const latitude=Number(latStr),longitude=Number(lngStr);
   if(latStr===null||lngStr===null||!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>90||Math.abs(longitude)>180)return json({error:'Invalid coordinates'},400);
   params.set('latitude',latitude.toFixed(3));params.set('longitude',longitude.toFixed(3));path='/timings/'+date;
  }else{
   if(!city||!country||city.length>80||country.length>80)return json({error:'Enter a city and country'},400);
   params.set('city',city);params.set('country',country);path='/timingsByCity/'+date;
  }
  try{
   const upstream=await fetch(ALADHAN+path+'?'+params.toString(),{signal:AbortSignal.timeout(9500),headers:{Accept:'application/json'}});
   if(!upstream.ok)return json({error:'Prayer time service is unavailable'},502);
   const result=await upstream.json();
   if(result?.code!==200||!result?.data?.timings)return json({error:'Prayer timetable not available for this location'},502);
   const d=result.data;
   const keys=['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha','Imsak','Sunset'];
   const timings=Object.fromEntries(keys.filter(k=>typeof d.timings[k]==='string').map(k=>[k,d.timings[k]]));
   return json({code:200,data:{timings,meta:{timezone:String(d.meta?.timezone||'UTC'),method:d.meta?.method?.name||null},date:{gregorian:{date:d.date?.gregorian?.date||date}}}},200,{'Cache-Control':'public, s-maxage=1200, stale-while-revalidate=3600'});
  }catch(e){return json({error:'Unable to reach the calculation provider'},502);}
 }
};
