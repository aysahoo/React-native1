import React from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

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
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;

  if (attachments.length === 0) return null;

  return (
    <View style={{ marginBottom: 8, maxHeight: 40 }}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        style={{ flexGrow: 0 }}
      >
        {attachments.map((attachment) => (
          <View key={attachment.id} style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 8,
            borderRadius: 16,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: colors.surfaceSecondary,
            borderWidth: 0.5,
            borderColor: colors.primaryBorder,
            height: 32
          }}>
            {attachment.type === 'image' ? (
              <Image source={{ uri: attachment.uri }} style={{ 
                width: 24, 
                height: 24, 
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.borderLight
              }} />
            ) : (
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: colors.primaryLight,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.primaryBorder
              }}>
                <Ionicons name="document-outline" size={14} color={colors.textSecondary} />
              </View>
            )}
            <Text style={{
              marginLeft: 8,
              color: colors.textSecondary,
              fontSize: 9,
              fontWeight: '500',
              maxWidth: 48,
              opacity: 0.8
            }} numberOfLines={1}>
              {attachment.name}
            </Text>
            <Pressable onPress={() => onRemoveAttachment(attachment.id)} style={{ marginLeft: 4, padding: 2 }}>
              <View style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: colors.error + '20',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Ionicons name="close" size={10} color={colors.error} />
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AttachmentPreview; 