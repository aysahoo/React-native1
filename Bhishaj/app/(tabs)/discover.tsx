import { View, Text, Pressable, SafeAreaView, TextInput, FlatList, KeyboardAvoidingView, Platform, Animated, Image, ScrollView, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../GradientBackground';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

// Import components
import ChatMessage from '../../components/ChatMessage';
import TabBar from '../../components/TabBar';
import AttachmentOptions from '../../components/AttachmentOptions';
import AttachmentPreview from '../../components/AttachmentPreview';
import ChatHistoryPanel from '../../components/ChatHistoryPanel';

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

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
};

const SUGGESTIONS = [
    { text: 'Medicines', icon: 'medkit-outline' },
    { text: 'Remedies', icon: 'home-outline' },
    { text: 'Health', icon: 'heart-outline' },
];

const Discover = () => {
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
      <View className="flex-1 px-4">
        <View className="flex-row justify-between items-center pt-12 pb-2 z-10">
          <Pressable 
            onPress={toggleHistoryPanel} 
            className="bg-white/50 rounded-full p-3"
            accessibilityLabel="Open chat history"
            accessibilityRole="button"
          >
            <Ionicons name="list-outline" size={24} color="#6b7280" />
          </Pressable>
          <View className="flex-row gap-x-4">
            <Pressable 
              onPress={() => router.push('/habits')} 
              className="bg-white/50 rounded-full p-3"
              accessibilityLabel="Open habits"
              accessibilityRole="button"
            >
              <Image source={require('../../assets/icons/cards.png')} style={{ width: 24, height: 24 }} />
            </Pressable>
            <Pressable 
              onPress={handleNewChat} 
              className="bg-white/50 rounded-full p-3"
              accessibilityLabel="Start new chat"
              accessibilityRole="button"
            >
              <Ionicons name="add" size={24} color="#6b7280" />
            </Pressable>
          </View>
        </View>

        <FlatList
          data={activeMessages}
          renderItem={({ item }) => <ChatMessage item={item} />}
          keyExtractor={(item) => item.id}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
        />

        {showSuggestions && (
          <View className="mb-2 self-start" style={{ width: '66%' }}>
            <Pressable
              onPress={() => handleSuggestionPress(typingSuggestions[0])}
              className="bg-white/20 rounded-2xl p-3 border border-white/30"
            >
              <Text className="text-gray-600 text-base"> {typingSuggestions[0]}</Text>
            </Pressable>
          </View>
        )}

        <AttachmentPreview 
          attachments={currentAttachments}
          onRemoveAttachment={removeAttachment}
        />

        <View className="flex-row items-center bg-white/50 rounded-2xl p-2 mb-10">
          <TextInput
            className="flex-1 text-lg text-gray-800 p-3"
            placeholder="Ask anything..."
            placeholderTextColor="rgb(156 163 175)"
            value={topic}
            onChangeText={handleTextChange}
            multiline
          />
          <View className="flex-row items-center gap-x-2 mr-2">
            <View className="relative">
              <Pressable onPress={handleAttachment} className="p-2">
                <Ionicons name="attach" size={24} color="#6b7280" />
              </Pressable>
              <AttachmentOptions
                showAttachmentOptions={showAttachmentOptions}
                onCameraPick={handleCameraPick}
                onImagePick={handleImagePick}
                onDocumentPick={handleDocumentPick}
              />
            </View>
            <Ionicons name="scan" size={22} color="#6b7280" />
            <Pressable className="bg-[#a28ff9] rounded-lg p-3" onPress={handleSendMessage}>
              <Ionicons name="paper-plane-outline" size={22} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  const renderInitialView = () => (
    <View className="flex-1 justify-center px-4">
      <View className="mb-4 items-center">
        <Text style={{fontFamily: 'Cormorant-SemiBold'}} className="text-6xl text-black/60">Hello Anshuman,</Text>
      </View>
      
      {showSuggestions && (
        <View className="mb-2 self-start" style={{ width: '66%' }}>
          <Pressable
            onPress={() => handleSuggestionPress(typingSuggestions[0])}
            className="bg-white/20 rounded-2xl border p-3 border-white/30"
          >
            <Text className="text-gray-600 text-base"> {typingSuggestions[0]}</Text>
          </Pressable>
        </View>
      )}
      
      <View className="bg-white/50 rounded-2xl p-6 shadow-md mb-8">
        <AttachmentPreview 
          attachments={currentAttachments}
          onRemoveAttachment={removeAttachment}
        />
        <TextInput
          className="text-lg text-gray-800 h-20"
          style={{textAlignVertical: 'top'}}
          placeholder="Ask anything..."
          placeholderTextColor="rgb(156 163 175)"
          value={topic}
          onChangeText={handleTextChange}
          multiline
        />
        <View className="flex-row justify-between items-center mt-4">
          <TabBar 
            activeFocus={activeFocus}
            onTabSwitch={handleTabSwitch}
          />
          <View className="flex-row items-center gap-x-4">
            <Ionicons name="scan-outline" size={22} color="#6b7280" />
            <View className="relative">
              <Pressable onPress={handleAttachment} className="p-2">
                <Ionicons name="attach" size={22} color="#6b7280" />
              </Pressable>
              <AttachmentOptions
                showAttachmentOptions={showAttachmentOptions}
                onCameraPick={handleCameraPick}
                onImagePick={handleImagePick}
                onDocumentPick={handleDocumentPick}
              />
            </View>
            <Pressable className="bg-[#a28ff9] rounded-lg p-2" onPress={handleSendMessage}>
              <Ionicons name="paper-plane-outline" size={22} color="white" />
            </Pressable>
          </View>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-3 justify-center mb-12">
        {SUGGESTIONS.map(suggestion => (
          <Pressable key={suggestion.text} className="bg-white/40 p-3 rounded-lg flex-row items-center gap-x-2">
            <Ionicons name={suggestion.icon as any} size={16} color="#6b7280" />
            <Text className="text-gray-600 font-semibold text-md">{suggestion.text}</Text>
          </Pressable>
        ))}
      </View>

      <View className="absolute bottom-24 self-center">
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
          <Pressable className="bg-white/50 rounded-full w-14 h-14 items-center justify-center" onPress={() => router.push('/habits')}>
            <Image source={require('../../assets/icons/cards.png')} style={{ width: 32, height: 32, tintColor: '#6b7280' }} />
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