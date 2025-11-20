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
      <View style={styles.header}>
        <Text style={styles.title}>
          {type === "pickup" ? "Pickup Location" : "Drop Location"}
        </Text>
        <Text style={styles.subtitle}>Search for a location in India</Text>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={theme.colors.primary} />
        <TextInput
          style={styles.input}
          placeholder="Search location..."
          placeholderTextColor={theme.colors.muted}
          value={query}
          onChangeText={searchLocation}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        )}
      </View>

      {/* LOADING */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {/* RESULTS */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => selectPlace(item)}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={22} color="#fff" />
            </View>

            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.itemTitle}>{item.name.split(",")[0]}</Text>
              <Text style={styles.itemSub} numberOfLines={2}>{item.name}</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() =>
          query.length > 2 && !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color={theme.colors.muted} />
              <Text style={styles.noResult}>No results found</Text>
              <Text style={styles.noResultSub}>Try a different search term</Text>
            </View>
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
  safe: { 
    flex: 1, 
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#fff'
  },

  header: {
    marginBottom: 24
  },

  title: { 
    fontSize: 28, 
    fontWeight: "900", 
    color: theme.colors.text,
    letterSpacing: -0.5,
    marginBottom: 8
  },

  subtitle: {
    fontSize: 15,
    color: theme.colors.muted,
    fontWeight: '700'
  },

  searchBar: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: theme.colors.border
  },

  input: {
    marginLeft: 14,
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '700'
  },

  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center'
  },

  item: {
    flexDirection: "row",
    padding: 18,
    backgroundColor: theme.colors.background,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.border
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },

  itemTitle: { 
    fontWeight: "800", 
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 5,
    letterSpacing: -0.3
  },

  itemSub: { 
    color: theme.colors.muted, 
    fontSize: 14,
    fontWeight: '600'
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80
  },

  noResult: { 
    textAlign: "center", 
    marginTop: 20, 
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800'
  },

  noResultSub: {
    textAlign: "center", 
    marginTop: 8, 
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: '600'
  }
});
