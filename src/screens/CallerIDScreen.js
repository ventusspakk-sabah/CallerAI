import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ActivityIndicator,ScrollView} from 'react-native';
import {lookupNumber,saveCallLog} from '../services/CallService';
import {formatPhoneNumber,spamDatabase} from '../utils/phoneUtils';
export default function CallerIDScreen({route}){
  const [number,setNumber]=useState(route?.params?.number||'');
  const [result,setResult]=useState(null); const [loading,setLoading]=useState(false);
  useEffect(()=>{if(route?.params?.number)handleLookup(route.params.number);},[route]);
  const handleLookup=async(num)=>{
    const t=num||number; if(!t)return;
    setLoading(true); setResult(null);
    const n=t.replace(/\D/g,'');
    if(spamDatabase[n]){setResult({...spamDatabase[n],source:'本地数据库'}); setLoading(false); return;}
    const r=await lookupNumber(t); setResult({...r,source:'AI云端识别'}); setLoading(false);
  };
  const getColor=(r)=>{switch(r){case'high':return'#f44336'; case'medium':return'#ff9800'; case'safe':return'#4CAF50'; default:return'#999';}};
  const getText=(r)=>{switch(r){case'high':return'高风险-建议拦截'; case'medium':return'中风险-谨慎接听'; case'safe':return'安全-可信号码'; default:return'未知';}};
  const report=async(type)=>{await saveCallLog({number,name:result?.name,type:'reported'}); alert('已标记为: '+type);};
  return(
    <ScrollView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput style={styles.input} placeholder="输入号码" value={number} onChangeText={setNumber} keyboardType="phone-pad" placeholderTextColor="#999"/>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>handleLookup()}><Text style={styles.searchBtnText}>🔍 识别</Text></TouchableOpacity>
      </View>
      {loading&&<View style={styles.loading}><ActivityIndicator size="large" color="#1a73e8"/><Text style={styles.loadingText}>AI识别中...</Text></View>}
      {result&&(
        <View style={styles.resultBox}>
          <View style={[styles.badge,{backgroundColor:getColor(result.risk)}]}><Text style={styles.badgeText}>{getText(result.risk)}</Text></View>
          <Text style={styles.rName}>{result.name||'未知身份'}</Text>
          <Text style={styles.rNum}>{formatPhoneNumber(number)}</Text>
          <View style={styles.row}><Text style={styles.label}>类型</Text><Text style={styles.value}>{result.type?.toUpperCase()||'UNKNOWN'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>标记次数</Text><Text style={styles.value}>{result.count||0}人</Text></View>
          <View style={styles.row}><Text style={styles.label}>数据来源</Text><Text style={styles.value}>{result.source}</Text></View>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actBtn,{backgroundColor:'#f44336'}]} onPress={()=>report('scam')}><Text style={styles.actText}>🚫 诈骗</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.actBtn,{backgroundColor:'#ff9800'}]} onPress={()=>report('spam')}><Text style={styles.actText}>📢 骚扰</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.actBtn,{backgroundColor:'#4CAF50'}]} onPress={()=>report('safe')}><Text style={styles.actText}>✅ 安全</Text></TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>💡 提示</Text>
        <Text style={styles.tipsText}>• 输入完整号码识别{'
'}• 可标记陌生号码{'
'}• 高风险建议拦截{'
'}• 支持马来西亚格式(+60)</Text>
      </View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f5f5'},
  searchBox:{flexDirection:'row',padding:15,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#e0e0e0'},
  input:{flex:1,borderWidth:1,borderColor:'#ddd',borderRadius:8,padding:12,fontSize:18,marginRight:10},
  searchBtn:{backgroundColor:'#1a73e8',paddingHorizontal:20,borderRadius:8,justifyContent:'center'},
  searchBtnText:{color:'#fff',fontSize:16,fontWeight:'bold'},
  loading:{alignItems:'center',padding:40},
  loadingText:{marginTop:15,color:'#666',fontSize:16},
  resultBox:{margin:15,backgroundColor:'#fff',borderRadius:12,padding:20,elevation:3},
  badge:{alignSelf:'flex-start',paddingHorizontal:15,paddingVertical:6,borderRadius:20,marginBottom:15},
  badgeText:{color:'#fff',fontWeight:'bold',fontSize:14},
  rName:{fontSize:24,fontWeight:'bold',color:'#333',marginBottom:5},
  rNum:{fontSize:18,color:'#666',marginBottom:20},
  row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,borderBottomWidth:1,borderBottomColor:'#f0f0f0'},
  label:{fontSize:14,color:'#999'},
  value:{fontSize:14,color:'#333',fontWeight:'600'},
  actions:{flexDirection:'row',justifyContent:'space-between',marginTop:20},
  actBtn:{flex:1,marginHorizontal:5,paddingVertical:12,borderRadius:8,alignItems:'center'},
  actText:{color:'#fff',fontWeight:'bold',fontSize:13},
  tips:{margin:15,backgroundColor:'#e3f2fd',borderRadius:12,padding:15},
  tipsTitle:{fontSize:16,fontWeight:'bold',color:'#1a73e8',marginBottom:8},
  tipsText:{fontSize:14,color:'#555',lineHeight:22},
});