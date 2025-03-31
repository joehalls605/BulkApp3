import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Animated, Platform, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import Meals from './Meals';
import You from './You';
import { TabParamList, RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Workouts from './Workouts';

const Tab = createBottomTabNavigator<TabParamList>();
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
    const navigation = useNavigation<NavigationProp>();
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
    const [calories, setCalories] = useState({
        maintenance: 0,
        weightGain: 0
    });
    const [weightToGain, setWeightToGain] = useState(0);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setUserData(userData);
                
                // Calculate calories based on weight
                const calories = calculateCalories(userData.currentWeight, userData.goalWeight, userData.useMetric);
                setCalories(calories);
                
                // Calculate weight to gain
                const weightToGain = calculateWeightToGain(userData.currentWeight, userData.goalWeight, userData.useMetric);
                setWeightToGain(weightToGain);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const calculateCalories = (currentWeight: number, goalWeight: number, useMetric: boolean) => {
        // Convert to kg if using imperial units
        const weightInKg = useMetric ? currentWeight : currentWeight * 6.35029318;
        const goalWeightInKg = useMetric ? goalWeight : goalWeight * 6.35029318;

        // Calculate maintenance calories (30 calories per kg of body weight)
        const maintenanceCalories = Math.round(weightInKg * 30);

        // Calculate weight gain calories (maintenance + 500 calories for 0.5kg gain per week)
        const weightGainCalories = maintenanceCalories + 500;

        return {
            maintenance: maintenanceCalories,
            weightGain: weightGainCalories
        };
    };

    const calculateWeightToGain = (currentWeight: number, goalWeight: number, useMetric: boolean) => {
        const weightInKg = useMetric ? currentWeight : currentWeight * 6.35029318;
        const goalWeightInKg = useMetric ? goalWeight : goalWeight * 6.35029318;
        const weightToGain = goalWeightInKg - weightInKg;
        return useMetric ? weightToGain : weightToGain / 6.35029318;
    };

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
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>BulkUp Member 💪</Text>
                    <TouchableOpacity 
                        style={styles.profileButton}
                        onPress={() => navigation.navigate('SubscriptionManagement')}
                    >
                        <Ionicons name="person-circle" size={32} color="#333" />
                    </TouchableOpacity>
                </View>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                   
                        <View style={styles.goalContainer}>
                            <Text style={styles.sectionTitle}>Your Overview 🎯</Text>
                            <View style={styles.goalOptions}>
                                <View style={[styles.goalOption, { backgroundColor: '#E8F5FF' }]}>
                                    <View style={[styles.goalIconContainer, { backgroundColor: '#2196F3' }]}>
                                        <Ionicons name="flame" size={24} color="white" />
                                    </View>
                                    <Text style={styles.goalValue}>{calories.weightGain} cal</Text>
                                    <Text style={styles.goalText}>Gain Weight</Text>
                                    <View style={styles.goalIndicator}>
                                        <Ionicons name="trending-up" size={16} color="#2196F3" />
                                        <Text style={styles.goalIndicatorText}>Active Goal</Text>
                                    </View>
                                </View>
                                <View style={[styles.goalOption, { backgroundColor: '#F1F8E9' }]}>
                                    <View style={[styles.goalIconContainer, { backgroundColor: '#4CAF50' }]}>
                                        <Ionicons name="trending-up" size={24} color="white" />
                                    </View>
                                    <Text style={styles.goalValue}>{calories.maintenance} cal</Text>
                                    <Text style={styles.goalText}>Maintain</Text>
                                    <View style={styles.goalIndicator}>
                                        <Ionicons name="trending-up" size={16} color="#4CAF50" />
                                        <Text style={styles.goalIndicatorText}>Alternative</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.toolsSection}>
                            <Text style={styles.sectionTitle}>Weight Gain Tools 🛠️</Text>
                            <Text style={styles.toolsNote}>Use these pages for your weight gain journey</Text>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('Workouts')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                                        <Ionicons name="barbell" size={24} color="#1976D2" />
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
                                    onPress={() => navigation.navigate('Motivation')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#FCE4EC' }]}>
                                        <Ionicons name="heart" size={24} color="#E91E63" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Motivation</Text>
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
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.shoppingButton}
                            onPress={() => navigation.navigate('Shopping')}
                        >
                            <Text style={styles.shoppingButtonText}>Grocery List 📝</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.shoppingButton, { backgroundColor: '#ffffff' }]}
                            onPress={() => navigation.navigate('MealSuggestions')}
                        >
                            <Text style={styles.shoppingButtonText}>Today's Meal Ideas 🍽️</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.shoppingButton, { borderColor: '#5975ff', borderWidth: 1 }]}
                            onPress={() => navigation.navigate('QuickMeals' as never)}
                        >
                            <Text style={[styles.shoppingButtonText, { color: '#5975ff' }]}>Quick Pantry Meals 🏠</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.shoppingButton, { borderColor: '#3333ff', borderWidth: 1 }]}
                            onPress={() => navigation.navigate('LowAppetite' as never)}
                        >
                            <Text style={[styles.shoppingButtonText, { color: '#3333ff' }]}>Small Appetite Meals 🥤</Text>
                        </TouchableOpacity>

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
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Meals') {
                        iconName = focused ? 'restaurant' : 'restaurant-outline';
                    } else if (route.name === 'Workouts') {
                        iconName = focused ? 'barbell' : 'barbell-outline';
                    } else if (route.name === 'You') {
                        iconName = focused ? 'person' : 'person-outline';
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
            <Tab.Screen name="You" component={You} />
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
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        letterSpacing: -0.5,
    },
    profileButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    toolsNote: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        fontStyle: 'italic',
        lineHeight: 20,
    },
    goalContainer: {
        marginBottom: 30,
    },
    goalOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    goalOption: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    goalIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    goalValue: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 4,
        color: '#333',
    },
    goalText: {
        fontSize: 14,
        color: '#666',
        marginTop: 6,
        fontWeight: '500',
    },
    goalIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    goalIndicatorText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
        fontWeight: '500',
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
    weightDisplayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    weightDisplay: {
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
        gap: 12,
    },
    actionButton: {
        width: '47%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionButtonText: {
        fontSize: 15,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
    },
    dailyTipSection: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
    },
    tipText: {
        fontSize: 15,
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
    shoppingButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    shoppingButtonText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
