import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Platform, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from './types';

type SubscriptionManagementScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SubscriptionManagement'>;

export default function SubscriptionManagement() {
    const navigation = useNavigation<SubscriptionManagementScreenNavigationProp>();
    const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

    useEffect(() => {
        loadSubscriptionDetails();
    }, []);

    const loadSubscriptionDetails = async () => {
        try {
            const details = await SecureStore.getItemAsync('subscriptionDetails');
            if (details) {
                setSubscriptionDetails(JSON.parse(details));
            }
        } catch (error) {
            console.error('Error loading subscription details:', error);
        }
    };

    const handleResetDetails = async () => {
        Alert.alert(
            "Reset Your Details",
            "This will reset your app to its initial state and guide you through the questionnaire again. Your subscription status will be preserved.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Reset",
                    onPress: async () => {
                        try {
                            // Get current subscription status
                            const subscriptionData = await SecureStore.getItemAsync('subscriptionDetails');
                            const subscription = subscriptionData ? JSON.parse(subscriptionData) : null;

                            // Clear all user data except subscription
                            await SecureStore.deleteItemAsync('userData');
                            await SecureStore.deleteItemAsync('questionnaireCompleted');

                            // If there was a subscription, restore it
                            if (subscription) {
                                await SecureStore.setItemAsync('subscriptionDetails', JSON.stringify(subscription));
                            }

                            Alert.alert(
                                "Success",
                                "Your details have been reset. You will now be guided through the questionnaire again.",
                                [{ 
                                    text: "OK",
                                    onPress: () => navigation.navigate('Questionnaire')
                                }]
                            );
                        } catch (error) {
                            console.error('Error resetting details:', error);
                            Alert.alert(
                                "Error",
                                "Failed to reset your details. Please try again.",
                                [{ text: "OK" }]
                            );
                        }
                    }
                }
            ]
        );
    };

    const cancelSubscription = async () => {
        try {
            if (Platform.OS === 'ios') {
                // Open iOS subscription management
                Linking.openURL('itms-apps://apps.apple.com/account/subscriptions');
            } else {
                // Open Android subscription management
                Linking.openURL('market://subscriptions');
            }
        } catch (error) {
            console.error('Error opening subscription management:', error);
            alert('Please manage your subscription in your device settings.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Subscription</Text>
                </View>

                <ScrollView style={styles.content}>
                    {subscriptionDetails && (
                        <View style={styles.subscriptionCard}>
                            <View style={styles.subscriptionHeader}>
                                <Ionicons 
                                    name={subscriptionDetails.isTrial ? "time" : "card"} 
                                    size={32} 
                                    color="#4CAF50" 
                                />
                                <Text style={styles.subscriptionTitle}>
                                    {subscriptionDetails.isTrial ? 'Free Trial' : 'Premium Subscription'}
                                </Text>
                            </View>

                            <View style={styles.subscriptionDetails}>
                                <Text style={styles.detailLabel}>Status</Text>
                                <Text style={styles.detailValue}>
                                    {subscriptionDetails.isTrial ? 'Trial Active' : 'Active'}
                                </Text>

                                <Text style={styles.detailLabel}>Start Date</Text>
                                <Text style={styles.detailValue}>
                                    {new Date(subscriptionDetails.startDate).toLocaleDateString()}
                                </Text>

                                {subscriptionDetails.isTrial && (
                                    <>
                                        <Text style={styles.detailLabel}>Trial Ends</Text>
                                        <Text style={styles.detailValue}>
                                            {new Date(subscriptionDetails.trialEndDate).toLocaleDateString()}
                                        </Text>
                                    </>
                                )}

                                <Text style={styles.detailLabel}>Price</Text>
                                <Text style={styles.detailValue}>
                                    £{subscriptionDetails.subscriptionPrice}/{subscriptionDetails.subscriptionPeriod}
                                </Text>
                            </View>

                            <TouchableOpacity 
                                style={styles.cancelButton}
                                onPress={cancelSubscription}
                            >
                                <Text style={styles.cancelButtonText}>Manage Subscription</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity 
                        style={styles.resetButton}
                        onPress={handleResetDetails}
                    >
                        <Ionicons name="refresh-circle" size={24} color="#FF5722" />
                        <Text style={styles.resetButtonText}>Reset Your Details</Text>
                    </TouchableOpacity>

                    <View style={styles.infoSection}>
                        <Text style={styles.infoTitle}>Need Help?</Text>
                        <Text style={styles.infoText}>
                            To cancel your subscription, please use the "Manage Subscription" button above. This will take you to your device's subscription management page where you can cancel or modify your subscription.
                        </Text>
                    </View>
                </ScrollView>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    subscriptionCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
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
    subscriptionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    subscriptionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginLeft: 12,
    },
    subscriptionDetails: {
        marginBottom: 20,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
    },
    cancelButton: {
        backgroundColor: '#FF5252',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5722',
        marginLeft: 12,
    },
    infoSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
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
    infoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
}); 