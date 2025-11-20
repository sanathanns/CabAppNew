import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export function SearchScreen() {
  const navigate = useNavigate();
  const locationState = useLocation();

  const q = new URLSearchParams(locationState.search);
  const type = q.get("type");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------------------------------
  // LIVE LOCATION SEARCH (Nominatim API)
  // ------------------------------
  async function searchLocation(text) {
    setQuery(text);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        text + " India"
      )}&addressdetails=1&limit=10`;

      const res = await fetch(url, {
        headers: { "User-Agent": "CabApp/1.0" }
      });

      const data = await res.json();

      const formatted = data.map((item) => ({
        name: item.display_name,
        lat: item.lat,
        lon: item.lon,
      }));

      setResults(formatted);
    } catch (e) {
      console.log("Search error:", e);
    }

    setLoading(false);
  }

  // ------------------------------
  // SELECT LOCATION
  // ------------------------------
  function selectPlace(item) {
    const params = new URLSearchParams(locationState.search);

    if (type === "pickup") {
      params.set("pickup", item.name);
      params.set("pickupLat", item.lat);
      params.set("pickupLon", item.lon);
    }

    if (type === "destination") {
      params.set("destination", item.name);
      params.set("destLat", item.lat);
      params.set("destLon", item.lon);
    }

    // ⭐ Auto-open ride options after selecting BOTH locations
    params.set("trigger", "rides");

    navigate(`/?${params.toString()}`);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>
        {type === "pickup" ? "Select Pickup Location" : "Select Destination"}
      </Text>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={theme.colors.muted} />
        <TextInput
          style={styles.input}
          placeholder="Search for a location"
          value={query}
          onChangeText={searchLocation}
        />
      </View>

      {/* LOADING */}
      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      {/* RESULTS */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => selectPlace(item)}>
            <Ionicons name="location" size={20} color={theme.colors.primary} />

            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.itemTitle}>{item.name.split(",")[0]}</Text>
              <Text style={styles.itemSub}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() =>
          query.length > 2 && !loading ? (
            <Text style={styles.noResult}>No results found</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

// ------------------------------
// STYLES
// ------------------------------
const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "900", marginBottom: 16 },

  searchBar: {
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  item: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#fafafa",
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },

  itemTitle: { fontWeight: "800", fontSize: 15 },
  itemSub: { color: "#666", fontSize: 12 },

  noResult: { textAlign: "center", marginTop: 20, color: "#777" },
});
