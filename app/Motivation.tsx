import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Motivation() {
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
                    <Text style={styles.headerTitle}>Success Stories</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Success Stories</Text>
                    
                    {/* Introduction */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Real People, Real Results</Text>
                        <Text style={styles.text}>
                            These stories show that with dedication and the right approach, anyone can achieve their weight gain goals. Let their journeys inspire yours.
                        </Text>
                    </View>

                    {/* Success Stories */}
                    <View style={styles.section}>
                        <View style={styles.storyCard}>
                            <View style={styles.storyHeader}>
                                <Ionicons name="person-circle" size={40} color="#FF5722" />
                                <View style={styles.storyMeta}>
                                    <Text style={styles.storyName}>Alex's Journey</Text>
                                    <Text style={styles.storyDuration}>1 Year Transformation</Text>
                                </View>
                            </View>
                            <View style={styles.storyStats}>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Starting Weight</Text>
                                    <Text style={styles.statValue}>60 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Current Weight</Text>
                                    <Text style={styles.statValue}>75 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Total Gain</Text>
                                    <Text style={styles.statValue}>+15 kg</Text>
                                </View>
                            </View>
                            <Text style={styles.storyText}>
                                "I was always the skinny kid growing up. After years of trying different approaches, I finally found what worked for me. The key was consistency and not giving up when progress was slow."
                            </Text>
                            <View style={styles.lessonsContainer}>
                                <Text style={styles.lessonsTitle}>Key Lessons:</Text>
                                <Text style={styles.lesson}>• Meal prep was crucial for consistency</Text>
                                <Text style={styles.lesson}>• Progressive overload in the gym</Text>
                                <Text style={styles.lesson}>• Tracking calories helped me eat enough</Text>
                            </View>
                        </View>

                        <View style={styles.storyCard}>
                            <View style={styles.storyHeader}>
                                <Ionicons name="person-circle" size={40} color="#FF5722" />
                                <View style={styles.storyMeta}>
                                    <Text style={styles.storyName}>Sarah's Story</Text>
                                    <Text style={styles.storyDuration}>8 Month Journey</Text>
                                </View>
                            </View>
                            <View style={styles.storyStats}>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Starting Weight</Text>
                                    <Text style={styles.statValue}>55 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Current Weight</Text>
                                    <Text style={styles.statValue}>65 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Total Gain</Text>
                                    <Text style={styles.statValue}>+10 kg</Text>
                                </View>
                            </View>
                            <Text style={styles.storyText}>
                                "The biggest challenge was overcoming my fear of gaining fat. Once I understood that muscle gain takes time and proper nutrition, I started seeing real results."
                            </Text>
                            <View style={styles.lessonsContainer}>
                                <Text style={styles.lessonsTitle}>Key Lessons:</Text>
                                <Text style={styles.lesson}>• Focus on strength training</Text>
                                <Text style={styles.lesson}>• Eat enough protein</Text>
                                <Text style={styles.lesson}>• Be patient with the process</Text>
                            </View>
                        </View>

                        <View style={styles.storyCard}>
                            <View style={styles.storyHeader}>
                                <Ionicons name="person-circle" size={40} color="#FF5722" />
                                <View style={styles.storyMeta}>
                                    <Text style={styles.storyName}>Mike's Transformation</Text>
                                    <Text style={styles.storyDuration}>2 Year Journey</Text>
                                </View>
                            </View>
                            <View style={styles.storyStats}>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Starting Weight</Text>
                                    <Text style={styles.statValue}>65 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Current Weight</Text>
                                    <Text style={styles.statValue}>85 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Total Gain</Text>
                                    <Text style={styles.statValue}>+20 kg</Text>
                                </View>
                            </View>
                            <Text style={styles.storyText}>
                                "I had many setbacks along the way, including injuries and plateaus. What kept me going was setting small, achievable goals and celebrating each milestone."
                            </Text>
                            <View style={styles.lessonsContainer}>
                                <Text style={styles.lessonsTitle}>Key Lessons:</Text>
                                <Text style={styles.lesson}>• Set realistic goals</Text>
                                <Text style={styles.lesson}>• Listen to your body</Text>
                                <Text style={styles.lesson}>• Stay consistent</Text>
                            </View>
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
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
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
    text: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    storyCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 2,
    },
    storyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    storyMeta: {
        marginLeft: 15,
    },
    storyName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    storyDuration: {
        fontSize: 14,
        color: '#666',
    },
    storyStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    stat: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    storyText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 15,
        fontStyle: 'italic',
    },
    lessonsContainer: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 8,
    },
    lessonsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    lesson: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
}); 