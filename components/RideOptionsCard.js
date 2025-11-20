import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import { theme } from "../styles/theme";
import { useNavigate, useLocation } from "react-router-native";
import { RIDES } from "../data/rides";

export function RideOptionsCard({ visible, onClose }) {
  const navigate = useNavigate();
  const locationState = useLocation();

  const params = new URLSearchParams(locationState.search);

  const pickup = params.get("pickup") || "Pickup";
  const destination = params.get("destination") || "Destination";

  const pickupLat = params.get("pickupLat");
  const pickupLon = params.get("pickupLon");
  const destLat = params.get("destLat");
  const destLon = params.get("destLon");

  const [loading, setLoading] = useState(false);

  function book(ride) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const newParams = new URLSearchParams();

      newParams.set("rideName", ride.name);

      newParams.set("pickup", pickup);
      newParams.set("pickupLat", pickupLat);
      newParams.set("pickupLon", pickupLon);

      newParams.set("destination", destination);
      newParams.set("destLat", destLat);
      newParams.set("destLon", destLon);

      newParams.set("carModel", ride.carModel);
      newParams.set("carColor", ride.color);
      newParams.set("carImage", ride.image);

      newParams.set("driverName", ride.driverName);
      newParams.set("driverRating", ride.driverRating);
      newParams.set("driverImg", ride.driverImg);

      newParams.set("price", ride.price);
      newParams.set("eta", ride.eta);

      navigate(`/driver/${ride.id}?${newParams.toString()}`);

      onClose();
    }, 900);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.title}>Choose Your Ride</Text>
          <Text style={styles.subtitle}>
            {pickup.split(",")[0]} → {destination.split(",")[0]}
          </Text>

          <FlatList
            data={RIDES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
            renderItem={({ item }) => (
              <View style={styles.row}>
                {/* Ride Image */}
                <Image source={{ uri: item.image }} style={styles.rideImage} />

                {/* Ride Info */}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.rideName}>{item.name}</Text>
                  <Text style={styles.carModel}>{item.carModel}</Text>
                  <Text style={styles.details}>
                    ⭐ {item.rating} • {item.seats} seats
                  </Text>
                  <Text style={styles.eta}>Arrives in {item.eta}</Text>
                </View>

                {/* Driver + Price */}
                <View style={{ alignItems: "flex-end" }}>
                  <View style={styles.driverBox}>
                    <Image source={{ uri: item.driverImg }} style={styles.driverImg} />
                    <View style={{ marginLeft: 6 }}>
                      <Text style={styles.driverName}>{item.driverName}</Text>
                      <Text style={styles.driverRating}>⭐ {item.driverRating}</Text>
                    </View>
                  </View>

                  <Text style={styles.price}>{item.price}</Text>

                  <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() => book(item)}
                    disabled={loading}
                  >
                    <Text style={styles.bookText}>Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>Close</Text>
          </TouchableOpacity>

          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={{ marginTop: 10 }}>Finding nearest driver...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.40)"
  },
  sheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: Dimensions.get("window").height * 0.75,
    elevation: 12
  },
  handle: {
    width: 48,
    height: 6,
    backgroundColor: "#EAEAF3",
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 8
  },

  title: { fontSize: 20, fontWeight: "900", color: theme.colors.text },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    marginBottom: 14,
    marginTop: 4
  },

  row: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#FAFCFF",
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2
  },

  rideImage: { width: 75, height: 45, resizeMode: "contain" },
  rideName: { fontSize: 16, fontWeight: "900" },
  carModel: { color: theme.colors.muted, marginTop: 2 },

  details: { fontSize: 12, fontWeight: "700", color: theme.colors.text, marginTop: 4 },
  eta: { color: theme.colors.primary, marginTop: 4, fontWeight: "700" },

  driverBox: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  driverImg: { width: 40, height: 40, borderRadius: 10 },

  driverName: { fontSize: 12, fontWeight: "700" },
  driverRating: { color: theme.colors.muted, fontSize: 12, marginTop: 2 },

  price: { fontSize: 18, fontWeight: "900", marginTop: 6 },

  bookBtn: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12
  },
  bookText: { color: "#fff", fontWeight: "800", fontSize: 14 },

  close: { alignItems: "center", paddingVertical: 14 },

  loading: {
    position: "absolute",
    top: "38%",
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.97)",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 10
  }
});
