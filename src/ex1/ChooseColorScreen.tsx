import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { formatPrice, colors } from "../theme";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {/* TODO 3: chỉ hiện khi đã chọn màu */}
          {picked !== undefined && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={[styles.small, styles.bold]}>
                {formatPrice(phone.price)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: nút XONG, trả màu đã chọn về Product (merge) */}
        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate("Product", { color: picked }, { merge: true })
          }
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  thumb: { width: 110, height: 140 },
  headerText: { flex: 1, gap: 3, paddingTop: 4 },
  small: { fontSize: 14, color: colors.text },
  bold: { fontWeight: "700" },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16, gap: 14 },
  hint: { fontSize: 15, color: colors.text },
  swatches: { gap: 14 },
  swatch: { height: 64, borderRadius: 4 },
  swatchOn: { borderWidth: 3, borderColor: colors.navy },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 6,
  },
  doneText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
