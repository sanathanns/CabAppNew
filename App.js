// App.js (React Router + Bottom Tabs + Proper Fullscreen Routing)
import React from "react";
import { SafeAreaView, StatusBar, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { NativeRouter, Routes, Route, useNavigate } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./styles/theme";

// Screens
import { HomeScreen } from "./screens/HomeScreen";
import { BookingScreen } from "./screens/BookingScreen";
import { ActivityScreen } from "./screens/ActivityScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { RideResultsScreen } from "./screens/RideResultsScreen";
import { DriverDetailsScreen } from "./screens/DriverDetailsScreen";

// ------------------------------
// Bottom Tabs Wrapper (for only tab screens)
// ------------------------------
function TabLayout() {
  const navigate = useNavigate();

  function TabButton({ label, icon, route }) {
    return (
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigate(route)}
      >
        <Ionicons name={icon} size={22} color={theme.colors.primary} />
        <Text style={styles.tabLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* ONLY Tab Screens */}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/activity" element={<ActivityScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TabButton label="Home" icon="car-outline" route="/" />
        <TabButton label="Activity" icon="time-outline" route="/activity" />
        <TabButton label="Profile" icon="person-outline" route="/profile" />
      </View>
    </View>
  );
}

// ------------------------------
// MAIN APP ROUTER
// ------------------------------
export default function App() {
  return (
    <NativeRouter>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar barStyle="dark-content" />

        <Routes>

          {/* TABS SCREENS */}
          <Route path="/*" element={<TabLayout />} />

          {/* FULL SCREEN ROUTES (No tabs) */}
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/results" element={<RideResultsScreen />} />
          <Route path="/driver/:rideId" element={<DriverDetailsScreen />} />
          <Route path="/booking" element={<BookingScreen />} />

        </Routes>

      </SafeAreaView>
    </NativeRouter>
  );
}

// ------------------------------
// STYLES
// ------------------------------
const styles = StyleSheet.create({
  tabBar: {
    height: 62,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 8,
    paddingBottom: 6,
    paddingTop: 6,
  },
  tabButton: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: theme.colors.muted,
  },
});
