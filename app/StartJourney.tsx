import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from './types';

type StartJourneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StartJourney'>;

export default function StartJourney() {
    const navigation = useNavigation<StartJourneyScreenNavigationProp>();
    const [showSuccess, setShowSuccess] = useState(false);
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        // Clear any existing subscription data when component mounts
        const clearExistingSubscription = async () => {
            try {
                await SecureStore.deleteItemAsync('subscriptionDetails');
            } catch (error) {
                console.error('Error clearing subscription data:', error);
            }
        };
        clearExistingSubscription();
    }, []);

    const startTrial = async () => {
        try {
            // Store trial start date and subscription details
            const trialStartDate = new Date().toISOString();
            const subscriptionDetails = {
                isActive: true,
                isTrial: true,
                startDate: trialStartDate,
                trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
                subscriptionPrice: 4,
                subscriptionCurrency: 'GBP',
                subscriptionPeriod: 'monthly',
                autoRenewEnabled: true
            };

            await SecureStore.setItemAsync('subscriptionDetails', JSON.stringify(subscriptionDetails));
            
            // Navigate to Congratulations page
            navigation.navigate('Congratulations');
        } catch (error) {
            console.error('Error starting trial:', error);
            alert('Error starting trial. Please try again.');
        }
    };

    const restoreSubscription = async () => {
        try {
            // Check for both subscription details and user data
            const [subscriptionDetails, userData] = await Promise.all([
                SecureStore.getItemAsync('subscriptionDetails'),
                SecureStore.getItemAsync('userData')
            ]);

            // If no user data exists, they haven't completed the questionnaire
            if (!userData) {
                alert('No account found. Please complete the questionnaire first.');
                return;
            }

            // If no subscription details exist, they haven't started a trial
            if (!subscriptionDetails) {
                alert('No active subscription found. Please start a new trial.');
                return;
            }

            const subscription = JSON.parse(subscriptionDetails);
            const user = JSON.parse(userData);

            // Check if subscription is active and not expired
            if (subscription.isActive) {
                const trialEndDate = new Date(subscription.trialEndDate);
                const now = new Date();

                if (trialEndDate > now) {
                    // Trial is still active
                    navigation.navigate('Dashboard');
                } else {
                    // Trial has expired
                    alert('Your trial has expired. Please start a new trial or subscribe.');
                    // Clear expired subscription
                    await SecureStore.deleteItemAsync('subscriptionDetails');
                }
            } else {
                alert('No active subscription found. Please start a new trial or subscribe.');
            }
        } catch (error) {
            console.error('Error restoring subscription:', error);
            alert('Error restoring subscription. Please try again.');
        }
    };

    if (showSuccess) {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                    <Animated.View style={[styles.successContainer, { opacity: fadeAnim }]}>
                        <View style={styles.successIconContainer}>
                            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                        </View>
                        <Text style={styles.successTitle}>Congratulations! 🎉</Text>
                        <Text style={styles.successText}>Your 7-day free trial has started</Text>
                        <View style={styles.successDetailsContainer}>
                            <View style={styles.successDetailItem}>
                                <Ionicons name="time" size={24} color="#4CAF50" />
                                <Text style={styles.successDetailText}>7 days of premium access</Text>
                            </View>
                            <View style={styles.successDetailItem}>
                                <Ionicons name="fitness" size={24} color="#4CAF50" />
                                <Text style={styles.successDetailText}>Full access to all features</Text>
                            </View>
                            <View style={styles.successDetailItem}>
                                <Ionicons name="card" size={24} color="#4CAF50" />
                                <Text style={styles.successDetailText}>£4/month after trial</Text>
                            </View>
                        </View>
                        <Text style={styles.successSubtext}>Get ready to transform your body</Text>
                    </Animated.View>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Ionicons name="rocket" size={40} color="#4CAF50" />
                        <Text style={styles.title}>You're almost ready!</Text>
                        <Text style={styles.subtitle}>These BulkUp tools are waiting for you.</Text>
                    </View>

                    <View style={styles.featuresContainer}>
                        <View style={styles.featuresGrid}>
                            <View style={styles.featureCard}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="restaurant" size={28} color="#4CAF50" />
                                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Meal Plans</Text>
                                <Text style={styles.featureText}>Custom meal plans based on your goals</Text>
                            </View>

                            <View style={styles.featureCard}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="barbell" size={28} color="#FF9800" />
                                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Workouts</Text>
                                <Text style={styles.featureText}>Expert-designed muscle growth guides</Text>
                            </View>

                            <View style={styles.featureCard}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="cart" size={28} color="#2196F3" />
                                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Daily Shopping</Text>
                                <Text style={styles.featureText}>Smart shopping lists for your meals</Text>
                            </View>

                            <View style={styles.featureCard}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="bulb" size={28} color="#9C27B0" />
                                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Daily Tips</Text>
                                <Text style={styles.featureText}>Nutrition and fitness advice</Text>
                            </View>

                            <View style={styles.featureCard}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="people" size={28} color="#FF5722" />
                                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Community</Text>
                                <Text style={styles.featureText}>Join like-minded individuals</Text>
                            </View>

                            <View style={styles.featureCard}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="compass" size={28} color="#607D8B" />
                                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Daily Guidance</Text>
                                <Text style={styles.featureText}>Personalized daily advice</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.continueButton} onPress={startTrial}>
                        <Text style={styles.continueButtonText}>Start Free Trial</Text>
                        <Text style={styles.continueButtonSubtext}>£4/month after 7 days</Text>
                    </TouchableOpacity>

                    <View style={styles.legalSection}>
                        <View style={styles.legalDivider} />
                        <View style={styles.legalButtons}>
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
                                <Text style={styles.legalButtonText}>Restore Account</Text>
                            </TouchableOpacity>
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
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginTop: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    featuresContainer: {
        marginBottom: 32,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: -6,
    },
    featureCard: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
        margin: 6,
        width: '45%',
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
        alignItems: 'center',
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 8,
        marginBottom: 4,
        textAlign: 'center',
    },
    featureText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 16,
        textAlign: 'center',
    },
    timeline: {
        marginBottom: 32,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
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
    legalSection: {
        marginTop: 20,
        width: '100%',
    },
    legalDivider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginBottom: 16,
    },
    legalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    legalButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 8,
    },
    legalButtonText: {
        color: '#666',
        fontSize: 13,
        textDecorationLine: 'underline',
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    successIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    successText: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
    },
    successDetailsContainer: {
        width: '100%',
        marginBottom: 32,
    },
    successDetailItem: {
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
    successDetailText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
        flex: 1,
    },
    successSubtext: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    featureIconContainer: {
        position: 'relative',
        marginBottom: 8,
        padding: 4,
    },
    checkmark: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 8,
    },
}); 