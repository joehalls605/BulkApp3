import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from './types';

type StartJourneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StartJourney'>;

export default function StartJourney() {
    const navigation = useNavigation<StartJourneyScreenNavigationProp>();

    const startTrial = async () => {
        try {
            // Store trial start date
            const trialStartDate = new Date().toISOString();
            await SecureStore.setItemAsync('trialStartDate', trialStartDate);
            
            // Store subscription status
            await SecureStore.setItemAsync('subscriptionStatus', JSON.stringify({
                isActive: true,
                isTrial: true,
                startDate: trialStartDate,
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
            }));

            // Navigate to dashboard
            navigation.navigate('Dashboard');
        } catch (error) {
            console.error('Error starting trial:', error);
        }
    };

    const restoreSubscription = async () => {
        try {
            // Check for existing subscription in SecureStore
            const subscriptionStatus = await SecureStore.getItemAsync('subscriptionStatus');
            if (subscriptionStatus) {
                const status = JSON.parse(subscriptionStatus);
                if (status.isActive) {
                    navigation.navigate('Dashboard');
                    return;
                }
            }
            // If no active subscription found, show error
            alert('No active subscription found. Please start a new trial or subscribe.');
        } catch (error) {
            console.error('Error restoring subscription:', error);
            alert('Error restoring subscription. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Ionicons name="rocket" size={40} color="#FF9800" />
                        <Text style={styles.title}>Start Your Weight Gain Journey</Text>
                    </View>

                    <View style={styles.timeline}>
                        <View style={styles.timelineItem}>
                            <View style={styles.timelineIcon}>
                                <Ionicons name="play-circle" size={24} color="#4CAF50" />
                            </View>
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineTitle}>Day 1</Text>
                                <Text style={styles.timelineText}>Start your free trial</Text>
                            </View>
                        </View>

                        <View style={styles.timelineItem}>
                            <View style={styles.timelineIcon}>
                                <Ionicons name="notifications" size={24} color="#FF9800" />
                            </View>
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineTitle}>Day 5</Text>
                                <Text style={styles.timelineText}>Trial reminder</Text>
                            </View>
                        </View>

                        <View style={styles.timelineItem}>
                            <View style={styles.timelineIcon}>
                                <Ionicons name="time" size={24} color="#F44336" />
                            </View>
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineTitle}>Day 7</Text>
                                <Text style={styles.timelineText}>Trial ends</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.testimonial}>
                        <View style={styles.stars}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Ionicons name="star" size={16} color="#FFD700" />
                        </View>
                        <Text style={styles.testimonialText}>
                            "This app helped me gain healthy weight and build muscle. The meal plans and workout guides are excellent!"
                        </Text>
                        <Text style={styles.testimonialAuthor}>- Olena</Text>
                    </View>

                    <TouchableOpacity style={styles.continueButton} onPress={startTrial}>
                        <Text style={styles.continueButtonText}>Start Free Trial</Text>
                        <Text style={styles.continueButtonSubtext}>£4/month after 7 days</Text>
                    </TouchableOpacity>

                    <View style={styles.legalButtons}>
                        <View style={styles.legalButtonRow}>
                            <TouchableOpacity 
                                style={styles.legalButton}
                                onPress={() => navigation.navigate('TermsAndConditions')}
                            >
                                <Text style={styles.legalButtonText}>Terms and Conditions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.legalButton}
                                onPress={restoreSubscription}
                            >
                                <Text style={styles.legalButtonText}>Restore</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={styles.legalButton}
                            onPress={() => navigation.navigate('TermsOfUse')}
                        >
                            <Text style={styles.legalButtonText}>Terms of Use</Text>
                        </TouchableOpacity>
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
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginTop: 16,
        textAlign: 'center',
    },
    timeline: {
        marginBottom: 40,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
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
    timelineIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF8E7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    timelineContent: {
        flex: 1,
    },
    timelineTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    timelineText: {
        fontSize: 14,
        color: '#666',
    },
    testimonial: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 40,
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
    stars: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    testimonialText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        fontStyle: 'italic',
        marginBottom: 8,
    },
    testimonialAuthor: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    continueButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 4,
    },
    continueButtonSubtext: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    legalButtons: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    legalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 8,
    },
    legalButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 8,
    },
    legalButtonText: {
        color: '#666',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
}); 