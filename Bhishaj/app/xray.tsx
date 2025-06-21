import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import GradientBackground from './GradientBackground';
import { useTheme } from '../contexts/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Xray = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const insets = useSafeAreaInsets();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleImagePick = async () => {
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
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setAnalysisResult(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleCameraCapture = async () => {
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
        setSelectedImage(result.assets[0].uri);
        setAnalysisResult(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisResult('Analysis complete! No significant abnormalities detected in the X-ray image. The bone structure appears normal with no visible fractures or lesions.');
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetImage = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <GradientBackground>
      <View style={{ flex: 1, paddingTop: insets.top + 30 }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}>
          <Pressable
            onPress={() => router.back()}
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 20,
              padding: 8,
            }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
          
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: colors.textPrimary,
          }}>
            X-Ray Analysis
          </Text>
          
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Instructions */}
          <View style={{
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.borderLight,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="information-circle" size={24} color={colors.primary} />
              <Text style={{
                marginLeft: 8,
                fontSize: 18,
                fontWeight: '600',
                color: colors.textPrimary,
              }}>
                How to use
              </Text>
            </View>
            <Text style={{
              fontSize: 14,
              color: colors.textSecondary,
              lineHeight: 20,
            }}>
              1. Upload or capture an X-ray image{'\n'}
              2. Our AI will analyze the image for abnormalities{'\n'}
              3. Get detailed results and recommendations
            </Text>
          </View>

          {/* Image Selection */}
          {!selectedImage ? (
            <View style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 16,
              padding: 40,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: colors.borderLight,
              borderStyle: 'dashed',
              marginBottom: 20,
            }}>
              <Ionicons name="scan" size={64} color={colors.primary} />
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.textPrimary,
                marginTop: 16,
                marginBottom: 8,
              }}>
                Select X-Ray Image
              </Text>
              <Text style={{
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center',
                marginBottom: 24,
              }}>
                Upload an X-ray image or capture one using your camera
              </Text>
              
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable
                  onPress={handleImagePick}
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="images" size={20} color="white" />
                  <Text style={{
                    marginLeft: 8,
                    color: 'white',
                    fontWeight: '600',
                  }}>
                    Gallery
                  </Text>
                </Pressable>
                
                <Pressable
                  onPress={handleCameraCapture}
                  style={{
                    backgroundColor: colors.surface,
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="camera" size={20} color={colors.primary} />
                  <Text style={{
                    marginLeft: 8,
                    color: colors.primary,
                    fontWeight: '600',
                  }}>
                    Camera
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: colors.borderLight,
            }}>
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: 280,
                    height: 280,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: colors.border,
                  }}
                  resizeMode="cover"
                />
              </View>
              
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable
                  onPress={analyzeImage}
                  disabled={isAnalyzing}
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 12,
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    opacity: isAnalyzing ? 0.6 : 1,
                  }}
                >
                  {isAnalyzing ? (
                    <>
                      <Ionicons name="hourglass" size={20} color="white" />
                      <Text style={{
                        marginLeft: 8,
                        color: 'white',
                        fontWeight: '600',
                      }}>
                        Analyzing...
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="analytics" size={20} color="white" />
                      <Text style={{
                        marginLeft: 8,
                        color: 'white',
                        fontWeight: '600',
                      }}>
                        Analyze
                      </Text>
                    </>
                  )}
                </Pressable>
                
                <Pressable
                  onPress={resetImage}
                  style={{
                    backgroundColor: colors.surface,
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.error,
                  }}
                >
                  <Ionicons name="refresh" size={20} color={colors.error} />
                </Pressable>
              </View>
            </View>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <View style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: colors.primaryBorder,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                <Text style={{
                  marginLeft: 8,
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.textPrimary,
                }}>
                  Analysis Complete
                </Text>
              </View>
              <Text style={{
                fontSize: 14,
                color: colors.textSecondary,
                lineHeight: 20,
              }}>
                {analysisResult}
              </Text>
              
              <View style={{
                backgroundColor: colors.primaryLight,
                borderRadius: 8,
                padding: 12,
                marginTop: 12,
              }}>
                <Text style={{
                  fontSize: 12,
                  color: colors.primary,
                  fontWeight: '500',
                }}>
                  ⚠️ This analysis is for informational purposes only. Please consult with a healthcare professional for medical advice.
                </Text>
              </View>
            </View>
          )}

          {/* Features */}
          <View style={{
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.borderLight,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.textPrimary,
              marginBottom: 16,
            }}>
              Features
            </Text>
            
            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="shield-checkmark" size={20} color={colors.success} />
                <Text style={{
                  marginLeft: 12,
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Secure and private image analysis
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="flash" size={20} color={colors.warning} />
                <Text style={{
                  marginLeft: 12,
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Fast AI-powered analysis
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="medical" size={20} color={colors.primary} />
                <Text style={{
                  marginLeft: 12,
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Detects common abnormalities
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default Xray; 