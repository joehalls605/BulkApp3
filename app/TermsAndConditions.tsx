import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type TermsAndConditionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TermsAndConditions'>;

export default function TermsAndConditions() {
    const navigation = useNavigation<TermsAndConditionsScreenNavigationProp>();

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