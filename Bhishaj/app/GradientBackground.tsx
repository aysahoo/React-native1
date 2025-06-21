import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface GradientBackgroundProps {
  children: ReactNode;
}

const GradientBackground = ({ children }: GradientBackgroundProps) => {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;

  const gradientColors = isDark 
    ? ['#1e293b', '#0f172a'] 
    : ['#ddd6fe', '#ffedd5'];

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default GradientBackground; 