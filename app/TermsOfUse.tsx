import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type TermsOfUseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TermsOfUse'>;

export default function TermsOfUse() {
    const navigation = useNavigation<TermsOfUseScreenNavigationProp>();

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
                    <Text style={styles.title}>Terms of Use</Text>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. App Usage</Text>
                        <Text style={styles.text}>
                            The BulkUp app is designed to help users achieve their weight gain and fitness goals. Users agree to use the app responsibly and in accordance with these terms.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. User Conduct</Text>
                        <Text style={styles.text}>
                            Users agree to:{'\n'}
                            • Provide accurate information{'\n'}
                            • Not misuse or abuse the app{'\n'}
                            • Not attempt to reverse engineer the app{'\n'}
                            • Not share account credentials{'\n'}
                            • Use the app in compliance with all applicable laws
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. Content Guidelines</Text>
                        <Text style={styles.text}>
                            Users are responsible for any content they post or share through the app. Content must not be offensive, illegal, or infringe on others' rights.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
                        <Text style={styles.text}>
                            All content, features, and functionality of the app are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
                        <Text style={styles.text}>
                            We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the app.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
                        <Text style={styles.text}>
                            We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the app constitutes acceptance of the modified terms.
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