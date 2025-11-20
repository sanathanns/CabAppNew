import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import { RIDES } from '../data/rides';
import { theme } from '../styles/theme';

function useQuery() {
  const loc = useLocation();
  return new URLSearchParams(loc.search);
}

export function RideResultsScreen() {
  const navigate = useNavigate();
  const q = useQuery();
  const pickup = q.get('pickup') || 'Unknown';
  const destination = q.get('destination') || 'Unknown';

  function selectRide(ride) {
    // pass ride id and query string forward
    const params = new URLSearchParams();
    params.set('pickup', pickup);
    params.set('destination', destination);
    params.set('rideName', ride.name);
    navigate(`/driver/${ride.id}?${params.toString()}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rides</Text>
      <Text style={styles.sub}>{pickup} → {destination}</Text>

      <FlatList
        data={RIDES}
        keyExtractor={i=>i.id}
        contentContainerStyle={{padding:12}}
        renderItem={({item})=>(
          <TouchableOpacity style={styles.card} onPress={()=>selectRide(item)}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.eta}>ETA {item.eta}</Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor: theme.colors.background},
  heading:{fontSize:18,fontWeight:'800', margin:12},
  sub:{color:theme.colors.muted, marginHorizontal:12, marginBottom:8},
  card:{backgroundColor:'#fff', padding:14, borderRadius:12, flexDirection:'row', justifyContent:'space-between', alignItems:'center', elevation:2, marginBottom:10},
  name:{fontWeight:'800'},
  eta:{color:theme.colors.muted, marginTop:6},
  price:{fontWeight:'900'}
});
