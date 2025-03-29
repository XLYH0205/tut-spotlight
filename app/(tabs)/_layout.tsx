import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.grey,
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopWidth: 0,
                    elevation: 0,
                    position: 'absolute',
                    height: 40,
                    paddingBottom: 8
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,

                }} />
            <Tabs.Screen
                name="bookmarks"
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="bookmark" size={size} color={color} />,

                }} />
            <Tabs.Screen
                name="create"
                options={{
                    tabBarIcon: ({ size }) => <Ionicons name="add-circle" size={size} color={COLORS.primary} />,

                }} />
            <Tabs.Screen name="notifications"
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,

                }} />
            <Tabs.Screen name="profile"
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />,

                }} />
        </Tabs>
    )
}