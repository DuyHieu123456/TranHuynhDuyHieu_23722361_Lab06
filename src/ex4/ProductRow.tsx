import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Phone } from "../types";
import { formatPrice, colors } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";

export function ProductRow({
  phone,
  onPress,
}: {
  phone: Phone;
  onPress: () => void;
}) {
  const { has } = useFavorites();
  return (
    <Pressable style={s.row} onPress={onPress}>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={s.name}>{phone.name.split(" - ")[0]}</Text>
        <Stars value={phone.rating} size={13} />
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
      </View>
      <Text style={s.heart}>{has(phone.id) ? "♥" : "♡"}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 14,
    gap: 10,
  },
  name: { fontSize: 15, color: colors.text },
  price: { fontSize: 14, fontWeight: "700", color: colors.red },
  heart: { fontSize: 20, color: colors.red },
});
