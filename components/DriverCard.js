import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-native";

export function DriverCard({ driver, price, eta }) {
  const navigate = useNavigate();

  // Default driver mock (if nothing passed)
  const d = driver || {
    name: "Ravi Kumar",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=12",
    carModel: "Hyundai Verna",
    carColor: "Silver",
    plate: "KA05 AB 1234",
    distance: "2.4 km"
  };

  const ridePrice = price || "₹180";
  const arrivalTime = eta || "4-6 min";

  function proceedToBooking() {
    const params = new URLSearchParams();
    params.set("driver", d.name);
    params.set("car", d.carModel);
    params.set("price", ridePrice);

    navigate(`/booking?${params.toString()}`);
  }

  return (
    <View style={styles.card}>
      
      {/* DRIVER IMAGE */}
      <Image source={{ uri: d.image }} style={styles.avatar} />

      {/* INFO BLOCK */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name}>{d.name}</Text>
        <Text style={styles.details}>
          ⭐ {d.rating} • {arrivalTime}
        </Text>

        <Text style={styles.carText}>
          {d.carModel} ({d.carColor})
        </Text>

        <Text style={styles.plate}>Plate: {d.plate}</Text>
      </View>

      {/* RIGHT SIDE BLOCK */}
      <View style={styles.right}>
        <Text style={styles.price}>{ridePrice}</Text>

        <TouchableOpacity style={styles.bookBtn} onPress={proceedToBooking}>
          <Text style={styles.bookText}>Book</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    width: "100%"
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 16
  },
  name: {
    fontSize: 17,
    fontWeight: "800",
    color: theme.colors.text
  },
  details: {
    marginTop: 4,
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "600"
  },
  carText: {
    marginTop: 4,
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 14
  },
  plate: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 2
  },
  right: {
    alignItems: "flex-end"
  },
  price: {
    fontSize: 18,
    fontWeight: "900",
    color: theme.colors.primary
  },
  bookBtn: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10
  },
  bookText: {
    color: "#fff",
    fontWeight: "800"
  }
});
