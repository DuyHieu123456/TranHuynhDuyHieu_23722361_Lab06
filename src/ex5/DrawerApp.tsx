import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return (
    <View style={s.center}>
      <Text style={s.big}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={s.big}>Nguyễn Văn An</Text>
      <Text style={s.muted}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1
function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <View style={s.settings}>
      <View style={s.row}>
        <Text style={s.label}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.row}>
        <Text style={s.label}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={s.status}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

const DRAWER_ICONS: Record<
  keyof DrawerParamList,
  keyof typeof Ionicons.glyphMap
> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

// TODO 2 (TODO 3 nâng cao — Context cho dark mode toàn app — không bắt buộc, chưa làm)
export function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerIcon: ({ color, size }) => (
            <Ionicons name={DRAWER_ICONS[route.name]} size={size} color={color} />
          ),
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Cá nhân" }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 16, backgroundColor: "#fff" },
  big: { fontSize: 22, fontWeight: "700", color: colors.text },
  muted: { fontSize: 14, color: colors.muted },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 30, fontWeight: "700" },
  settings: { flex: 1, backgroundColor: "#fff", padding: 16, gap: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  label: { fontSize: 16, color: colors.text },
  status: { fontSize: 14, color: colors.muted, marginTop: 8 },
});
