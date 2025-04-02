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
                    {/* Introduction */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Real Results. You can do it too 💪</Text>
                        <Text style={styles.text}>
                            These stories show that with dedication and the right approach, anyone can achieve their weight gain goals.
                        </Text>
                    </View>

                    {/* Success Stories */}
                    <View style={styles.section}>
                        <View style={styles.storyCard}>
                            <View style={styles.storyHeader}>
                                <Ionicons name="person-circle" size={40} color="#81d169" />
                                <View style={styles.storyMeta}>
                                    <Text style={styles.storyName}>James's Journey</Text>
                                    <Text style={styles.storyDuration}>18 Month Transformation</Text>
                                </View>
                            </View>
                            <View style={styles.storyStats}>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Starting Weight</Text>
                                    <Text style={styles.statValue}>58 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Current Weight</Text>
                                    <Text style={styles.statValue}>78 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Total Gain</Text>
                                    <Text style={styles.statValue}>+20 kg</Text>
                                </View>
                            </View>
                            <Text style={styles.storyText}>
                                "I was tired of feeling self-conscious. The first few months were rough. There were days I wanted to quit, especially when the scale barely moved. But I kept showing up, even when it sucked. The biggest game-changer was meal prep - I started cooking in bulk on Sundays, which saved me from countless last-minute fast food runs. Now, I actually enjoy eating and feel proud of my progress."
                            </Text>
                            <View style={styles.lessonsContainer}>
                                <Text style={styles.lessonsTitle}>Key Lessons:</Text>
                                <Text style={styles.lesson}>• Start small with calories - don't jump straight to 4000</Text>
                                <Text style={styles.lesson}>• Meal prep is non-negotiable for consistency</Text>
                                <Text style={styles.lesson}>• Track everything, even when it's embarrassing</Text>
                            </View>
                        </View>

                        <View style={styles.storyCard}>
                            <View style={styles.storyHeader}>
                                <Ionicons name="person-circle" size={40} color="#FF5722" />
                                <View style={styles.storyMeta}>
                                    <Text style={styles.storyName}>Emma's Story</Text>
                                    <Text style={styles.storyDuration}>2 Year Journey</Text>
                                </View>
                            </View>
                            <View style={styles.storyStats}>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Starting Weight</Text>
                                    <Text style={styles.statValue}>52 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Current Weight</Text>
                                    <Text style={styles.statValue}>68 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Total Gain</Text>
                                    <Text style={styles.statValue}>+16 kg</Text>
                                </View>
                            </View>
                            <Text style={styles.storyText}>
                                "As a woman, I struggled with the stigma around gaining weight. My friends didn't understand why I wanted to get bigger, and I had to deal with a lot of unsolicited advice. The first year was full of ups and downs - I'd gain a few kg, then lose it when life got busy. What finally worked was finding a supportive community and learning to lift heavy. Now I'm stronger than ever and love how I look. The best part? I can finally do pull-ups!"
                            </Text>
                            <View style={styles.lessonsContainer}>
                                <Text style={styles.lessonsTitle}>Key Lessons:</Text>
                                <Text style={styles.lesson}>• Surround yourself with supportive people</Text>
                                <Text style={styles.lesson}>• Don't let social pressure derail your goals</Text>
                                <Text style={styles.lesson}>• Focus on strength gains, not just the scale</Text>
                            </View>
                        </View>

                        <View style={styles.storyCard}>
                            <View style={styles.storyHeader}>
                                <Ionicons name="person-circle" size={40} color="#388eff" />
                                <View style={styles.storyMeta}>
                                    <Text style={styles.storyName}>David's Transformation</Text>
                                    <Text style={styles.storyDuration}>3 Year Journey</Text>
                                </View>
                            </View>
                            <View style={styles.storyStats}>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Starting Weight</Text>
                                    <Text style={styles.statValue}>62 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Current Weight</Text>
                                    <Text style={styles.statValue}>88 kg</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statLabel}>Total Gain</Text>
                                    <Text style={styles.statValue}>+26 kg</Text>
                                </View>
                            </View>
                            <Text style={styles.storyText}>
                                "I was the classic hardgainer who could eat anything and never gain weight. The first year was frustrating - I was eating everything in sight but barely gaining. Then I got serious about tracking macros and progressive overload. There were plenty of setbacks: injuries, work stress, and even a breakup that made me lose 5kg. But each time I came back stronger. The key was learning to eat smarter, not just more. Now I'm helping others avoid the mistakes I made early on."
                            </Text>
                            <View style={styles.lessonsContainer}>
                                <Text style={styles.lessonsTitle}>Key Lessons:</Text>
                                <Text style={styles.lesson}>• Track macros, not just calories</Text>
                                <Text style={styles.lesson}>• Don't rush the process - slow gains are better</Text>
                                <Text style={styles.lesson}>• Learn from setbacks instead of giving up</Text>
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