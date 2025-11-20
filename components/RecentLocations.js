import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-native';

const items = [
  { id: '1', name: 'Home', detail: 'MG Road' },
  { id: '2', name: 'Work', detail: 'Tech Park' },
  { id: '3', name: 'Airport', detail: 'Terminal 1' }
];

export function RecentLocations() {

  const navigate = useNavigate();

  function select(item) {
    const params = new URLSearchParams();
    params.set("destination", item.detail);

    navigate(`/?${params.toString()}`);
  }

  return (
    <View style={{ marginTop: 12 }}>
      <Text style={styles.heading}>Recent locations</Text>

      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => select(item)}>
            <View style={styles.icon}>
              <Ionicons name="location" size={18} color={theme.colors.primary} />
            </View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.sub}>{item.detail}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 14, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  card: { backgroundColor: '#fff', padding: 12, marginRight: 12, borderRadius: 12, width: 140, elevation: 3 },
  icon: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#ECFEFF', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  title: { fontWeight: '700' },
  sub: { color: theme.colors.muted, fontSize: 12 }
});
