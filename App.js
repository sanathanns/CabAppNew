// App.js (React Router + Bottom Tabs + Proper Fullscreen Routing)
import React from "react";
import { SafeAreaView, StatusBar, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { NativeRouter, Routes, Route, useNavigate, useLocation } from "react-router-native";
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
// Bottom Tabs Wrapper (No bottom navigation bar)
// ------------------------------
function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/activity" element={<ActivityScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
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
const styles = StyleSheet.create({});
