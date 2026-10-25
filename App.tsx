import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SelectPhoneLocal } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";

type Exercise = 1 | 2 | 3 | 4 | 5;

const MENU: { id: Exercise; title: string; desc: string }[] = [
  { id: 1, title: "Bài 1 — Select Phone", desc: "Stack, truyền params, trả kết quả về Product" },
  { id: 2, title: "Bài 2 — Select Phone + API", desc: "fetch, loading / lỗi / thử lại (mockapi.io)" },
  { id: 3, title: "Bài 3 — Bottom Tab", desc: "Home / Search / Profile + Ionicons" },
  { id: 4, title: "Bài 4 — Stack + Tab + Params", desc: "ProductDetails {id} + Favorites Context" },
  { id: 5, title: "Bài 5 — Drawer", desc: "Home / Profile / Settings + Switch" },
];

function ExerciseScreen({ id }: { id: Exercise }) {
  switch (id) {
    case 1:
      return <SelectPhoneLocal />;
    case 2:
      return <SelectPhoneApi />;
    case 3:
      return <BottomTabApp />;
    case 4:
      return <StackTabApp />;
    case 5:
      return <DrawerApp />;
  }
}

export default function App() {
  const [exercise, setExercise] = useState<Exercise | null>(null);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {exercise === null ? (
        <SafeAreaView style={styles.root}>
          <Text style={styles.h1}>Lab 06 — Navigation</Text>
          <Text style={styles.sub}>Chọn một bài để mở:</Text>
          <View style={styles.list}>
            {MENU.map((m) => (
              <Pressable
                key={m.id}
                style={styles.item}
                onPress={() => setExercise(m.id)}
              >
                <Text style={styles.itemTitle}>{m.title}</Text>
                <Text style={styles.itemDesc}>{m.desc}</Text>
              </Pressable>
            ))}
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.root}>
          <SafeAreaView edges={["top"]} style={styles.bar}>
            <Pressable onPress={() => setExercise(null)}>
              <Text style={styles.back}>{"← Menu"}</Text>
            </Pressable>
            <Text style={styles.barTitle}>
              {MENU.find((m) => m.id === exercise)?.title}
            </Text>
          </SafeAreaView>
          <View style={{ flex: 1 }}>
            <ExerciseScreen id={exercise} />
          </View>
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  h1: { fontSize: 22, fontWeight: "700", color: colors.text, paddingHorizontal: 16, paddingTop: 12 },
  sub: { fontSize: 14, color: colors.muted, paddingHorizontal: 16, paddingTop: 4 },
  list: { padding: 16, gap: 12 },
  item: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 14,
    gap: 4,
    backgroundColor: colors.bg,
  },
  itemTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  itemDesc: { fontSize: 13, color: colors.muted },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    backgroundColor: "#fff",
  },
  back: { fontSize: 15, fontWeight: "700", color: colors.blue },
  barTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
});
