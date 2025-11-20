import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../styles/theme';
import { useLocation, useNavigate } from 'react-router-native';

export function BookingScreen() {

  const navigate = useNavigate();
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const ride = q.get("ride") || "Ride";

  const [finding, setFinding] = useState(true);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFinding(false);
      setFound(true);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
      
        <Text style={styles.heading}>Booking: {ride}</Text>

        {finding && (
          <View style={styles.finding}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 12 }}>Finding a driver...</Text>
          </View>
        )}

        {found && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ color: theme.colors.muted }}>Driver assigned</Text>

            <TouchableOpacity
              style={styles.cta}
              onPress={() => navigate("/")}
            >
              <Text style={{ color: '#fff', fontWeight: '800' }}>Track ride</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: 16 },
  heading: { fontSize: 20, fontWeight: '900', color: theme.colors.text },
  finding: { alignItems: 'center', paddingVertical: 24 },
  cta: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  }
});
