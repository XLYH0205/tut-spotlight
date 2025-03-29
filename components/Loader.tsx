
import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/theme'

export default function Loader() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.background,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    )
}