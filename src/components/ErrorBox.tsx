import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Đã xảy ra lỗi</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 17, fontWeight: "700", color: colors.text },
  message: { fontSize: 14, color: colors.muted, textAlign: "center" },
  button: { backgroundColor: colors.red, borderRadius: 6, paddingHorizontal: 22, paddingVertical: 10, marginTop: 6 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
