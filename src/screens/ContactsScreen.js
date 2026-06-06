import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,TextInput} from 'react-native';
import * as Contacts from 'expo-contacts';
export default function ContactsScreen({navigation}){
  const [contacts,setContacts]=useState([]); const [search,setSearch]=useState('');
  useEffect(()=>{loadContacts();},[]);
  const loadContacts=async()=>{
    const {status}=await Contacts.requestPermissionsAsync();
    if(status==='granted'){const {data}=await Contacts.getContactsAsync({fields:[Contacts.Fields.PhoneNumbers]});setContacts(data||[]);}
  };
  const filtered=contacts.filter(c=>(c.name||'').toLowerCase().includes(search.toLowerCase())||(c.phoneNumbers?.[0]?.number||'').includes(search));
  const renderItem=({item})=>(
    <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('CallerID',{number:item.phoneNumbers?.[0]?.number})}>
      <View style={styles.avatar}><Text style={styles.avText}>{(item.name||'?')[0].toUpperCase()}</Text></View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name||'未知'}</Text>
        <Text style={styles.phone}>{item.phoneNumbers?.[0]?.number||'无号码'}</Text>
      </View>
      <Text style={styles.callIcon}>📞</Text>
    </TouchableOpacity>
  );
  return(
    <View style={styles.container}>
      <View style={styles.header}><TextInput style={styles.search} placeholder="搜索联系人..." value={search} onChangeText={setSearch} placeholderTextColor="#999"/></View>
      <FlatList data={filtered} keyExtractor={(item,i)=>item.id?.toString()||i.toString()} renderItem={renderItem} ListEmptyComponent={<Text style={styles.empty}>暂无联系人</Text>}/>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f5f5'},
  header:{padding:12,backgroundColor:'#1a73e8'},
  search:{backgroundColor:'#fff',borderRadius:8,padding:10,fontSize:16},
  item:{flexDirection:'row',padding:15,backgroundColor:'#fff',marginBottom:1,alignItems:'center'},
  avatar:{width:45,height:45,borderRadius:23,backgroundColor:'#1a73e8',justifyContent:'center',alignItems:'center'},
  avText:{color:'#fff',fontSize:18,fontWeight:'bold'},
  info:{flex:1,marginLeft:12},
  name:{fontSize:16,fontWeight:'600',color:'#333'},
  phone:{fontSize:14,color:'#666',marginTop:2},
  callIcon:{fontSize:24,color:'#4CAF50'},
  empty:{textAlign:'center',marginTop:50,color:'#999'},
});