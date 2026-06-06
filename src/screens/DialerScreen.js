import React,{useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Vibration} from 'react-native';
import {saveCallLog} from '../services/CallService';
import {formatPhoneNumber} from '../utils/phoneUtils';
const KEYS=['1','2','3','4','5','6','7','8','9','*','0','#'];
export default function DialerScreen({navigation}){
  const [number,setNumber]=useState('');
  const press=(k)=>{Vibration.vibrate(30);setNumber(p=>p+k);};
  const del=()=>setNumber(p=>p.slice(0,-1));
  const call=async()=>{
    if(!number)return;
    await saveCallLog({number,name:null,type:'outgoing'});
    Vibration.vibrate(100);
    alert('呼叫 '+formatPhoneNumber(number));
    setNumber('');
  };
  const lookup=()=>{if(number)navigation.navigate('CallerID',{number});};
  return(
    <View style={styles.container}>
      <View style={styles.display}><Text style={styles.numText}>{formatPhoneNumber(number)||'输入号码'}</Text></View>
      <View style={styles.pad}>{KEYS.map((k,i)=><TouchableOpacity key={i} style={styles.key} onPress={()=>press(k)}><Text style={styles.keyText}>{k}</Text></TouchableOpacity>)}</View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.callBtn} onPress={call}><Text style={styles.callText}>📞 呼叫</Text></TouchableOpacity>
        <TouchableOpacity style={styles.lookupBtn} onPress={lookup}><Text style={styles.lookupText}>🔍 识别</Text></TouchableOpacity>
        <TouchableOpacity style={styles.delBtn} onPress={del} onLongPress={()=>setNumber('')}><Text style={styles.delText}>⌫</Text></TouchableOpacity>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f5f5'},
  display:{height:100,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#e0e0e0'},
  numText:{fontSize:32,fontWeight:'300',color:'#333'},
  pad:{flex:1,flexDirection:'row',flexWrap:'wrap',padding:20,justifyContent:'center',alignContent:'center'},
  key:{width:'30%',aspectRatio:1.2,justifyContent:'center',alignItems:'center',margin:5,backgroundColor:'#fff',borderRadius:50,elevation:2},
  keyText:{fontSize:28,color:'#333'},
  actions:{flexDirection:'row',justifyContent:'space-around',padding:20,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#e0e0e0'},
  callBtn:{backgroundColor:'#4CAF50',paddingVertical:15,paddingHorizontal:30,borderRadius:30},
  callText:{color:'#fff',fontSize:18,fontWeight:'bold'},
  lookupBtn:{backgroundColor:'#1a73e8',paddingVertical:15,paddingHorizontal:25,borderRadius:30},
  lookupText:{color:'#fff',fontSize:16,fontWeight:'bold'},
  delBtn:{backgroundColor:'#f44336',paddingVertical:15,paddingHorizontal:25,borderRadius:30},
  delText:{color:'#fff',fontSize:18,fontWeight:'bold'},
});