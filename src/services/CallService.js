import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = '@call_logs';
export const saveCallLog = async (log) => {
  try {
    const e = await AsyncStorage.getItem(KEY);
    const logs = e ? JSON.parse(e) : [];
    logs.unshift({...log,id:Date.now(),timestamp:new Date().toISOString()});
    await AsyncStorage.setItem(KEY,JSON.stringify(logs.slice(0,100)));
  } catch(e){}
};
export const getCallLogs = async () => {
  try { const d = await AsyncStorage.getItem(KEY); return d?JSON.parse(d):[]; } catch(e){return[];}
};
export const lookupNumber = async (number) => {
  return new Promise(r => {
    setTimeout(() => {
      const n = number.replace(/\D/g,'');
      if(n.includes('123456')) r({found:true,name:'疑似诈骗',type:'scam',risk:'high'});
      else if(n.includes('72691788')) r({found:true,name:'VENTUS SPA KK',type:'business',risk:'safe'});
      else r({found:false,name:null,type:'unknown',risk:'medium'});
    },800);
  });
};