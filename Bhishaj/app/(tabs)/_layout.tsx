import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

const TAB_ICONS = {
  index: { active: 'home', inactive: 'home-outline', label: '' },
  discover: { active: 'grid', inactive: 'grid-outline', label: '' },
  reminder: { active: 'notifications', inactive: 'notifications-outline', label: '' },
  profile: { active: 'person', inactive: 'person-outline', label: '' },
} as const;

type TabKey = keyof typeof TAB_ICONS;

function isTabKey(key: string): key is TabKey {
  return key in TAB_ICONS;
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, idx) => {
        const focused = state.index === idx;
        const { options } = descriptors[route.key];
        const routeName = route.name as string;
        if (!isTabKey(routeName)) {
          // Fallback for unknown routes
          return (
            <Pressable key={route.key} style={styles.tabItem}>
              <Ionicons name="help-circle-outline" size={24} color="#94a3b8" />
            </Pressable>
          );
        }
        const iconName = focused ? TAB_ICONS[routeName].active : TAB_ICONS[routeName].inactive;
        const label = TAB_ICONS[routeName].label || options.title;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[
              styles.tabItem,
              focused && styles.tabItemActive,
            ]}
          >
            <View style={[
              focused ? styles.activeTabPill : styles.inactiveTab,
            ]}>
              <Ionicons
                name={iconName}
                size={26}
                color={focused ? '#799dfe' : '#94a3b8'}
              />
              {focused && label ? (
                <Text style={styles.activeLabel}>{label}</Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#d6cfc7',
    borderRadius: 0,
    width: '100%',
    height: 75,
    marginBottom:7,
    marginTop: 0,
    padding: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    elevation: 0,
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    zIndex: 1,
  },
  activeTabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'center',
    minWidth: 0,
  },
  inactiveTab: {
    padding: 0,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLabel: {
    marginLeft: 0,
    color: '#799dfe',
    fontWeight: '700',
    fontSize: 14,
  },
})

const _layout = () => {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="discover" options={{ title: '' }} />
      <Tabs.Screen name="index" options={{ title: '' }} />
      <Tabs.Screen name="reminder" options={{ title: '' }} />
      <Tabs.Screen name="profile" options={{ title: '' }} />
    </Tabs>
  )
}

export default _layout
