import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Animated, Platform, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Meals from './Meals';
import Workouts from './Workouts';

const Tab = createBottomTabNavigator();

const dailyTips = [
    "Try adding a tablespoon of olive oil to your meals for extra calories",
    "Eat protein-rich foods first to help build muscle mass",
    "Consider drinking your calories with healthy smoothies",
    "Track your progress weekly, not daily",
    "Stay hydrated - it helps with appetite and digestion",
    "Get enough sleep - it's crucial for muscle growth",
    "Eat before and after workouts for optimal results",
    "Include healthy fats like avocados and nuts in your diet",
    "Try eating smaller meals more frequently",
    "Don't skip breakfast - it sets the tone for your day"
];

function HomeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const userData = route.params?.userData || {};
    const [fadeAnim] = useState(new Animated.Value(1));
    const [currentWeight, setCurrentWeight] = useState(userData.currentWeight?.toString() || '70');
    const [goalWeight, setGoalWeight] = useState(userData.goalWeight?.toString() || '75');
    const [dailyTip] = useState(dailyTips[Math.floor(Math.random() * dailyTips.length)]);

    // Calculate calories based on weight (simple estimation)
    const calculateCalories = (weight: number) => {
        // Basic BMR calculation (Mifflin-St Jeor Equation)
        const bmr = (10 * weight) + 625; // Simplified for example
        return {
            maintain: Math.round(bmr * 1.2), // Sedentary activity level
            gain: Math.round(bmr * 1.4) // Moderate activity level with surplus
        };
    };

    const calories = calculateCalories(parseFloat(currentWeight));

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Your Dashboard</Text>
                            <Text style={styles.headerSubtitle}>Track your progress and stay motivated</Text>
                        </View>

                        <View style={styles.goalContainer}>
                            <Text style={styles.sectionTitle}>Your Goal</Text>
                            <View style={styles.goalOptions}>
                                <TouchableOpacity style={[styles.goalOption, { backgroundColor: '#E3F2FD' }]} onPress={() => navigation.navigate('Meals')}>
                                    <Ionicons name="flame-outline" size={24} color="#1976D2" />
                                    <Text style={styles.goalValue}>{calories.gain} cal</Text>
                                    <Text style={styles.goalText}>Gain Weight</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.goalOption, { backgroundColor: '#E8F5E9' }]} onPress={() => navigation.navigate('Meals')}>
                                    <Ionicons name="trending-up-outline" size={24} color="#2E7D32" />
                                    <Text style={styles.goalValue}>{calories.maintain} cal</Text>
                                    <Text style={styles.goalText}>Maintain</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.progressSection}>
                            <Text style={styles.sectionTitle}>Your Progress</Text>
                            <View style={styles.progressCard}>
                                <View style={styles.progressItem}>
                                    <Text style={styles.progressLabel}>Current Weight</Text>
                                    <View style={styles.weightInputContainer}>
                                        <TextInput
                                            style={styles.weightInput}
                                            value={currentWeight}
                                            onChangeText={setCurrentWeight}
                                            keyboardType="numeric"
                                            maxLength={3}
                                        />
                                        <Text style={styles.weightUnit}>kg</Text>
                                    </View>
                                    <Text style={styles.weightNote}>Tap to update</Text>
                                </View>
                                <View style={styles.progressItem}>
                                    <Text style={styles.progressLabel}>Goal Weight</Text>
                                    <View style={styles.weightInputContainer}>
                                        <TextInput
                                            style={styles.weightInput}
                                            value={goalWeight}
                                            onChangeText={setGoalWeight}
                                            keyboardType="numeric"
                                            maxLength={3}
                                        />
                                        <Text style={styles.weightUnit}>kg</Text>
                                    </View>
                                    <Text style={styles.weightNote}>Tap to update</Text>
                                </View>
                            </View>
                            <View style={styles.progressEmojiContainer}>
                                <Text style={styles.progressEmoji}>
                                    {(() => {
                                        const current = parseFloat(currentWeight);
                                        const goal = parseFloat(goalWeight);
                                        const progress = ((current - goal) / (goal - current)) * 100;
                                        if (progress >= 100) return '🎉';
                                        if (progress >= 75) return '💪';
                                        if (progress >= 50) return '🔥';
                                        if (progress >= 25) return '⭐';
                                        return '🌱';
                                    })()}
                                </Text>
                                <Text style={styles.progressText}>
                                    {(() => {
                                        const current = parseFloat(currentWeight);
                                        const goal = parseFloat(goalWeight);
                                        const progress = ((current - goal) / (goal - current)) * 100;
                                        if (progress >= 100) return 'Goal Achieved!';
                                        if (progress >= 75) return 'Almost There!';
                                        if (progress >= 50) return 'Great Progress!';
                                        if (progress >= 25) return 'Keep Going!';
                                        return 'Just Starting!';
                                    })()}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.toolsSection}>
                            <Text style={styles.sectionTitle}>Your Weight Gain Tools</Text>
                            <Text style={styles.toolsNote}>Use these pages for your weight gain journey</Text>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('Workouts')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                                        <Ionicons name="barbell" size={24} color="#FF9800" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Workouts</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('Meals')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                                        <Ionicons name="restaurant" size={24} color="#4CAF50" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Meals</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('WeightGuide')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                                        <Ionicons name="book" size={24} color="#1976D2" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Weight Guide</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('Motivation')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#FCE4EC' }]}>
                                        <Ionicons name="heart" size={24} color="#E91E63" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Motivation</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.dailyTipSection}>
                            <View style={styles.tipHeader}>
                                <Ionicons name="bulb" size={24} color="#FF9800" />
                                <Text style={styles.tipTitle}>Daily Tip</Text>
                            </View>
                            <Text style={styles.tipText}>{dailyTip}</Text>
                        </View>
                    </ScrollView>
                </Animated.View>
            </LinearGradient>
        </SafeAreaView>
    );
}

export default function Dashboard() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Meals') {
                        iconName = focused ? 'restaurant' : 'restaurant-outline';
                    } else if (route.name === 'Workouts') {
                        iconName = focused ? 'barbell' : 'barbell-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Meals" component={Meals} />
            <Tab.Screen name="Workouts" component={Workouts} />
        </Tab.Navigator>
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
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    toolsNote: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
        fontStyle: 'italic',
    },
    goalContainer: {
        marginBottom: 30,
    },
    goalOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    goalOption: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
    },
    goalValue: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 8,
    },
    goalText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    progressSection: {
        marginBottom: 30,
    },
    progressCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 2,
    },
    progressItem: {
        alignItems: 'center',
        flex: 1,
    },
    progressLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    weightInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    weightInput: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        width: 60,
        padding: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    weightUnit: {
        fontSize: 16,
        color: '#666',
        marginLeft: 4,
    },
    weightNote: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        fontStyle: 'italic',
    },
    toolsSection: {
        marginBottom: 30,
    },
    actionButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionButton: {
        width: '48%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF5E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionButtonText: {
        marginTop: 8,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    dailyTipSection: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        elevation: 2,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
    },
    tipText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    progressEmojiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        backgroundColor: '#FFF8E7',
        padding: 10,
        borderRadius: 8,
    },
    progressEmoji: {
        fontSize: 24,
        marginRight: 10,
    },
    progressText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
});