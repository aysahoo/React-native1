import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import GradientBackground from '../GradientBackground'

const reminder = () => {
  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1, paddingBottom: 75 }}>
        <View>
          <Text>reminder</Text>
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}

export default reminder