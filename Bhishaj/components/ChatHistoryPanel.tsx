import React from 'react';
import { View, Text, Pressable, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message, ChatSession } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface ChatHistoryPanelProps {
  isHistoryOpen: boolean;
  historyPanelAnim: Animated.Value;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onToggleHistoryPanel: () => void;
  onSwitchActiveSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

const ChatHistoryPanel: React.FC<ChatHistoryPanelProps> = ({
  isHistoryOpen,
  historyPanelAnim,
  sessions,
  activeSessionId,
  onToggleHistoryPanel,
  onSwitchActiveSession,
  onDeleteSession,
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;

  if (!isHistoryOpen) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      <Pressable 
        style={{ flex: 1 }}
        onPress={onToggleHistoryPanel}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 100,
            left: 16,
            width: 300,
            maxHeight: 320,
            backgroundColor: colors.surface,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.primaryBorder,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 10,
            opacity: historyPanelAnim,
            transform: [
              {
                scale: historyPanelAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          }}
          onStartShouldSetResponder={() => true}
          onResponderGrant={() => {}}
          onResponderRelease={() => {}}
        >
          <View style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}>
            <Text style={{
              fontFamily: 'Cormorant-SemiBold',
              fontSize: 20,
              color: colors.textPrimary,
            }}>Chat History</Text>
          </View>
          <View style={{ height: 220 }}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ 
                paddingVertical: 2, 
                minHeight: '100%',
                backgroundColor: 'transparent'
              }}
              nestedScrollEnabled={true}
              scrollEnabled={true}
              bounces={true}
              scrollEventThrottle={16}
              decelerationRate="normal"
              style={{ flex: 1 }}
            >
              <View style={{ minHeight: '100%', backgroundColor: 'transparent' }}>
                {sessions.map((item) => (
                  <View key={item.id} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 8,
                    marginHorizontal: 12,
                    marginVertical: 2,
                    borderRadius: 8,
                    borderWidth: 1,
                    backgroundColor: activeSessionId === item.id ? colors.primaryLight : colors.surfaceSecondary,
                    borderColor: activeSessionId === item.id ? colors.primaryBorder : colors.borderLight,
                  }}>
                    <Pressable
                      onPress={() => onSwitchActiveSession(item.id)}
                      style={{ flex: 1 }}
                    >
                      <Text style={{
                        color: colors.textPrimary,
                        fontWeight: '500',
                        fontSize: 16,
                      }} numberOfLines={1}>{item.title}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => onDeleteSession(item.id)}
                      style={{
                        marginLeft: 8,
                        padding: 8,
                        borderRadius: 20,
                        backgroundColor: colors.error + '20',
                      }}
                    >
                      <Ionicons name="trash-outline" size={16} color={colors.error} />
                    </Pressable>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default ChatHistoryPanel; 