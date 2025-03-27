import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import * as SecureStore from 'expo-secure-store';

type TermsAndConditionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TermsAndConditions'>;

export default function TermsAndConditions() {
    const navigation = useNavigation<TermsAndConditionsScreenNavigationProp>();

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
                            const subscriptionData = await SecureStore.getItemAsync('subscriptionStatus');
                            const subscription = subscriptionData ? JSON.parse(subscriptionData) : null;

                            // Clear all user data except subscription
                            await SecureStore.deleteItemAsync('userData');
                            await SecureStore.deleteItemAsync('questionnaireCompleted');

                            // If there was a subscription, restore it
                            if (subscription) {
                                await SecureStore.setItemAsync('subscriptionStatus', JSON.stringify(subscription));
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
                    <Text style={styles.title}>Terms and Conditions</Text>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                        <Text style={styles.text}>
                            By accessing and using the BulkUp app, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use the app.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. Subscription Terms</Text>
                        <Text style={styles.text}>
                            • The app offers a 7-day free trial period.{'\n'}
                            • After the trial period, a subscription fee of £4/month will be charged.{'\n'}
                            • Subscriptions automatically renew unless cancelled at least 24 hours before the renewal date.{'\n'}
                            • You can manage and cancel your subscription in your device's settings.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
                        <Text style={styles.text}>
                            • You are responsible for maintaining the confidentiality of your account.{'\n'}
                            • You agree to provide accurate and complete information.{'\n'}
                            • You are responsible for all activities that occur under your account.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>4. Health Disclaimer</Text>
                        <Text style={styles.text}>
                            The app provides general information and guidance for weight gain and fitness. We recommend consulting with healthcare professionals before starting any new diet or exercise program.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>5. Data Privacy</Text>
                        <Text style={styles.text}>
                            We collect and process your personal data in accordance with our Privacy Policy. By using the app, you consent to such processing.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>6. Modifications</Text>
                        <Text style={styles.text}>
                            We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the modified terms.
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
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5722',
        marginLeft: 12,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
}); 