import React from 'react';
import { View, Text, Pressable, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ChatSession = {
  id: string;
  title: string;
  messages: any[];
};

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
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(162, 143, 249, 0.3)',
            shadowColor: '#000',
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
          <View className="p-4 flex-row justify-between items-center border-b border-gray-200">
            <Text style={{fontFamily: 'Cormorant-SemiBold'}} className="text-xl text-black/80">Chat History</Text>
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
                  <View key={item.id} className={`flex-row items-center justify-between p-2 mx-3 my-0.5 rounded-lg border ${activeSessionId === item.id ? 'bg-[#a28ff9]/20 border-[#a28ff9]/30' : 'bg-gray-50 border-gray-100'}`}>
                    <Pressable
                      onPress={() => onSwitchActiveSession(item.id)}
                      className="flex-1"
                    >
                      <Text className="text-gray-800 font-medium text-base" numberOfLines={1}>{item.title}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => onDeleteSession(item.id)}
                      className="ml-2 p-2 rounded-full bg-red-100"
                    >
                      <Ionicons name="trash-outline" size={16} color="#ef4444" />
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