import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "О приложении" }}
      />
      <Stack.Screen
        name="changeModal"
        options={{ presentation: "modal", title: "Редактирование" }}
      />
      <Stack.Screen
        name="meterModal"
        options={{ presentation: "modal", title: "Редактирование" }}
      />
    </>
  );
};

export default Layout;
