import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function WeightGuide() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>How to Gain Weight</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Steps</Text>
                        <View style={styles.stepCard}>
                            <View style={styles.stepHeader}>
                                <Ionicons name="calculator-outline" size={24} color="#FF5722" />
                                <Text style={styles.stepTitle}>Calculate Your Needs</Text>
                            </View>
                            <Text style={styles.stepText}>Start by calculating your daily calorie needs and add 500 calories for steady weight gain.</Text>
                        </View>

                        <View style={styles.stepCard}>
                            <View style={styles.stepHeader}>
                                <Ionicons name="time-outline" size={24} color="#FF5722" />
                                <Text style={styles.stepTitle}>Eat More Frequently</Text>
                            </View>
                            <Text style={styles.stepText}>Aim for 5-6 meals throughout the day instead of 3 large meals.</Text>
                        </View>

                        <View style={styles.stepCard}>
                            <View style={styles.stepHeader}>
                                <Ionicons name="barbell-outline" size={24} color="#FF5722" />
                                <Text style={styles.stepTitle}>Strength Training</Text>
                            </View>
                            <Text style={styles.stepText}>Focus on compound exercises to build muscle mass effectively.</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Common Challenges</Text>
                        <View style={styles.challengeCard}>
                            <View style={styles.challengeHeader}>
                                <Text style={styles.challengeEmoji}>🍽️</Text>
                                <Text style={styles.challengeTitle}>Small Appetite</Text>
                            </View>
                            <Text style={styles.challengeText}>"I struggled to eat enough calories at first. Starting with smaller, more frequent meals helped me build up my appetite gradually." - Mike, gained 15kg</Text>
                        </View>

                        <View style={styles.challengeCard}>
                            <View style={styles.challengeHeader}>
                                <Text style={styles.challengeEmoji}>⚡</Text>
                                <Text style={styles.challengeTitle}>Fast Metabolism</Text>
                            </View>
                            <Text style={styles.challengeText}>"Adding calorie-dense foods like nuts and avocados to my meals made it easier to meet my calorie goals." - Sarah, gained 10kg</Text>
                        </View>

                        <View style={styles.challengeCard}>
                            <View style={styles.challengeHeader}>
                                <Text style={styles.challengeEmoji}>🎯</Text>
                                <Text style={styles.challengeTitle}>Staying Consistent</Text>
                            </View>
                            <Text style={styles.challengeText}>"Meal prep was a game-changer. Having healthy, calorie-rich meals ready made it much easier to stay on track." - Alex, gained 12kg</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pro Tips</Text>
                        <View style={styles.tipCard}>
                            <View style={styles.tipHeader}>
                                <Ionicons name="bulb-outline" size={24} color="#FF5722" />
                                <Text style={styles.tipTitle}>Smart Eating</Text>
                            </View>
                            <Text style={styles.tipText}>"I started adding olive oil to my meals and drinking whole milk instead of skim. These small changes added up to 500 extra calories daily!" - James, gained 8kg</Text>
                        </View>

                        <View style={styles.tipCard}>
                            <View style={styles.tipHeader}>
                                <Ionicons name="trending-up-outline" size={24} color="#FF5722" />
                                <Text style={styles.tipTitle}>Track Progress</Text>
                            </View>
                            <Text style={styles.tipText}>"Using a food tracking app helped me ensure I was consistently hitting my calorie goals. It made all the difference!" - Emma, gained 7kg</Text>
                        </View>

                        <View style={styles.tipCard}>
                            <View style={styles.tipHeader}>
                                <Ionicons name="restaurant-outline" size={24} color="#FF5722" />
                                <Text style={styles.tipTitle}>Meal Timing</Text>
                            </View>
                            <Text style={styles.tipText}>"Eating a large meal right after my workout helped me pack on muscle. The post-workout window is crucial!" - Tom, gained 13kg</Text>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
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
        padding: 20,
        paddingTop: 40,
        backgroundColor: 'transparent',
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    stepCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
    },
    stepText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    challengeCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
    },
    challengeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    challengeEmoji: {
        fontSize: 24,
        marginRight: 10,
    },
    challengeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    challengeText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        fontStyle: 'italic',
    },
    tipCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
    },
    tipText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        fontStyle: 'italic',
    },
}); 