import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { formatPrice, colors } from "../theme";
import { Stars } from "../components/Stars";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.question}>
            <Text style={styles.questionText}>?</Text>
          </View>
        </View>

        {/* TODO 1: nút chọn màu / loại */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.chevron}>{">"}</Text>
        </Pressable>
      </View>

      {/* TODO 2: nút CHỌN MUA sát đáy */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingBottom: 12 },
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "82%", height: "92%" },
  info: { gap: 8, paddingBottom: 12 },
  name: { fontSize: 16, color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  review: { fontSize: 13, color: colors.text },
  price: { fontSize: 17, fontWeight: "700", color: colors.text },
  oldPrice: {
    fontSize: 14,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badge: { fontSize: 12, fontWeight: "700", color: colors.red },
  question: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.4,
    borderColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: { fontSize: 10, fontWeight: "700", color: colors.text },
  chooseBtn: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginTop: 4,
  },
  chooseText: { fontSize: 14, color: colors.text },
  chevron: {
    position: "absolute",
    right: 12,
    fontSize: 16,
    color: colors.text,
  },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingVertical: 13,
    alignItems: "center",
  },
  buyText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
