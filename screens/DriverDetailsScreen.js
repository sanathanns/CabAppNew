import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useParams, useLocation, useNavigate } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";
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
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigate(-1)}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* DRIVER PROFILE CARD */}
      <View style={styles.profileCard}>
        <Image source={{ uri: driverImg }} style={styles.avatar} />
        <Text style={styles.name}>{driverName}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{driverRating}</Text>
          <Text style={styles.ratingLabel}> • Excellent driver</Text>
        </View>
      </View>

      {/* CAR DETAILS CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          <Ionicons name="car-sport" size={20} color={theme.colors.primary} /> Vehicle
        </Text>

        {carImage ? (
          <Image source={{ uri: carImage }} style={styles.carImage} />
        ) : null}

        <View style={styles.infoRow}>
          <Text style={styles.label}>Model</Text>
          <Text style={styles.value}>{carModel}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Color</Text>
          <Text style={styles.value}>{carColor}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{rideName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Arrives in</Text>
          <Text style={[styles.value, { color: theme.colors.primary }]}>{eta}</Text>
        </View>
      </View>

      {/* TRIP DETAILS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          <Ionicons name="location" size={20} color={theme.colors.primary} /> Trip Route
        </Text>

        <View style={styles.routeContainer}>
          <View style={styles.routePoint}>
            <View style={styles.pickupDot} />
            <View>
              <Text style={styles.routeLabel}>Pickup</Text>
              <Text style={styles.routeAddress}>{pickup.split(",")[0]}</Text>
              <Text style={styles.coordsText}>{pickupLat}, {pickupLon}</Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.routePoint}>
            <View style={styles.dropDot} />
            <View>
              <Text style={styles.routeLabel}>Drop-off</Text>
              <Text style={styles.routeAddress}>{destination.split(",")[0]}</Text>
              <Text style={styles.coordsText}>{destLat}, {destLon}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* FARE DETAILS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          <Ionicons name="receipt" size={20} color={theme.colors.primary} /> Fare Summary
        </Text>

        <View style={styles.fareRow}>
          <Text style={styles.fareLabel}>Base Fare</Text>
          <Text style={styles.fareValue}>{price}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.fareRow}>
          <Text style={styles.fareTotalLabel}>Total Amount</Text>
          <Text style={styles.fareTotalValue}>{price}</Text>
        </View>
      </View>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity style={styles.bookBtn} onPress={confirmRide} activeOpacity={0.9}>
        <Text style={styles.bookText}>Confirm Ride</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
    </SafeAreaView>
  );
}

/* ======================================
                STYLES
   ====================================== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text
  },

  container: {
    flex: 1,
    padding: 20
  },

  profileCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    marginBottom: 16,
    ...theme.shadows.medium
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 14,
    borderWidth: 3,
    borderColor: theme.colors.primaryLight
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 8,
    letterSpacing: -0.5
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full
  },

  rating: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginLeft: 4
  },

  ratingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textLight
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: theme.borderRadius.lg,
    marginBottom: 14,
    ...theme.shadows.small
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 16,
    color: theme.colors.text
  },

  carImage: {
    width: "100%",
    height: 140,
    borderRadius: theme.borderRadius.md,
    resizeMode: "contain",
    marginBottom: 16,
    backgroundColor: theme.colors.background
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.muted
  },

  value: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text
  },

  routeContainer: {
    paddingVertical: 8
  },

  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    marginRight: 14,
    marginTop: 4
  },

  dropDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: theme.colors.danger,
    marginRight: 14,
    marginTop: 4
  },

  routeLine: {
    width: 2,
    height: 32,
    backgroundColor: theme.colors.border,
    marginLeft: 5,
    marginVertical: 8
  },

  routeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.muted,
    marginBottom: 4,
    textTransform: 'uppercase'
  },

  routeAddress: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4
  },

  coordsText: {
    fontSize: 11,
    color: theme.colors.muted,
    fontWeight: '500'
  },

  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },

  fareLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: theme.colors.textLight
  },

  fareValue: {
    fontWeight: "700",
    fontSize: 14,
    color: theme.colors.text
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8
  },

  fareTotalLabel: {
    fontWeight: "800",
    fontSize: 16,
    color: theme.colors.text
  },

  fareTotalValue: {
    fontWeight: "800",
    fontSize: 18,
    color: theme.colors.primary
  },

  bookBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    marginTop: 8,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    ...theme.shadows.medium
  },

  bookText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800"
  }
});
