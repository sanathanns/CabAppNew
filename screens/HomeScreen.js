import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";

import { MapComponent } from "../components/MapComponent";
import { RecentLocations } from "../components/RecentLocations";
import { RideOptionsCard } from "../components/RideOptionsCard";
import { DriverCard } from "../components/DriverCard";

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
      <View style={[isWeb ? styles.webWrap : styles.mobileWrap, { width }]}>

        {/* MAP */}
        <View style={styles.mapWrap}>
          <MapComponent
            style={{ borderRadius: 14 }}
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

          {/* SEARCH BAR */}
          <View style={styles.search}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              onPress={() => navigate("/search?type=pickup")}
            >
              <Ionicons name="navigate" size={18} color={theme.colors.muted} />
              <Text style={styles.searchText}>
                {pickup ? `Pickup: ${pickup.split(",")[0]}` : "Select Pickup"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filter}
              onPress={() => navigate("/search?type=destination")}
            >
              <Ionicons name="location" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTTOM CONTENT */}
        <View style={styles.content}>
          <RecentLocations
            onSelect={() => navigate("/search?type=destination")}
          />

          {/* Suggested Ride Category Buttons */}
          <View style={{ marginTop: 18 }}>
            <Text style={styles.subHeading}>Suggested</Text>

            <View style={styles.suggestRow}>
              {["Economy", "Premium", "SUV"].map((ride) => (
                <TouchableOpacity
                  key={ride}
                  style={styles.sCard}
                  onPress={() => setShowRide(true)}
                >
                  <Text style={styles.sCardTitle}>{ride}</Text>
                  <Text style={styles.sCardSub}>₹120 • 3-5m</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Nearby Driver Preview */}
          <View style={{ marginTop: 18 }}>
            <Text style={styles.subHeading}>Nearby Driver</Text>
            <View style={{ marginTop: 12 }}>
              <DriverCard />
            </View>
          </View>
        </View>
      </View>

      {/* RIDE OPTIONS SHEET */}
      <RideOptionsCard visible={showRide} onClose={() => setShowRide(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center"
  },
  webWrap: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden"
  },
  mobileWrap: { flex: 1 },

  mapWrap: {
    height: Platform.OS === "web" ? 300 : 380,
    width: "100%",
    backgroundColor: "#EAF6FF"
  },

  search: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 6
  },

  searchText: {
    marginLeft: 10,
    color: theme.colors.muted,
    fontWeight: "700"
  },

  filter: {
    marginLeft: 12,
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  content: { padding: 16 },

  subHeading: { fontWeight: "800", color: theme.colors.text },

  suggestRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between"
  },

  sCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    width: 150,
    elevation: 3
  },

  sCardTitle: {
    fontWeight: "800",
    fontSize: 14
  },

  sCardSub: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 4
  }
});
