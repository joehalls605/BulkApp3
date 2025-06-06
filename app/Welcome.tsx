import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <Text style={styles.title}>BulkUp 💪</Text>
                    <Text style={styles.subtitle}>Gaining weight has never been easier.</Text>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.featuresSection}>
                        <Text style={styles.sectionTitle}>All the bulking tools you need, right in your pocket 📱</Text>
                        <View style={styles.featuresGrid}>
                        <View style={styles.featureCard}>
                                <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                                    <Ionicons name="restaurant" size={24} color="#4CAF50" />
                                </View>
                                <Text style={styles.featureTitle}>Meal Plans</Text>
                                <Text style={styles.featureText}>Calorie-rich recipes</Text>
                            </View>
                        <View style={styles.featureCard}>
                                <View style={[styles.iconContainer, { backgroundColor: '#e2d9fc' }]}>
                                    <Ionicons name="compass" size={24} color="#8358fc" />
                                </View>
                                <Text style={styles.featureTitle}>Bulking Roadmap</Text>
                                <Text style={styles.featureText}>For guided success</Text>
                            </View>
                            <View style={styles.featureCard}>
                                <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                                    <Ionicons name="barbell" size={24} color="#FF9800" />
                                </View>
                                <Text style={styles.featureTitle}>Custom Workouts</Text>
                                <Text style={styles.featureText}>Tailored to your goals</Text>
                            </View>
                            <View style={styles.featureCard}>
                                <View style={[styles.iconContainer, { backgroundColor: '#d9f6ff' }]}>
                                    <Ionicons name="basket" size={24} color="#3daed1" />
                                </View>
                                <Text style={styles.featureTitle}>Grocery List</Text>
                                <Text style={styles.featureText}>No stress bulking</Text>
                            </View>
                        
                            <View style={styles.featureCard}>
                                <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                                    <Ionicons name="trending-up" size={24} color="#1976D2" />
                                </View>
                                <Text style={styles.featureTitle}>Progress Tips</Text>
                                <Text style={styles.featureText}>Grow your gains</Text>
                            </View>
                            <View style={styles.featureCard}>
                                <View style={[styles.iconContainer, { backgroundColor: '#FCE4EC' }]}>
                                    <Ionicons name="build" size={24} color="#E91E63" />
                                </View>
                                <Text style={styles.featureTitle}>Log your progress</Text>
                                <Text style={styles.featureText}>Upload your gains</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.enterButton}
                        onPress={() => navigation.navigate('Introduction')}
                    >
                        <Text style={styles.enterButtonText}>Start Gaining Weight</Text>
                        <Ionicons name="arrow-forward" size={24} color="white" style={styles.enterButtonIcon} />
                    </TouchableOpacity>


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
        padding: 20,
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    enterButton: {
        backgroundColor: '#FF5722',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#E64A19',
    },
    enterButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    enterButtonIcon: {
        marginLeft: 10,
    },
    featuresSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 25,
        marginTop: 10,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        width: '48%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    featureText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    noteSection: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    noteText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 15,
    },
    supportText: {
        fontSize: 14,
        color: '#FF5722',
        fontWeight: '500',
    },
    footer: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        marginTop: 20,
    },
}); 