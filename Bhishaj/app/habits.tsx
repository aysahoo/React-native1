import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from './GradientBackground';
import { Stack, useRouter } from 'expo-router';

const BETTER_HABITS = [
  {
    id: 1,
    title: 'Take a 10-minute walk',
    description: 'Boost your mood and energy with a short walk outside',
    icon: 'walk-outline',
    color: '#fef3c7'
  },
  {
    id: 2,
    title: 'Drink more water',
    description: 'Stay hydrated throughout the day for better health',
    icon: 'water-outline',
    color: '#dbeafe'
  },
  {
    id: 3,
    title: 'Practice deep breathing',
    description: 'Reduce stress with 5 minutes of mindful breathing',
    icon: 'leaf-outline',
    color: '#f3e8ff'
  },
  {
    id: 4,
    title: 'Stand up and stretch',
    description: 'Take breaks to move your body and improve posture',
    icon: 'body-outline',
    color: '#fef7cd'
  },
  {
    id: 5,
    title: 'Limit screen time',
    description: 'Give your eyes a break and connect with the real world',
    icon: 'eye-outline',
    color: '#e0e7ff'
  }
];

const HabitsScreen = () => {
  const router = useRouter();

  return (
    <GradientBackground>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }}>
        <Pressable onPress={() => router.back()} className="absolute top-16 left-5 z-10 bg-white/30 rounded-full p-2">
          <Ionicons name="close-outline" size={24} color="#333" />
        </Pressable>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{fontFamily: 'Cormorant-SemiBold'}} className="text-3xl text-black/70 mb-8 text-center">
            Better Habits
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}
            className="flex-1"
            style={{maxHeight: 450}}
          >
            <View className="flex-row gap-4">
              {BETTER_HABITS.map((habit) => (
                <View 
                  key={habit.id}
                  className="rounded-2xl p-6 shadow-sm"
                  style={{ 
                    backgroundColor: habit.color,
                    width: 280,
                    height: 400
                  }}
                >
                  <View className="flex-1">
                    <View className="flex-row items-center gap-x-4 mb-4">
                      <View className="bg-white/60 rounded-full p-3">
                        <Ionicons name={habit.icon as any} size={24} color="#6b7280" />
                      </View>
                      <View className="flex-1">
                        <Text style={{fontFamily: 'Cormorant-SemiBold'}} className="text-xl text-gray-800 font-bold mb-2">
                          {habit.title}
                        </Text>
                        <Text className="text-gray-600 text-base leading-6">
                          {habit.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  {/* Action Icons */}
                  <View className="flex-row justify-end gap-x-3">
                    <Pressable className="bg-white/40 rounded-full p-2">
                      <Ionicons name="heart-outline" size={18} color="#6b7280" />
                    </Pressable>
                    <Pressable className="bg-white/40 rounded-full p-2">
                      <Ionicons name="share-outline" size={18} color="#6b7280" />
                    </Pressable>
                    <Pressable className="bg-white/40 rounded-full p-2">
                      <Ionicons name="bookmark-outline" size={18} color="#6b7280" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default HabitsScreen; 