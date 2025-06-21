import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  attachment?: {
    name: string;
    type: string;
    uri: string;
  };
};

interface ChatMessageProps {
  item: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ item }) => (
  <View
    className={`py-3 px-4 my-2 rounded-2xl max-w-[80%] ${
      item.sender === 'user' ? 'bg-[#a28ff9] self-end' : 'bg-white/60 self-start'
    }`}
  >
    <Text className={item.sender === 'user' ? 'text-white' : 'text-gray-800'}>
      {item.text}
    </Text>
    {item.attachment && (
      <View className="mt-2">
        {item.attachment.type === 'image' ? (
          <Image 
            source={{ uri: item.attachment.uri }} 
            style={{ width: 200, height: 150, borderRadius: 8 }}
            resizeMode="cover"
          />
        ) : (
          <View className="bg-white/20 rounded-lg p-3 flex-row items-center">
            <Ionicons name="document-outline" size={20} color={item.sender === 'user' ? 'white' : '#6b7280'} />
            <Text className={`ml-2 flex-1 ${item.sender === 'user' ? 'text-white' : 'text-gray-800'}`} numberOfLines={1}>
              {item.attachment.name}
            </Text>
          </View>
        )}
      </View>
    )}
  </View>
);

export default ChatMessage; 