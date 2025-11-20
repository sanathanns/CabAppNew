import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Sanathan NS</Text>
            <Text style={{color:theme.colors.muted}}>Member since 2024</Text>
          </View>
          <View style={styles.avatar}><Ionicons name="person" size={30} color="#fff" /></View>
        </View>
        <View style={{marginTop:24}}>
          <TouchableOpacity style={styles.item}><Text>Payment methods</Text></TouchableOpacity>
          <TouchableOpacity style={styles.item}><Text>Ride preferences</Text></TouchableOpacity>
          <TouchableOpacity style={styles.item}><Text>Support</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{ flex:1, backgroundColor:theme.colors.background },
  container:{ padding:16 },
  header:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  name:{ fontSize:20, fontWeight:'900' },
  avatar:{ width:64, height:64, borderRadius:18, backgroundColor:theme.colors.primary, alignItems:'center', justifyContent:'center' },
  item:{ marginTop:12, backgroundColor:'#fff', padding:14, borderRadius:12 }
});
