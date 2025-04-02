import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const tips = [
    {
        title: "Start Small",
        icon: "trending-up",
        color: "#4CAF50",
        tip: "Begin with 300 extra calories daily. Add more as your appetite grows. No need to rush!",
        emoji: "🌱"
    },
    {
        title: "Make It Easy",
        icon: "restaurant",
        color: "#FF9800",
        tip: "Keep high-calorie snacks ready (nuts, protein bars, shakes). Perfect for when you're not hungry for a full meal.",
        emoji: "🍎"
    },
    {
        title: "Stay Consistent",
        icon: "calendar",
        color: "#2196F3",
        tip: "Set reminders for meals and track your progress weekly. Small steps lead to big gains!",
        emoji: "📅"
    },
    {
        title: "Drink Your Calories",
        icon: "water",
        color: "#9C27B0",
        tip: "Smoothies and shakes are your friend! Blend milk, banana, peanut butter, and protein powder for an easy 500+ calories.",
        emoji: "🥤"
    },
    {
        title: "Prep Ahead",
        icon: "time",
        color: "#FF5722",
        tip: "Cook in bulk and freeze meals. Having healthy, calorie-rich food ready makes it much easier to stay on track!",
        emoji: "🍳"
    },
    {
        title: "Track Smart",
        icon: "analytics",
        color: "#795548",
        tip: "Use a food tracking app for the first few weeks. It helps you learn portion sizes and calorie content of foods.",
        emoji: "📊"
    }
];

const challenges = [
    {
        title: "Not Hungry?",
        icon: "nutrition",
        color: "#E91E63",
        tip: "Start with liquid calories (smoothies, shakes) and gradually add solid foods. Your appetite will build up!",
        emoji: "🥤"
    },
    {
        title: "Can't Eat Enough?",
        icon: "flash",
        color: "#FF5722",
        tip: "Add calorie-dense foods: olive oil, peanut butter, nuts, avocados. A tablespoon of oil adds 120 calories!",
        emoji: "⚡"
    },
    {
        title: "Getting Full Too Fast?",
        icon: "time",
        color: "#9C27B0",
        tip: "Eat smaller meals more often (5-6 times daily) instead of 3 large ones. Much easier on your stomach!",
        emoji: "⏰"
    },
    {
        title: "No Time to Cook?",
        icon: "fast-food",
        color: "#4CAF50",
        tip: "Stock up on healthy ready meals, canned tuna, and quick-cook rice. Quick meals don't have to be unhealthy!",
        emoji: "🍱"
    },
    {
        title: "Struggling with Protein?",
        icon: "barbell",
        color: "#2196F3",
        tip: "Try protein shakes between meals. One shake can add 30g protein and 200+ calories to your daily total!",
        emoji: "💪"
    },
    {
        title: "Budget Concerns?",
        icon: "wallet",
        color: "#795548",
        tip: "Focus on affordable staples: eggs, rice, oats, peanut butter. These are cheap but packed with calories and nutrients!",
        emoji: "💰"
    }
];

const basics = [
    {
        title: "Your Daily Target",
        icon: "calculator",
        color: "#FF5722",
        tip: "Add 300-500 calories to your maintenance. That's about 1-2 extra snacks or a bigger meal!",
        emoji: "🎯"
    },
    {
        title: "Protein Power",
        icon: "barbell",
        color: "#2196F3",
        tip: "Aim for 1.6-2.2g protein per kg of body weight. This helps build muscle, not just fat!",
        emoji: "💪"
    },
    {
        title: "Rest & Grow",
        icon: "bed",
        color: "#795548",
        tip: "Sleep 7-9 hours. Your body needs rest to build muscle and recover properly!",
        emoji: "😴"
    },
    {
        title: "Meal Timing",
        icon: "time",
        color: "#4CAF50",
        tip: "Eat every 3-4 hours. This keeps your energy up and helps you hit your calorie goals!",
        emoji: "⏰"
    },
    {
        title: "Smart Carbs",
        icon: "nutrition",
        color: "#9C27B0",
        tip: "Choose complex carbs: oats, rice, potatoes. They're filling and provide steady energy throughout the day.",
        emoji: "🍚"
    },
    {
        title: "Healthy Fats",
        icon: "heart",
        color: "#E91E63",
        tip: "Include healthy fats: olive oil, avocados, nuts. They're calorie-dense and good for your health!",
        emoji: "🥑"
    }
];

export default function WeightGuide() {
    const router = useRouter();
    const [scrollY] = useState(new Animated.Value(0));
    const [activeSection, setActiveSection] = useState('basics');

    const headerScale = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -20],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <Animated.View style={[styles.header, {
                    transform: [
                        { scale: headerScale },
                        { translateY: headerTranslateY }
                    ]
                }]}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Challenges</Text>
                </Animated.View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, activeSection === 'basics' && styles.activeTab]}
                        onPress={() => setActiveSection('basics')}
                    >
                        <Text style={[styles.tabText, activeSection === 'basics' && styles.activeTabText]}>Basics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeSection === 'challenges' && styles.activeTab]}
                        onPress={() => setActiveSection('challenges')}
                    >
                        <Text style={[styles.tabText, activeSection === 'challenges' && styles.activeTabText]}>Challenges</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeSection === 'tips' && styles.activeTab]}
                        onPress={() => setActiveSection('tips')}
                    >
                        <Text style={[styles.tabText, activeSection === 'tips' && styles.activeTabText]}>Pro Tips</Text>
                    </TouchableOpacity>
                </View>

                <Animated.ScrollView 
                    style={styles.scrollView} 
                    contentContainerStyle={styles.scrollContent}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    {activeSection === 'basics' && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>The Essentials</Text>
                            {basics.map((basic, index) => (
                                <View key={index} style={styles.stepCard}>
                                    <View style={styles.stepHeader}>
                                        <View style={[styles.iconContainer, { backgroundColor: `${basic.color}20` }]}>
                                            <Text style={styles.stepEmoji}>{basic.emoji}</Text>
                                            <Ionicons name={basic.icon as any} size={24} color={basic.color} />
                                        </View>
                                        <View style={styles.stepTitleContainer}>
                                            <Text style={styles.stepTitle}>{basic.title}</Text>
                                            <Text style={styles.stepSubtitle}>{basic.tip}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {activeSection === 'challenges' && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Common Challenges</Text>
                            {challenges.map((challenge, index) => (
                                <View key={index} style={styles.challengeCard}>
                                    <View style={styles.challengeHeader}>
                                        <View style={[styles.iconContainer, { backgroundColor: `${challenge.color}20` }]}>
                                            <Text style={styles.challengeEmoji}>{challenge.emoji}</Text>
                                            <Ionicons name={challenge.icon as any} size={24} color={challenge.color} />
                                        </View>
                                        <View style={styles.challengeTitleContainer}>
                                            <Text style={styles.challengeTitle}>{challenge.title}</Text>
                                            <Text style={styles.challengeTip}>{challenge.tip}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {activeSection === 'tips' && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Pro Tips</Text>
                            {tips.map((tip, index) => (
                                <View key={index} style={styles.tipCard}>
                                    <View style={styles.tipHeader}>
                                        <View style={[styles.iconContainer, { backgroundColor: `${tip.color}20` }]}>
                                            <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                                            <Ionicons name={tip.icon as any} size={24} color={tip.color} />
                                        </View>
                                        <View style={styles.tipTitleContainer}>
                                            <Text style={styles.tipTitle}>{tip.title}</Text>
                                            <Text style={styles.tipText}>{tip.tip}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </Animated.ScrollView>
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
        paddingTop: Platform.OS === 'ios' ? 60 : 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.06)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.06)',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 4,
    },
    activeTab: {
        backgroundColor: '#4CAF50',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: 'white',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    stepCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        position: 'relative',
    },
    stepEmoji: {
        position: 'absolute',
        top: -8,
        right: -8,
        fontSize: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    stepTitleContainer: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    stepSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    challengeCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    challengeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    challengeEmoji: {
        position: 'absolute',
        top: -8,
        right: -8,
        fontSize: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    challengeTitleContainer: {
        flex: 1,
    },
    challengeTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    challengeTip: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    tipCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipEmoji: {
        position: 'absolute',
        top: -8,
        right: -8,
        fontSize: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    tipTitleContainer: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    tipText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
}); 