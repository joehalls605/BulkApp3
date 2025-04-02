import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from './types';
import { WeightConfig, loadWeightConfig } from './config/weightConfig';

type StartJourneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StartJourney'>;

export default function StartJourney() {
    const navigation = useNavigation<StartJourneyScreenNavigationProp>();
    const [showSuccess, setShowSuccess] = useState(false);
    const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
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

        // Load the before photo from config
        const loadBeforePhoto = async () => {
            try {
                const config = await loadWeightConfig();
                if (config.beforePhoto) {
                    setBeforePhoto(config.beforePhoto);
                }
            } catch (error) {
                console.error('Error loading before photo:', error);
            }
        };
        loadBeforePhoto();
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
                        <Text style={styles.title}>You're almost ready! 📈</Text>
                    </View>

                    {beforePhoto && (
                        <View style={styles.photoContainer}>
                            <View style={styles.photoRow}>
                                <View style={styles.photoColumn}>
                                    <Text style={styles.photoLabel}>Before</Text>
                                    <Image 
                                        source={{ uri: `data:image/jpeg;base64,${beforePhoto}` }}
                                        style={styles.beforePhoto}
                                    />
                                </View>
                                <View style={styles.photoColumn}>
                                    <Text style={styles.photoLabel}>After</Text>
                                    <View style={styles.placeholderContainer}>
                                        <View style={styles.placeholderBackground}>
                                            <Ionicons name="camera" size={40} color="#666" />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    <View style={styles.featuresContainer}>
                        <Text style={styles.featuresTitle}>Bulk with the best tools 🛠️</Text>
                        <View style={styles.featuresGrid}>
                            <View style={[styles.featureCard, { borderColor: '#4CAF50', borderWidth: 1.5 }]}>
                                <View style={[styles.featureIconContainer, { backgroundColor: '#E8F5E9' }]}>
                                    <Ionicons name="restaurant" size={32} color="#4CAF50" />
                                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Meal Plans</Text>
                                <Text style={styles.featureText}>Calorie-rich recipes</Text>
                            </View>

                            <View style={[styles.featureCard, { borderColor: '#FF9800', borderWidth: 1.5 }]}>
                                <View style={[styles.featureIconContainer, { backgroundColor: '#FFF3E0' }]}>
                                    <Ionicons name="barbell" size={32} color="#FF9800" />
                                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Workout Plans</Text>
                                <Text style={styles.featureText}>Muscle growth guides</Text>
                            </View>

                            <View style={[styles.featureCard, { borderColor: '#2196F3', borderWidth: 1.5 }]}>
                                <View style={[styles.featureIconContainer, { backgroundColor: '#E3F2FD' }]}>
                                    <Ionicons name="cart" size={32} color="#2196F3" />
                                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Grocery List</Text>
                                <Text style={styles.featureText}>Ready made shopping</Text>
                            </View>

                            <View style={[styles.featureCard, { borderColor: '#9C27B0', borderWidth: 1.5 }]}>
                                <View style={[styles.featureIconContainer, { backgroundColor: '#F3E5F5' }]}>
                                    <Ionicons name="bulb" size={32} color="#9C27B0" />
                                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={styles.checkmark} />
                                </View>
                                <Text style={styles.featureTitle}>Daily Tips</Text>
                                <Text style={styles.featureText}>Bulking guidance</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.continueButton} onPress={startTrial}>
                        <Text style={styles.continueButtonText}>Start Free Trial</Text>
                        <Text style={styles.continueButtonSubtext}>£3.99/month after 7 days</Text>
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
        justifyContent: 'space-between',
        marginHorizontal: -4,
    },
    featureCard: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 12,
        margin: 4,
        width: '47%',
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
        transform: [{ scale: 1 }],
    },
    featureIconContainer: {
        position: 'relative',
        marginBottom: 6,
        padding: 6,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginTop: 4,
        marginBottom: 2,
        textAlign: 'center',
    },
    featureText: {
        fontSize: 11,
        color: '#666',
        lineHeight: 14,
        textAlign: 'center',
        fontStyle: 'italic',
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
    checkmark: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    photoContainer: {
        marginBottom: 24,
        alignItems: 'center',
    },
    photoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    photoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 12,
        width: '100%',
    },
    photoColumn: {
        width: '45%',
        alignItems: 'center',
    },
    photoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    beforePhoto: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    placeholderContainer: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F5F5F5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    placeholderBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
}); 