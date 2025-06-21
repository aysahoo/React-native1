import React, { useRef, useEffect, useState } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOCUS_OPTIONS = [
  { name: 'Search', icon: 'search' },
  { name: 'Symptoms Checker', icon: 'pulse' },
];

interface TabBarProps {
  activeFocus: string;
  onTabSwitch: (tabName: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeFocus, onTabSwitch }) => {
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const tabBarRef = useRef<View>(null);

  // Initialize animation value to start at Search tab (index 0)
  useEffect(() => {
    slideAnim.setValue(0);
  }, []);

  // Calculate tab width when tabBarWidth changes
  const tabWidth = tabBarWidth > 0 ? tabBarWidth / FOCUS_OPTIONS.length : 0;

  const handleTabSwitch = (tabName: string) => {
    const tabIndex = FOCUS_OPTIONS.findIndex(option => option.name === tabName);
    if (tabIndex !== -1) {
      Animated.spring(slideAnim, {
        toValue: tabIndex,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start();
      onTabSwitch(tabName);
    }
  };

  return (
    <View 
      ref={tabBarRef}
      className="flex-row bg-gray-200/60 rounded-lg p-1 relative"
      style={{ width: 120 }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        if (width > 0) {
          setTabBarWidth(width);
        }
      }}
    >
      {/* Animated sliding highlight */}
      {tabWidth > 0 && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            width: tabWidth - 4,
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#a28ff9',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, tabWidth],
                }),
              },
            ],
          }}
        />
      )}
      {FOCUS_OPTIONS.map(option => (
        <Pressable 
          key={option.name} 
          onPress={() => handleTabSwitch(option.name)}
          className="p-2 rounded-md flex-1 items-center justify-center"
          style={{ minHeight: 36 }}
        >
          <Ionicons 
            name={option.icon as any} 
            size={20} 
            color={activeFocus === option.name ? '#a28ff9' : '#6b7280'} 
          />
        </Pressable>
      ))}
    </View>
  );
};

export default TabBar; 