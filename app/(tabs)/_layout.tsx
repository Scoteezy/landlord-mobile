import React, { useEffect } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Link, Tabs } from "expo-router";

import { Pressable } from "react-native";

import Colors from "@/constants/Colors";

import { useColorScheme } from "@/components/useColorScheme";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSession, updateSession } from "@/store/sessionSlice";
import { supabase } from "@/lib/supabase";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

function TabBarIcon(
  props: Readonly<{
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
  }>
) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const dispath = useAppDispatch();
  const session = useAppSelector((store) => store.session.session);
  useEffect(() => {
    dispath(fetchSession(""));

    supabase.auth.onAuthStateChange((_event, session) => {
      dispath(updateSession(session));
    });
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Личный кабинет",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: "О квартире",

          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="meters"
        options={{
          title: "Счетчики",

          tabBarIcon: ({ color }) => <TabBarIcon name="bolt" color={color} />,
        }}
      />
    </Tabs>
  );
}
