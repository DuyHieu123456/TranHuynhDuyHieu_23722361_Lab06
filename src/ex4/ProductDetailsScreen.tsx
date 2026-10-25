import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { formatPrice, colors } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // TODO 4
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  // TODO 5
  if (!phone) {
    return (
      <View style={s.center}>
        <Text style={s.empty}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);
  return (
    <View style={s.root}>
      {/* TODO 6 */}
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={s.image}
        resizeMode="contain"
      />
      <Text style={s.name}>{phone.name}</Text>
      <View style={s.row}>
        <Stars value={phone.rating} />
        <Text>(Xem {phone.reviewCount} đánh giá)</Text>
      </View>
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text style={s.supplier}>
        Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text>
      </Text>

      {/* TODO 7 */}
      <Pressable style={s.favBtn} onPress={() => toggle(phone.id)}>
        <Text style={s.favText}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", padding: 16, gap: 8 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  empty: { fontSize: 15, color: colors.muted },
  image: { width: "100%", height: 280 },
  name: { fontSize: 16, color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  price: { fontSize: 18, fontWeight: "700", color: colors.text },
  supplier: { fontSize: 14, color: colors.text },
  bold: { fontWeight: "700" },
  favBtn: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  favText: { color: colors.red, fontWeight: "700", fontSize: 15 },
});
