import { View, Text, Pressable, SafeAreaView, TextInput } from 'react-native';
import React, { useState } from 'react';
import GradientBackground from '../GradientBackground';

const TAGS = [
  'startups',
  'regulations',
  'laws',
  'ideas',
  'health',
  'in UK',
  'in Europe',
  'in the US',
];

const discover = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['startups', 'in Germany']);
  const [topic, setTopic] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1, paddingBottom: 200 }}>
        <View className="items-center mb-20">
            <Text className="text-2xl mt-16 font-bold tracking-widest">DISCOVER</Text>
        </View>
        <View className="flex-1 px-6 pb-4 items-center justify-center">
          {/* Main Content */}
          <View className="w-full items-center">
            <Text className="text-4xl text-gray-700 mb-3 text-center">I want to learn about</Text>
            <TextInput
              className="w-2/3 text-3xl font-semibold text-gray-900 mb-3 border-b border-gray-400 pb-1 text-center"
              placeholder="Brain Tumor Surgery"
              placeholderTextColor="rgb(156 163 175)"
              value={topic}
              onChangeText={setTopic}
            />
            <Text className="text-base text-gray-500 mb-3 text-center">Further customize your briefing:</Text>
            <View className="flex-row flex-wrap gap-2 justify-center">
              {TAGS.map((tag) => (
                <Pressable
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full ${selectedTags.includes(tag) ? 'bg-[#799cfeb8]' : 'bg-none'} border border-gray-400`}
                >
                  <Text className={`text-sm ${selectedTags.includes(tag) ? 'text-white font-semibold' : 'text-gray-400'}`}>{tag}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable className="bg-primary rounded-xl py-4 items-center w-2/3 self-center mt-6">
              <Text className="text-white text-lg font-semibold">Create Briefing</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default discover;