import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../GradientBackground';
import { useTheme } from '../../contexts/ThemeContext';
import { lightColors, darkColors } from '../../constants/colors';

const Profile = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 20 }}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Ionicons name="person" size={50} color="white" />
            </View>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: colors.textPrimary,
              marginBottom: 8,
            }}>
              Anshuman
            </Text>
            <Text style={{
              fontSize: 16,
              color: colors.textSecondary,
            }}>
              Health Assistant User
            </Text>
          </View>

          {/* Settings Section */}
          <View style={{
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.textPrimary,
              marginBottom: 16,
            }}>
              Settings
            </Text>

            {/* Dark Mode Toggle */}
            <Pressable
              onPress={toggleTheme}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons 
                  name={isDark ? "moon" : "sunny"} 
                  size={24} 
                  color={colors.primary} 
                />
                <Text style={{
                  marginLeft: 12,
                  fontSize: 16,
                  color: colors.textPrimary,
                }}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
              <View style={{
                width: 48,
                height: 24,
                borderRadius: 12,
                backgroundColor: isDark ? colors.primary : colors.border,
                alignItems: isDark ? 'flex-end' : 'flex-start',
                padding: 2,
              }}>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: 'white',
                }} />
              </View>
            </Pressable>
          </View>

          {/* App Info */}
          <View style={{
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 16,
            padding: 20,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.textPrimary,
              marginBottom: 16,
            }}>
              App Information
            </Text>
            
            <View style={{ marginBottom: 12 }}>
              <Text style={{
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: 4,
              }}>
                Version
              </Text>
              <Text style={{
                fontSize: 16,
                color: colors.textPrimary,
              }}>
                1.0.0
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: 4,
              }}>
                Current Theme
              </Text>
              <Text style={{
                fontSize: 16,
                color: colors.textPrimary,
              }}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default Profile;