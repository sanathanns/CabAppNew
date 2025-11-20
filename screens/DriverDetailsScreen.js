import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useParams, useLocation, useNavigate } from "react-router-native";
import { theme } from "../styles/theme";

export function DriverDetailsScreen() {
  const { rideId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const q = new URLSearchParams(location.search);

  /* ---------------------------
     READ ALL DATA COMING FROM:
     - SearchScreen
     - RideOptionsCard
  ----------------------------- */

  const pickup = q.get("pickup") || "Pickup";
  const destination = q.get("destination") || "Destination";

  const pickupLat = q.get("pickupLat");
  const pickupLon = q.get("pickupLon");
  const destLat = q.get("destLat");
  const destLon = q.get("destLon");

  const rideName = q.get("rideName") || "Ride Option";
  const eta = q.get("eta") || "5–10 min";
  const price = q.get("price") || "₹120";

  const carModel = q.get("carModel") || "Car Model";
  const carColor = q.get("carColor") || "Color";
  const carImage = q.get("carImage");

  const driverName = q.get("driverName") || "Driver";
  const driverRating = q.get("driverRating") || "4.8";
  const driverImg = q.get("driverImg");

  /* -------------------------
      CONFIRM RIDE ACTION
  --------------------------- */
  function confirmRide() {
    const params = new URLSearchParams();
    params.set("pickup", pickup);
    params.set("destination", destination);
    params.set("driver", driverName);
    params.set("price", price);
    params.set("eta", eta);

    navigate(`/booking?${params.toString()}`);
  }

  return (
    <ScrollView style={styles.container}>
      
      {/* DRIVER IMAGE */}
      <Image source={{ uri: driverImg }} style={styles.avatar} />

      {/* DRIVER NAME */}
      <Text style={styles.name}>{driverName}</Text>
      <Text style={styles.rating}>⭐ {driverRating} / 5.0</Text>

      {/* CAR DETAILS CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Vehicle Details</Text>

        {carImage ? (
          <Image source={{ uri: carImage }} style={styles.carImage} />
        ) : null}

        <Text style={styles.detailText}>{carModel} ({carColor})</Text>
        <Text style={styles.detailText}>Ride Type: {rideName}</Text>
        <Text style={styles.detailText}>ETA: {eta}</Text>
      </View>

      {/* TRIP DETAILS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trip Information</Text>

        <Text style={styles.tripLine}>Pickup:</Text>
        <Text style={styles.detailText}>{pickup}</Text>

        <Text style={styles.tripLine}>Destination:</Text>
        <Text style={styles.detailText}>{destination}</Text>

        <Text style={styles.detailText}>Coordinates:</Text>
        <Text style={styles.coords}>
          {pickupLat}, {pickupLon} → {destLat}, {destLon}
        </Text>
      </View>

      {/* FARE DETAILS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fare Summary</Text>

        <View style={styles.fareRow}>
          <Text style={styles.fareLabel}>Estimated Fare</Text>
          <Text style={styles.farePrice}>{price}</Text>
        </View>
      </View>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity style={styles.bookBtn} onPress={confirmRide}>
        <Text style={styles.bookText}>Confirm Ride</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ======================================
                STYLES
   ====================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: theme.colors.background
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 22,
    alignSelf: "center",
    marginTop: 12
  },

  name: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 10,
    color: theme.colors.text
  },

  rating: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.muted
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    marginTop: 20
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
    color: theme.colors.text
  },

  carImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    resizeMode: "contain",
    marginBottom: 10
  },

  detailText: {
    fontSize: 14,
    color: theme.colors.muted,
    marginTop: 4,
    fontWeight: "600"
  },

  tripLine: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "800",
    color: theme.colors.text
  },

  coords: {
    marginTop: 4,
    color: theme.colors.muted,
    fontSize: 12
  },

  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  fareLabel: {
    fontWeight: "800",
    fontSize: 16
  },

  farePrice: {
    fontWeight: "900",
    fontSize: 18,
    color: theme.colors.primary
  },

  bookBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    marginTop: 22,
    borderRadius: 14,
    alignItems: "center"
  },

  bookText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900"
  }
});
