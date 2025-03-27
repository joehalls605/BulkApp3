import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Animated, Platform, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
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
    const [fadeAnim] = useState(new Animated.Value(1));
    const [userData, setUserData] = useState({
        currentWeight: 70,
        goalWeight: 75,
        useMetric: true,
        gender: 'Male',
        timeframe: 12,
        exerciseFrequency: 'Never',
        mealsPerDay: '3 times',
        foodPreference: 'A mix of all'
    });
    const [dailyTip] = useState(dailyTips[Math.floor(Math.random() * dailyTips.length)]);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const storedData = await SecureStore.getItemAsync('userData');
            if (storedData) {
                setUserData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    // Calculate calories based on weight and activity level
    const calculateCalories = (weight: number) => {
        // Convert weight to kg if in stone
        const weightInKg = userData.useMetric ? weight : weight * 6.35029318;

        // Base BMR calculation (simplified without height)
        // For males: BMR = (10 × weight in kg) + 625
        // For females: BMR = (10 × weight in kg) + 625 - 161
        let bmr;
        if (userData.gender === 'Prefer not to say') {
            // Calculate average of male and female BMR
            const maleBMR = (10 * weightInKg) + 625;
            const femaleBMR = (10 * weightInKg) + 625 - 161;
            bmr = (maleBMR + femaleBMR) / 2;
        } else {
            bmr = userData.gender === 'Male' 
                ? (10 * weightInKg) + 625
                : (10 * weightInKg) + 625 - 161;
        }

        // Activity multiplier based on exercise frequency
        let activityMultiplier = 1.2; // Default sedentary
        switch (userData.exerciseFrequency) {
            case 'Never':
                activityMultiplier = 1.2;
                break;
            case 'A few times a week':
                activityMultiplier = 1.375;
                break;
            case 'Once a day':
                activityMultiplier = 1.55;
                break;
            case 'More than once a day':
                activityMultiplier = 1.725;
                break;
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activityMultiplier;

        // Calculate weight difference and monthly target
        const weightDiff = userData.goalWeight - userData.currentWeight;
        const monthlyWeightChange = weightDiff / userData.timeframe;

        // Calculate calorie adjustment based on monthly weight change
        // 1 kg of body weight is approximately 7700 calories
        // For healthy weight gain, aim for 0.5-1 kg per month
        const dailyCalorieAdjustment = (monthlyWeightChange * 7700) / 30;

        // Ensure minimum calorie surplus for weight gain
        const minCalorieSurplus = 750; // Increased minimum surplus to 750 calories
        const adjustedCalorieSurplus = Math.max(dailyCalorieAdjustment, minCalorieSurplus);

        // Add a small buffer to maintenance calories to ensure proper energy levels
        const maintenanceBuffer = 200; // 200 calorie buffer for maintenance

        return {
            maintain: Math.round(tdee + maintenanceBuffer),
            gain: Math.round(tdee + adjustedCalorieSurplus)
        };
    };

    const calories = calculateCalories(userData.currentWeight);

    const handleWeightUpdate = async (newWeight: string, isCurrent: boolean) => {
        try {
            const updatedData = {
                ...userData,
                [isCurrent ? 'currentWeight' : 'goalWeight']: parseFloat(newWeight)
            };
            await SecureStore.setItemAsync('userData', JSON.stringify(updatedData));
            setUserData(updatedData);
        } catch (error) {
            console.error('Error updating weight:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                   
                        <View style={styles.goalContainer}>
                            <Text style={styles.sectionTitle}>Your Overview 🎯</Text>
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
                            <View style={styles.progressCard}>
                                <View style={styles.progressItem}>
                                    <Text style={styles.progressLabel}>Current Weight</Text>
                                    <View style={styles.weightInputContainer}>
                                        <TextInput
                                            style={styles.weightInput}
                                            value={userData.currentWeight.toString()}
                                            onChangeText={(text) => handleWeightUpdate(text, true)}
                                            keyboardType="numeric"
                                            maxLength={3}
                                        />
                                        <Text style={styles.weightUnit}>{userData.useMetric ? 'kg' : 'stone'}</Text>
                                    </View>
                                    <Text style={styles.weightNote}>Tap to update</Text>
                                </View>
                                <View style={styles.progressItem}>
                                    <Text style={styles.progressLabel}>Goal Weight</Text>
                                    <View style={styles.weightInputContainer}>
                                        <TextInput
                                            style={styles.weightInput}
                                            value={userData.goalWeight.toString()}
                                            onChangeText={(text) => handleWeightUpdate(text, false)}
                                            keyboardType="numeric"
                                            maxLength={3}
                                        />
                                        <Text style={styles.weightUnit}>{userData.useMetric ? 'kg' : 'stone'}</Text>
                                    </View>
                                    <Text style={styles.weightNote}>Tap to update</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.toolsSection}>
                            <Text style={styles.sectionTitle}>Weight Gain Tools</Text>
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

                        <View style={styles.progressEmojiContainer}>
                                <Text style={styles.progressEmoji}>
                                    {(() => {
                                        const current = userData.currentWeight;
                                        const goal = userData.goalWeight;
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
                                        const current = userData.currentWeight;
                                        const goal = userData.goalWeight;
                                        const progress = ((current - goal) / (goal - current)) * 100;
                                        if (progress >= 100) return 'Goal Achieved!';
                                        if (progress >= 75) return 'Almost There!';
                                        if (progress >= 50) return 'Great Progress!';
                                        if (progress >= 25) return 'Keep Going!';
                                        return 'Just Starting!';
                                    })()}
                                </Text>
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