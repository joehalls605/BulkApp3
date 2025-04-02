import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Congratulations() {
    const navigation = useNavigation<NavigationProp>();
    const fadeAnim = new Animated.Value(0);
    const [isLoading, setIsLoading] = useState(false);
    const progress = new Animated.Value(0);
    const [loadingMessage, setLoadingMessage] = useState('Unlocking your dashboard 🔓');

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const startLoadingAnimation = () => {
        setIsLoading(true);
        const messages = [
            { text: 'Unlocking your dashboard 🔓', duration: 1500 },
            { text: 'Loading in your details 📊', duration: 1500 },
            { text: 'Building your tools 🛠️', duration: 1500 }
        ];

        let currentIndex = 0;
        const updateMessage = () => {
            if (currentIndex < messages.length) {
                setLoadingMessage(messages[currentIndex].text);
                // Animate progress to the next segment
                Animated.timing(progress, {
                    toValue: (currentIndex + 1) / messages.length,
                    duration: messages[currentIndex].duration,
                    useNativeDriver: false,
                }).start();
                
                setTimeout(updateMessage, messages[currentIndex].duration);
                currentIndex++;
            } else {
                // Fade out before navigating
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    // @ts-ignore
                    navigation.navigate('Dashboard');
                });
            }
        };

        updateMessage();
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                    <Animated.View style={[styles.loadingContent, { opacity: fadeAnim }]}>
                        <Text style={styles.loadingEmoji}>🚀</Text>
                        <Text style={styles.loadingTitle}>Setting up your journey</Text>
                        <Text style={styles.loadingMessage}>{loadingMessage}</Text>
                       
                    </Animated.View>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark-circle" size={65} color="#00bf1d" />
                    </View>
                    <Text style={styles.title}>BulkUp Member! 🎉</Text>
                    <Text style={styles.subtitle}>Gaining weight starts now 💪</Text>
                    
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailItem}>
                            <Ionicons name="time" size={24} color="#00bf1d" />
                            <Text style={styles.detailText}>7 days of premium access</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="fitness" size={24} color="#4036cf" />
                            <Text style={styles.detailText}>Full access to all features</Text>
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.enterButton}
                        onPress={startLoadingAnimation}
                    >
                        <Text style={styles.enterButtonText}>Start Your Journey</Text>
                        <Ionicons name="arrow-forward" size={24} color="white" style={styles.enterButtonIcon} />
                    </TouchableOpacity>
                </Animated.View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
    },
    detailsContainer: {
        width: '100%',
        marginBottom: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
        flex: 1,
    },
    featuresTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 32,
        gap: 12,
    },
    featureCard: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
        width: '45%',
        borderWidth: 1.5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    featureIconContainer: {
        padding: 8,
        borderRadius: 14,
        marginBottom: 8,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    enterButton: {
        backgroundColor: '#00bf1d',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
    },
    enterButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    enterButtonIcon: {
        marginLeft: 12,
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    loadingEmoji: {
        fontSize: 60,
        marginBottom: 16,
    },
    loadingTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    loadingMessage: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
    },
    progressContainer: {
        width: '100%',
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#00bf1d',
        borderRadius: 4,
        shadowColor: '#00bf1d',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
}); 