export const formatPhoneNumber = (n) => {
  if(!n) return '';
  const c = n.replace(/\D/g,'');
  if(c.length===10) return `+60 ${c.slice(1,4)} ${c.slice(4,7)} ${c.slice(7)}`;
  if(c.length===11 && c.startsWith('60')) return `+${c.slice(0,2)} ${c.slice(2,5)} ${c.slice(5,8)} ${c.slice(8)}`;
  return n;
};
export const spamDatabase = {
  '60123456789':{name:'诈骗-假银行',type:'scam',count:156},
  '60198765432':{name:'推销-保险',type:'spam',count:89},
  '60172691788':{name:'VENTUS SPA',type:'business',count:0},
};