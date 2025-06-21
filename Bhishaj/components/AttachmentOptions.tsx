import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface AttachmentOptionsProps {
  showAttachmentOptions: boolean;
  onCameraPick: () => void;
  onImagePick: () => void;
  onDocumentPick: () => void;
}

const AttachmentOptions: React.FC<AttachmentOptionsProps> = ({
  showAttachmentOptions,
  onCameraPick,
  onImagePick,
  onDocumentPick,
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;

  if (!showAttachmentOptions) return null;

  return (
    <View style={{
      position: 'absolute',
      bottom: 48,
      left: 0,
      backgroundColor: colors.surface,
      borderRadius: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
      minWidth: 140,
      zIndex: 50,
      borderWidth: 1,
      borderColor: colors.border,
    }}>
      <Pressable 
        onPress={onCameraPick}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        }}
      >
        <Ionicons name="camera-outline" size={18} color={colors.textSecondary} />
        <Text style={{ marginLeft: 8, color: colors.textPrimary, fontSize: 14 }}>Camera</Text>
      </Pressable>
      <Pressable 
        onPress={onImagePick}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        }}
      >
        <Ionicons name="images-outline" size={18} color={colors.textSecondary} />
        <Text style={{ marginLeft: 8, color: colors.textPrimary, fontSize: 14 }}>Images</Text>
      </Pressable>
      <Pressable 
        onPress={onDocumentPick}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        <Ionicons name="documents-outline" size={18} color={colors.textSecondary} />
        <Text style={{ marginLeft: 8, color: colors.textPrimary, fontSize: 14 }}>Documents</Text>
      </Pressable>
    </View>
  );
};

export default AttachmentOptions; 