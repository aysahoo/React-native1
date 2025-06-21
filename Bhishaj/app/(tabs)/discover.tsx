import { View, Text, Pressable, SafeAreaView, TextInput, FlatList, KeyboardAvoidingView, Platform, Animated, Image, ScrollView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../GradientBackground';
import { useRouter } from 'expo-router';


type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
};

const FOCUS_OPTIONS = [
  { name: 'Search', icon: 'search' },
  { name: 'Symptoms Checker', icon: 'pulse' },
];

const SUGGESTIONS = [
    { text: 'Medicines', icon: 'medkit-outline' },
    { text: 'Remedies', icon: 'home-outline' },
    { text: 'Health', icon: 'heart-outline' },
];

const Discover = () => {
  const [topic, setTopic] = useState('');
  const [activeFocus, setActiveFocus] = useState('Search');
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  // Initialize animation value
  useEffect(() => {
    historyPanelAnim.setValue(0);
  }, []);

  const activeMessages = sessions.find(s => s.id === activeSessionId)?.messages || [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (activeMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [activeMessages]);

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

  const handleSendMessage = () => {
    if (!topic.trim()) return;

    const userMessage: Message = { id: `user-${Date.now()}`, text: topic, sender: 'user' };
    const botMessage: Message = { id: `bot-${Date.now()}`, text: `I am a friendly bot, and I received this message: "${topic}". How can I assist you today?`, sender: 'bot' };
    const currentTopic = topic;
    setTopic('');
    setShowSuggestions(false);

    let currentSessionId = activeSessionId;

    if (currentSessionId === null) {
      currentSessionId = `session-${Date.now()}`;
      const newSession: ChatSession = {
        id: currentSessionId,
        title: currentTopic.substring(0, 30) + '...',
        messages: [userMessage],
      };
      setSessions(prev => [...prev, newSession]);
      setActiveSessionId(currentSessionId);
    } else {
      setSessions(prev => prev.map(s =>
        s.id === currentSessionId ? { ...s, messages: [...s.messages, userMessage] } : s
      ));
    }

    const finalSessionId = currentSessionId;
    setTimeout(() => {
      setSessions(prev => prev.map(s =>
        s.id === finalSessionId ? { ...s, messages: [...s.messages, botMessage] } : s
      ));
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`py-3 px-4 my-2 rounded-2xl max-w-[80%] ${
        item.sender === 'user' ? 'bg-[#a28ff9] self-end' : 'bg-white/60 self-start'
      }`}
    >
      <Text className={item.sender === 'user' ? 'text-white' : 'text-gray-800'}>
        {item.text}
      </Text>
    </View>
  );

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
          renderItem={renderMessage}
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
            <Ionicons name="attach" size={24} color="#6b7280" />
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
          <View className="flex-row bg-gray-200/60 rounded-lg p-1">
            {FOCUS_OPTIONS.map(option => (
              <Pressable 
                key={option.name} 
                onPress={() => setActiveFocus(option.name)}
                className={`p-2 rounded-md ${activeFocus === option.name ? 'bg-white shadow-sm' : ''}`}
              >
                <Ionicons name={option.icon as any} size={22} color={activeFocus === option.name ? '#a28ff9' : '#6b7280'} />
              </Pressable>
            ))}
          </View>
          <View className="flex-row items-center gap-x-4">
            <Ionicons name="scan-outline" size={22} color="#6b7280" />
            <Ionicons name="attach" size={22} color="#6b7280" />
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
  
  const renderHistoryPanel = () => (
    isHistoryOpen && (
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
          onPress={toggleHistoryPanel}
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
                        onPress={() => switchActiveSession(item.id)}
                        className="flex-1"
                      >
                        <Text className="text-gray-800 font-medium text-base" numberOfLines={1}>{item.title}</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => deleteSession(item.id)}
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
    )
  );

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        {activeSessionId !== null ? renderChatInterface() : renderInitialView()}
        {renderHistoryPanel()}
      </SafeAreaView>
    </GradientBackground>
  );
};

export default Discover;