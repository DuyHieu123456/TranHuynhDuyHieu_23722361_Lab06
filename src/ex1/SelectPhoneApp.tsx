import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { PHONES } from "../data/phones";
import { ProductScreen } from "./ProductScreen";
import { ChooseColorScreen } from "./ChooseColorScreen";

export type SelectPhoneParamList = {
  Product: { color?: ColorKey } | undefined;
  ChooseColor: { color?: ColorKey } | undefined;
};

const Stack = createNativeStackNavigator<SelectPhoneParamList>();

export function SelectPhoneApp({ phone }: { phone: Phone }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Product">
          {(props) => <ProductScreen {...props} phone={phone} />}
        </Stack.Screen>
        <Stack.Screen name="ChooseColor">
          {(props) => <ChooseColorScreen {...props} phone={phone} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Bài 1 (dữ liệu local): gắn vào menu chỉ cần component này
export function SelectPhoneLocal() {
  return <SelectPhoneApp phone={PHONES[0]} />;
}
