import React from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Attachment = {
  id: string;
  name: string;
  type: string;
  uri: string;
};

interface AttachmentPreviewProps {
  attachments: Attachment[];
  onRemoveAttachment: (attachmentId: string) => void;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  attachments,
  onRemoveAttachment,
}) => {
  if (attachments.length === 0) return null;

  return (
    <View className="mb-2" style={{ maxHeight: 40 }}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        style={{ flexGrow: 0 }}
      >
        {attachments.map((attachment) => (
          <View key={attachment.id} className="flex-row items-center mr-2 rounded-full px-2 py-1" style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            borderWidth: 0.5,
            borderColor: 'rgba(162, 143, 249, 0.2)',
            height: 32
          }}>
            {attachment.type === 'image' ? (
              <Image source={{ uri: attachment.uri }} style={{ 
                width: 24, 
                height: 24, 
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }} />
            ) : (
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: 'rgba(162, 143, 249, 0.15)',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'rgba(162, 143, 249, 0.2)'
              }}>
                <Ionicons name="document-outline" size={14} color="#6b7280" />
              </View>
            )}
            <Text className="ml-2 text-gray-700 text-[9px] font-medium max-w-[48px]" numberOfLines={1} style={{ opacity: 0.8 }}>
              {attachment.name}
            </Text>
            <Pressable onPress={() => onRemoveAttachment(attachment.id)} className="ml-1 p-0.5">
              <View style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Ionicons name="close" size={10} color="#ef4444" />
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AttachmentPreview; 