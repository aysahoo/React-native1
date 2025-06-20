import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import GradientBackground from '../GradientBackground'

const profile = () => {
  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1, paddingBottom: 75 }}>
        <View>
          <Text>profile</Text>
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}

export default profile