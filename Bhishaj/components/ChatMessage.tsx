import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface ChatMessageProps {
  item: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ item }) => {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;

  return (
    <View
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        maxWidth: '80%',
        backgroundColor: item.sender === 'user' ? colors.chatUser : colors.chatBot,
        alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      <Text style={{ color: item.sender === 'user' ? colors.chatTextUser : colors.chatTextBot }}>
        {item.text}
      </Text>
      {item.attachment && (
        <View style={{ marginTop: 8 }}>
          {item.attachment.type === 'image' ? (
            <Image 
              source={{ uri: item.attachment.uri }} 
              style={{ width: 200, height: 150, borderRadius: 8 }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ 
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 8,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Ionicons name="document-outline" size={20} color={item.sender === 'user' ? colors.chatTextUser : colors.textSecondary} />
              <Text style={{ 
                marginLeft: 8, 
                flex: 1, 
                color: item.sender === 'user' ? colors.chatTextUser : colors.textPrimary
              }} numberOfLines={1}>
                {item.attachment.name}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ChatMessage; 