import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,FlatList,TextInput} from 'react-native';
import {getCallLogs} from '../services/CallService';
import {formatPhoneNumber} from '../utils/phoneUtils';
export default function HomeScreen({navigation}){
  const [logs,setLogs]=useState([]); const [search,setSearch]=useState('');
  useEffect(()=>{const u=navigation.addListener('focus',loadLogs);return u;},[navigation]);
  const loadLogs=async()=>{const d=await getCallLogs();setLogs(d);};
  const filtered=logs.filter(l=>(l.name||'').toLowerCase().includes(search.toLowerCase())||(l.number||'').includes(search));
  const renderItem=({item})=>(
    <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('CallerID',{number:item.number})}>
      <Text style={styles.icon}>{item.type==='missed'?'❌':item.type==='outgoing'?'↗️':'↙️'}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name||'未知号码'}</Text>
        <Text style={styles.num}>{formatPhoneNumber(item.number)}</Text>
        <Text style={styles.time}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
      <Text style={[styles.type,item.type==='missed'&&{color:'#f44336'}]}>{item.type}</Text>
    </TouchableOpacity>
  );
  return(
    <View style={styles.container}>
      <View style={styles.searchBar}><TextInput style={styles.input} placeholder="搜索..." value={search} onChangeText={setSearch} placeholderTextColor="#999"/></View>
      <FlatList data={filtered} keyExtractor={i=>i.id.toString()} renderItem={renderItem} ListEmptyComponent={<Text style={styles.empty}>暂无记录</Text>}/>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Dialer')}><Text style={styles.btnText}>📱 拨号</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Contacts')}><Text style={styles.btnText}>👥 联系人</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('CallerID')}><Text style={styles.btnText}>🔍 识别</Text></TouchableOpacity>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f5f5'},
  searchBar:{padding:12,backgroundColor:'#1a73e8'},
  input:{backgroundColor:'#fff',borderRadius:8,padding:10,fontSize:16},
  item:{flexDirection:'row',padding:15,backgroundColor:'#fff',marginBottom:1,alignItems:'center'},
  icon:{width:40,fontSize:20,textAlign:'center'},
  info:{flex:1,marginLeft:10},
  name:{fontSize:16,fontWeight:'600',color:'#333'},
  num:{fontSize:14,color:'#666',marginTop:2},
  time:{fontSize:12,color:'#999',marginTop:2},
  type:{width:60,textAlign:'center',fontSize:12,color:'#4CAF50',fontWeight:'600'},
  empty:{textAlign:'center',marginTop:50,color:'#999'},
  nav:{flexDirection:'row',backgroundColor:'#fff',paddingVertical:12,borderTopWidth:1,borderTopColor:'#e0e0e0'},
  btn:{flex:1,alignItems:'center'},
  btnText:{fontSize:14,color:'#1a73e8',fontWeight:'600'},
});