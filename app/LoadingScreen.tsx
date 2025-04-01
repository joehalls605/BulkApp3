import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

const LoadingScreen: React.FC = () => {
    const navigation = useNavigation();
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const progressAnim = new Animated.Value(0);
    const fadeAnim = new Animated.Value(1);

    useEffect(() => {
        // Start the loading sequence
        startLoadingSequence();
    }, []);

    const startLoadingSequence = () => {
        // Animate progress bar over 4 seconds
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: false,
        }).start();

        // Cycle through messages
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            messageIndex++;
            if (messageIndex < loadingMessages.length) {
                // Fade out current message
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => {
                    setCurrentMessageIndex(messageIndex);
                    // Fade in new message
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                });
            } else {
                clearInterval(messageInterval);
                // Navigate to Dashboard after last message
                setTimeout(() => {
                    // @ts-ignore
                    navigation.navigate('Dashboard');
                }, 500);
            }
        }, 1300);
    };

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.content}>
                    <View style={styles.messageContainer}>
                        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
                            {loadingMessages[currentMessageIndex]}
                        </Animated.Text>
                    </View>
                    
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBackground}>
                            <Animated.View 
                                style={[
                                    styles.progressBar,
                                    { width: progressWidth }
                                ]}
                            />
                        </View>
                    </View>
                </View>
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
    messageContainer: {
        height: 30,
        marginBottom: 24,
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 20,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
    },
    progressContainer: {
        width: '80%',
    },
    progressBackground: {
        height: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#00bf1d',
        borderRadius: 4,
    },
});

export default LoadingScreen; 