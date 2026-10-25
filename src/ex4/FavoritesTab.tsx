import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { colors } from "../theme";
import { ProductRow } from "./ProductRow";
import { useFavorites } from "./FavoritesContext";
import type { TabProps } from "./types";

// TODO 8
export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favorites = PHONES.filter((p) => ids.includes(p.id));

  if (favorites.length === 0) {
    return (
      <View style={s.center}>
        <Text style={s.empty}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={favorites}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  empty: { fontSize: 15, color: colors.muted },
});
