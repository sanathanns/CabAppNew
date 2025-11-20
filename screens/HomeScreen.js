import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar,
  ScrollView
} from "react-native";

import { MapComponent } from "../components/MapComponent";
import { RecentLocations } from "../components/RecentLocations";
import { RideOptionsCard } from "../components/RideOptionsCard";
import { DriverCard } from "../components/DriverCard";
import { SideMenu } from "../components/SideMenu";

import { theme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocation, useNavigate } from "react-router-native";

export function HomeScreen() {
  const navigate = useNavigate();
  const locationState = useLocation();

  const params = new URLSearchParams(locationState.search);

  const pickupParam = params.get("pickup");
  const destParam = params.get("destination");
  const trigger = params.get("trigger");

  const pickupLat = params.get("pickupLat");
  const pickupLon = params.get("pickupLon");
  const destLat = params.get("destLat");
  const destLon = params.get("destLon");

  const [pickup, setPickup] = useState(pickupParam);
  const [destination, setDestination] = useState(destParam);
  const [showRide, setShowRide] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const isWeb = Platform.OS === "web";
  const width = isWeb ? Math.min(520, Dimensions.get("window").width - 40) : "100%";

  // -----------------------------------------------------------
  // AUTO OPEN RIDE SHEET WHEN BOTH LOCATIONS SELECTED
  // -----------------------------------------------------------
  useEffect(() => {
    if (pickupParam && destParam && trigger === "rides") {
      setShowRide(true);
    }
  }, [pickupParam, destParam, trigger]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={[isWeb ? styles.webWrap : styles.mobileWrap, { width }]}>

        {/* MAP */}
        <View style={styles.mapWrap}>
          <MapComponent
            style={{ borderRadius: 0 }}
            region={
              pickupLat && pickupLon
                ? {
                    latitude: parseFloat(pickupLat),
                    longitude: parseFloat(pickupLon),
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                  }
                : null
            }
          />

          {/* TOP BAR WITH MENU AND SEARCH */}
          <View style={styles.topOverlay}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setMenuVisible(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="menu" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchBar}
              onPress={() => navigate("/search?type=pickup")}
              activeOpacity={0.9}
            >
              <View style={styles.searchContent}>
                <Text style={styles.searchLabel}>WHERE TO?</Text>
                {pickup || destination ? (
                  <View style={styles.locationRow}>
                    {pickup && (
                      <Text style={styles.locationText} numberOfLines={1}>
                        {pickup.split(",")[0]}
                      </Text>
                    )}
                    {pickup && destination && (
                      <Text style={styles.separator}> → </Text>
                    )}
                    {destination && (
                      <Text style={styles.locationText} numberOfLines={1}>
                        {destination.split(",")[0]}
                      </Text>
                    )}
                  </View>
                ) : (
                  <Text style={styles.searchPlaceholder}>Select pickup and destination</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => navigate("/search?type=destination")}
                activeOpacity={0.8}
              >
                <Ionicons name="search" size={20} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTTOM CONTENT - SCROLLABLE */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* SAVED PLACES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Places</Text>
            <RecentLocations
              onSelect={() => navigate("/search?type=destination")}
            />
          </View>

          {/* QUICK BOOK */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Book</Text>
            <Text style={styles.sectionSubtitle}>Choose your ride type</Text>

            <View style={styles.quickBookRow}>
              {[
                { name: "Auto", price: "₹80", icon: "bicycle", color: "#10B981" },
                { name: "Sedan", price: "₹120", icon: "car", color: "#3B82F6" },
                { name: "SUV", price: "₹250", icon: "car-sport", color: "#8B5CF6" }
              ].map((ride) => (
                <TouchableOpacity
                  key={ride.name}
                  style={styles.quickBookCard}
                  onPress={() => setShowRide(true)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.quickBookIcon, { backgroundColor: ride.color }]}>
                    <Ionicons name={ride.icon} size={28} color="#fff" />
                  </View>
                  <Text style={styles.quickBookName}>{ride.name}</Text>
                  <Text style={styles.quickBookPrice}>{ride.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* NEARBY DRIVER */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nearby Driver</Text>
            <DriverCard />
          </View>
        </ScrollView>
      </View>

      {/* RIDE OPTIONS SHEET */}
      <RideOptionsCard visible={showRide} onClose={() => setShowRide(false)} />

      {/* SIDE MENU */}
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  webWrap: {
    flex: 1,
    alignSelf: "center",
    maxWidth: 600
  },
  mobileWrap: { 
    flex: 1 
  },

  mapWrap: {
    height: 300,
    width: "100%",
    backgroundColor: "#EFF6FF",
    position: 'relative'
  },

  topOverlay: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 10
  },

  menuBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8
      },
      android: {
        elevation: 4
      }
    })
  },

  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8
      },
      android: {
        elevation: 4
      }
    })
  },

  searchContent: {
    flex: 1
  },

  searchLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  locationText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
    maxWidth: 150
  },

  separator: {
    fontSize: 12,
    color: '#9CA3AF'
  },

  searchPlaceholder: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "400"
  },

  searchIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },

  content: { 
    flex: 1,
    backgroundColor: '#F9FAFB'
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20
  },

  section: {
    marginBottom: 24
  },

  sectionTitle: { 
    fontWeight: "700", 
    fontSize: 18,
    color: "#111827",
    marginBottom: 4
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: '500',
    marginBottom: 12
  },

  quickBookRow: {
    flexDirection: "row",
    gap: 12
  },

  quickBookCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8
      },
      android: {
        elevation: 3
      }
    })
  },

  quickBookIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },

  quickBookName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
    marginBottom: 4
  },

  quickBookPrice: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: '500'
  }
});
