import { View, Text, Pressable, SafeAreaView, TextInput, FlatList, KeyboardAvoidingView, Platform, Animated, Image, ScrollView, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../GradientBackground';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../contexts/ThemeContext';
import { lightColors, darkColors } from '../../constants/colors';

// Import types
import { Message, ChatSession } from '../../types';

// Import components
import ChatMessage from '../../components/ChatMessage';
import TabBar from '../../components/TabBar';
import AttachmentOptions from '../../components/AttachmentOptions';
import AttachmentPreview from '../../components/AttachmentPreview';
import ChatHistoryPanel from '../../components/ChatHistoryPanel';

const SUGGESTIONS = [
    { text: 'Medicines', icon: 'medkit-outline' },
    { text: 'Remedies', icon: 'home-outline' },
    { text: 'Health', icon: 'heart-outline' },
];

const Discover = () => {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  
  const [topic, setTopic] = useState('');
  const [activeFocus, setActiveFocus] = useState('Search');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [currentAttachments, setCurrentAttachments] = useState<Array<{
    id: string;
    name: string;
    type: string;
    uri: string;
  }>>([]);
  const router = useRouter();
  
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 'session-1',
      title: 'Headache remedies and pain relief',
      messages: []
    },
    {
      id: 'session-2', 
      title: 'Cold and flu symptoms treatment',
      messages: []
    },
    {
      id: 'session-3',
      title: 'Stomach ache and digestion issues',
      messages: []
    },
    {
      id: 'session-4',
      title: 'Sleep problems and insomnia',
      messages: []
    },
    {
      id: 'session-5',
      title: 'Back pain and muscle soreness',
      messages: []
    },
    {
      id: 'session-6',
      title: 'Skin rash and allergies',
      messages: []
    },
    {
      id: 'session-7',
      title: 'Eye strain and vision problems',
      messages: []
    },
    {
      id: 'session-8',
      title: 'Stress and anxiety management',
      messages: []
    }
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const historyPanelAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const floatingAnim = useRef(new Animated.Value(0)).current;

  const activeMessages = sessions.find(s => s.id === activeSessionId)?.messages || [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (activeMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [activeMessages]);

  // Close attachment options when interacting with other elements
  useEffect(() => {
    if (showAttachmentOptions) {
      const timer = setTimeout(() => {
        setShowAttachmentOptions(false);
      }, 3000); // Auto-close after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [showAttachmentOptions]);

  // Floating animation for habits button
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    
    animation.start();
    
    // Cleanup function to stop animation on unmount
    return () => {
      animation.stop();
    };
  }, []);

  // Hardcoded suggestions for the popup
  const typingSuggestions = [
    'How to treat headache?',
    'What are the symptoms of flu?',
    'Natural remedies for insomnia',
    'Best medicine for stomach ache',
    'How to reduce stress?'
  ];

  const toggleHistoryPanel = () => {
    const toValue = isHistoryOpen ? 0 : 1;
    Animated.timing(historyPanelAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setHistoryOpen(!isHistoryOpen);
  };

  const handleTextChange = (text: string) => {
    setTopic(text);
    setShowSuggestions(text.length > 0);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setTopic(suggestion);
    setShowSuggestions(false);
  };

  const handleTabSwitch = (tabName: string) => {
    setActiveFocus(tabName);
  };

  const handleNewChat = () => {
    setActiveSessionId(null);
    if (isHistoryOpen) {
      toggleHistoryPanel();
    }
  };

  const switchActiveSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    toggleHistoryPanel();
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  };

  const handleAttachment = async () => {
    setShowAttachmentOptions(!showAttachmentOptions);
  };

  const handleImagePick = async () => {
    setShowAttachmentOptions(false);
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: false,
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newAttachments = result.assets.map((asset, index) => ({
          id: `${Date.now()}-${index}`,
          name: `image_${index + 1}.jpg`,
          type: 'image',
          uri: asset.uri,
        }));
        setCurrentAttachments(prev => [...prev, ...newAttachments]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick images');
    }
  };

  const handleDocumentPick = async () => {
    setShowAttachmentOptions(false);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newAttachments = result.assets.map((asset, index) => ({
          id: `${Date.now()}-${index}`,
          name: asset.name || `document_${index + 1}`,
          type: 'document',
          uri: asset.uri,
        }));
        setCurrentAttachments(prev => [...prev, ...newAttachments]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick documents');
    }
  };

  const handleCameraPick = async () => {
    setShowAttachmentOptions(false);
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera is required!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setCurrentAttachments(prev => [...prev, {
          id: Date.now().toString(),
          name: 'camera_photo.jpg',
          type: 'image',
          uri: asset.uri,
        }]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setCurrentAttachments(prev => prev.filter(att => att.id !== attachmentId));
  };

  const handleSendMessage = () => {
    if (!topic.trim() && currentAttachments.length === 0) return;

    const currentTopic = topic;
    const attachmentsToSend = [...currentAttachments];
    setTopic('');
    setCurrentAttachments([]);
    setShowSuggestions(false);

    let currentSessionId = activeSessionId;

    if (currentSessionId === null) {
      currentSessionId = `session-${Date.now()}`;
      const newSession: ChatSession = {
        id: currentSessionId,
        title: (currentTopic || (attachmentsToSend.length > 0 ? `${attachmentsToSend.length} attachments` : 'Attachment')).substring(0, 30) + '...',
        messages: [],
      };
      setSessions(prev => [...prev, newSession]);
      setActiveSessionId(currentSessionId);
    }

    // Send text message if there's text
    if (currentTopic.trim()) {
      const textMessage: Message = {
        id: `user-${Date.now()}`,
        text: currentTopic,
        sender: 'user',
      };
      setSessions(prev => prev.map(s =>
        s.id === currentSessionId ? { ...s, messages: [...s.messages, textMessage] } : s
      ));
    }

    // Send each attachment as a separate message
    attachmentsToSend.forEach((attachment, index) => {
      const attachmentMessage: Message = {
        id: `attachment-${Date.now()}-${index}`,
        text: attachment.type === 'image' ? 'Image attached' : `Document attached: ${attachment.name}`,
        sender: 'user',
        attachment: attachment,
      };
      
      setTimeout(() => {
        setSessions(prev => prev.map(s =>
          s.id === currentSessionId ? { ...s, messages: [...s.messages, attachmentMessage] } : s
        ));
      }, index * 200); // Stagger the messages slightly
    });

    // Bot response
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: `I received your message${currentTopic.trim() ? `: "${currentTopic}"` : ''}${attachmentsToSend.length > 0 ? ` with ${attachmentsToSend.length} attachment${attachmentsToSend.length > 1 ? 's' : ''}.` : '.'} How can I assist you today?`,
      sender: 'bot',
    };

    setTimeout(() => {
      setSessions(prev => prev.map(s =>
        s.id === currentSessionId ? { ...s, messages: [...s.messages, botMessage] } : s
      ));
    }, attachmentsToSend.length * 200 + 500);
  };

  const renderChatInterface = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: 48, 
          paddingBottom: 8, 
          zIndex: 10 
        }}>
          <Pressable 
            onPress={toggleHistoryPanel} 
            style={{ backgroundColor: colors.surfaceSecondary }}
            className="rounded-full p-3"
            accessibilityLabel="Open chat history"
            accessibilityRole="button"
          >
            <Ionicons name="list-outline" size={24} color={colors.textSecondary} />
          </Pressable>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Pressable 
              onPress={() => router.push('/habits')} 
              style={{ backgroundColor: colors.surfaceSecondary }}
              className="rounded-full p-3"
              accessibilityLabel="Open habits"
              accessibilityRole="button"
            >
              <Image 
                source={require('../../assets/icons/cards.png')} 
                style={{ 
                  width: 24, 
                  height: 24,
                  tintColor: colors.textSecondary 
                }} 
              />
            </Pressable>
            <Pressable 
              onPress={handleNewChat} 
              style={{ backgroundColor: colors.surfaceSecondary }}
              className="rounded-full p-3"
              accessibilityLabel="Start new chat"
              accessibilityRole="button"
            >
              <Ionicons name="add" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>
        </View>

        {/* Messages List */}
        <FlatList
          data={activeMessages}
          renderItem={({ item }) => <ChatMessage item={item} />}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
        />

        {/* Suggestions */}
        {showSuggestions && (
          <View style={{ marginBottom: 8, alignSelf: 'flex-start', width: '66%' }}>
            <Pressable
              onPress={() => handleSuggestionPress(typingSuggestions[0])}
              style={{ 
                backgroundColor: colors.surfaceSecondary,
                borderColor: colors.borderLight,
                borderRadius: 16,
                padding: 12,
                borderWidth: 1
              }}
            >
              <Text style={{ color: colors.textSecondary, fontSize: 16 }}> {typingSuggestions[0]}</Text>
            </Pressable>
          </View>
        )}

        {/* Attachment Preview */}
        <AttachmentPreview 
          attachments={currentAttachments}
          onRemoveAttachment={removeAttachment}
        />

        {/* Input Bar */}
        <View style={{ 
          backgroundColor: colors.surfaceSecondary,
          borderColor: colors.borderLight,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 16,
          padding: 8,
          marginBottom: 40,
          borderWidth: 1
        }}>
          <TextInput
            style={{ 
              color: colors.textPrimary, 
              textAlignVertical: 'top',
              flex: 1,
              fontSize: 18,
              padding: 12
            }}
            placeholder="Ask anything..."
            placeholderTextColor={colors.textTertiary}
            value={topic}
            onChangeText={handleTextChange}
            multiline
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginRight: 8 }}>
            <View style={{ position: 'relative' }}>
              <Pressable onPress={handleAttachment} style={{ padding: 8 }}>
                <Ionicons name="attach" size={24} color={colors.textSecondary} />
              </Pressable>
              <AttachmentOptions
                showAttachmentOptions={showAttachmentOptions}
                onCameraPick={handleCameraPick}
                onImagePick={handleImagePick}
                onDocumentPick={handleDocumentPick}
              />
            </View>
            <Pressable 
              onPress={() => router.push('/xray')}
              style={{ padding: 8 }}
            >
              <Ionicons name="scan" size={22} color={colors.textSecondary} />
            </Pressable>
            <Pressable style={{ backgroundColor: colors.primary }} className="rounded-lg p-3" onPress={handleSendMessage}>
              <Ionicons name="paper-plane-outline" size={22} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  const renderInitialView = () => (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
      {/* Greeting */}
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Text style={{
          fontFamily: 'Cormorant-SemiBold', 
          color: colors.textPrimary,
          fontSize: 48
        }}>Hello Anshuman,</Text>
      </View>
      
      {/* Suggestions */}
      {showSuggestions && (
        <View style={{ marginBottom: 8, alignSelf: 'flex-start', width: '66%' }}>
          <Pressable
            onPress={() => handleSuggestionPress(typingSuggestions[0])}
            style={{ 
              backgroundColor: colors.surfaceSecondary,
              borderColor: colors.borderLight,
              borderRadius: 16,
              padding: 12,
              borderWidth: 1
            }}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 16 }}> {typingSuggestions[0]}</Text>
          </Pressable>
        </View>
      )}
      
      {/* Main Input Card */}
      <View style={{ 
        backgroundColor: colors.surfaceSecondary,
        borderColor: colors.borderLight,
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        borderWidth: 1,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3
      }}>
        <AttachmentPreview 
          attachments={currentAttachments}
          onRemoveAttachment={removeAttachment}
        />
        <TextInput
          style={{ 
            color: colors.textPrimary, 
            textAlignVertical: 'top',
            fontSize: 18,
            height: 80
          }}
          placeholder="Ask anything..."
          placeholderTextColor={colors.textTertiary}
          value={topic}
          onChangeText={handleTextChange}
          multiline
        />
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: 16 
        }}>
          <View style={{ alignSelf: 'center' }}>
            <TabBar 
              activeFocus={activeFocus}
              onTabSwitch={handleTabSwitch}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Pressable 
              onPress={() => router.push('/xray')}
              style={{ padding: 8 }}
            >
              <Ionicons name="scan-outline" size={22} color={colors.textSecondary} />
            </Pressable>
            <View style={{ position: 'relative' }}>
              <Pressable onPress={handleAttachment} style={{ padding: 8 }}>
                <Ionicons name="attach" size={22} color={colors.textSecondary} />
              </Pressable>
              <AttachmentOptions
                showAttachmentOptions={showAttachmentOptions}
                onCameraPick={handleCameraPick}
                onImagePick={handleImagePick}
                onDocumentPick={handleDocumentPick}
              />
            </View>
            <Pressable style={{ backgroundColor: colors.primary }} className="rounded-lg p-2" onPress={handleSendMessage}>
              <Ionicons name="paper-plane-outline" size={22} color="white" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Quick Suggestions */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
        {SUGGESTIONS.map(suggestion => (
          <Pressable 
            key={suggestion.text} 
            style={{ 
              backgroundColor: colors.surfaceSecondary,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Ionicons name={suggestion.icon as any} size={12} color={colors.textSecondary} />
            <Text style={{ color: colors.textSecondary, fontWeight: '500', fontSize: 14 }}>{suggestion.text}</Text>
          </Pressable>
        ))}
      </View>

      {/* Floating Habits Button */}
      <View style={{ position: 'absolute', bottom: 96, alignSelf: 'center' }}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: floatingAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -8],
                }),
              },
            ],
          }}
        >
          <Pressable 
            style={{ backgroundColor: colors.surfaceSecondary }}
            className="rounded-full w-14 h-14 items-center justify-center" 
            onPress={() => router.push('/habits')}
          >
            <Image 
              source={require('../../assets/icons/cards.png')} 
              style={{ 
                width: 32, 
                height: 32,
                tintColor: colors.textSecondary 
              }} 
            />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        {activeSessionId !== null ? renderChatInterface() : renderInitialView()}
        <ChatHistoryPanel
          isHistoryOpen={isHistoryOpen}
          historyPanelAnim={historyPanelAnim}
          sessions={sessions}
          activeSessionId={activeSessionId}
          onToggleHistoryPanel={toggleHistoryPanel}
          onSwitchActiveSession={switchActiveSession}
          onDeleteSession={deleteSession}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default Discover;