import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 12,
          paddingTop: 12,
          paddingHorizontal: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 15,
          borderRadius: 20,
          marginHorizontal: 16,
          marginBottom: 8,
          marginTop: 4,
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 6,
          letterSpacing: 0.5,
        },
        tabBarIconStyle: {
          marginBottom: 0,
          marginTop: 0,
        },
        tabBarItemStyle: {
          paddingHorizontal: 8,
          paddingVertical: 4,
        },
        headerShown: false,
      }}
    >
        <Tabs.Screen
        name="index"
        options={{
            title: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <View className={`p-2.5 rounded-xl ${focused ? 'bg-indigo-50 shadow-sm' : ''}`} style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
                shadowColor: focused ? '#6366f1' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: focused ? 0.2 : 0,
                shadowRadius: 4,
                elevation: focused ? 4 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 44,
                minHeight: 44,
              }}>
                <Ionicons 
                  name={focused ? 'home' : 'home-outline'} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
        }}
        />
        <Tabs.Screen
        name="discover"
        options={{
            title: 'Discover',
            tabBarIcon: ({ color, size, focused }) => (
              <View className={`p-2.5 rounded-xl ${focused ? 'bg-indigo-50 shadow-sm' : ''}`} style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
                shadowColor: focused ? '#6366f1' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: focused ? 0.2 : 0,
                shadowRadius: 4,
                elevation: focused ? 4 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 44,
                minHeight: 44,
              }}>
                <Ionicons 
                  name={focused ? 'compass' : 'compass-outline'} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
        }}
        />
        <Tabs.Screen
        name="reminder"
        options={{
            title: 'Reminder',
            tabBarIcon: ({ color, size, focused }) => (
              <View className={`p-2.5 rounded-xl ${focused ? 'bg-indigo-50 shadow-sm' : ''}`} style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
                shadowColor: focused ? '#6366f1' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: focused ? 0.2 : 0,
                shadowRadius: 4,
                elevation: focused ? 4 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 44,
                minHeight: 44,
              }}>
                <Ionicons 
                  name={focused ? 'notifications' : 'notifications-outline'} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
            title: 'Profile',
            tabBarIcon: ({ color, size, focused }) => (
              <View className={`p-2.5 rounded-xl ${focused ? 'bg-indigo-50 shadow-sm' : ''}`} style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
                shadowColor: focused ? '#6366f1' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: focused ? 0.2 : 0,
                shadowRadius: 4,
                elevation: focused ? 4 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 44,
                minHeight: 44,
              }}>
                <Ionicons 
                  name={focused ? 'person' : 'person-outline'} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
        }}
        />
    </Tabs>
  )
}

export default _layout