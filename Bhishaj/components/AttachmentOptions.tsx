import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  if (!showAttachmentOptions) return null;

  return (
    <View className="absolute bottom-12 left-0 bg-white/95 rounded-lg shadow-lg border border-gray-200 min-w-[140px] z-50">
      <Pressable 
        onPress={onCameraPick}
        className="flex-row items-center px-3 py-2 border-b border-gray-100"
      >
        <Ionicons name="camera-outline" size={18} color="#6b7280" />
        <Text className="ml-2 text-gray-700 text-sm">Camera</Text>
      </Pressable>
      <Pressable 
        onPress={onImagePick}
        className="flex-row items-center px-3 py-2 border-b border-gray-100"
      >
        <Ionicons name="images-outline" size={18} color="#6b7280" />
        <Text className="ml-2 text-gray-700 text-sm">Images</Text>
      </Pressable>
      <Pressable 
        onPress={onDocumentPick}
        className="flex-row items-center px-3 py-2"
      >
        <Ionicons name="documents-outline" size={18} color="#6b7280" />
        <Text className="ml-2 text-gray-700 text-sm">Documents</Text>
      </Pressable>
    </View>
  );
};

export default AttachmentOptions; 