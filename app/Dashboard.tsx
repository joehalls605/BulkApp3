import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Animated, Platform, TextInput, Alert } from 'react-native';
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
import { loadWeightConfig, updateWeightConfig } from './config/weightConfig';

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
            // Load weight configuration first
            const config = await loadWeightConfig();
            
            // Load user data
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                
                // Update user data with latest config values
                const updatedUserData = {
                    ...userData,
                    currentWeight: config.currentWeight,
                    goalWeight: config.goalWeight,
                    useMetric: config.useMetric,
                    timeframe: config.timeframe,
                    dailyCalories: config.dailyTarget,
                    maintenanceCalories: config.maintenanceCalories,
                    weightGainCalories: config.weightGainCalories
                };
                
                // Save updated user data
                await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
                
                // Update state with latest values
                setUserData(updatedUserData);
                
                // Set calories from config
                setCalories({
                    maintenance: Math.round(config.maintenanceCalories),
                    weightGain: Math.round(config.weightGainCalories)
                });
                
                // Calculate weight to gain
                const weightToGain = calculateWeightToGain(config.currentWeight, config.goalWeight, config.useMetric);
                setWeightToGain(weightToGain);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    // Add focus listener to reload data when returning to Dashboard
    useEffect(() => {
        const subscription = navigation.addListener('focus', () => {
            loadUserData();
        });

        return subscription;
    }, [navigation]);

    const calculateWeightToGain = (currentWeight: number, goalWeight: number, useMetric: boolean) => {
        const weightInKg = useMetric ? currentWeight : currentWeight * 6.35029318;
        const goalWeightInKg = useMetric ? goalWeight : goalWeight * 6.35029318;
        const weightToGain = goalWeightInKg - weightInKg;
        return useMetric ? weightToGain : weightToGain / 6.35029318;
    };

    const handleWeightUpdate = async (newWeight: string, isCurrent: boolean) => {
        try {
            const weight = parseFloat(newWeight);
            if (isNaN(weight) || weight <= 0) {
                Alert.alert('Invalid Weight', 'Please enter a valid weight');
                return;
            }

            // Convert stone to kg if using imperial
            const weightInKg = userData.useMetric ? weight : weight * 14 / 2.20462;

            // Update weight config
            const updatedConfig = await updateWeightConfig(
                isCurrent ? weightInKg : userData.currentWeight,
                isCurrent ? userData.goalWeight : weightInKg,
                userData.useMetric,
                userData.exerciseFrequency,
                userData.mealsPerDay,
                userData.foodPreference,
                userData.timeframe
            );

            // Update user data
            const updatedData = {
                ...userData,
                [isCurrent ? 'currentWeight' : 'goalWeight']: weightInKg,
                dailyCalories: Math.round(updatedConfig.dailyTarget),
                maintenanceCalories: Math.round(updatedConfig.maintenanceCalories),
                weightGainCalories: Math.round(updatedConfig.weightGainCalories)
            };
            await SecureStore.setItemAsync('userData', JSON.stringify(updatedData));
            setUserData(updatedData);

            // Update calories display with rounded values
            setCalories({
                maintenance: Math.round(updatedConfig.maintenanceCalories),
                weightGain: Math.round(updatedConfig.weightGainCalories)
            });
        } catch (error) {
            console.error('Error updating weight:', error);
            Alert.alert('Error', 'Failed to update weight. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>BulkUp Member ⭐</Text>
                    <TouchableOpacity 
                        style={styles.profileButton}
                        onPress={() => navigation.navigate('SubscriptionManagement')}
                    >
                        <Ionicons name="person-circle" size={32} color="#333" />
                    </TouchableOpacity>
                </View>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.toolsSection}>
                            <Text style={styles.sectionTitle}>Learn how to...</Text>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('Workouts')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                                        <Ionicons name="barbell" size={24} color="#1976D2" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Gain Muscle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('Meals')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                                        <Ionicons name="restaurant" size={24} color="#4CAF50" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Bulk Eat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('Motivation')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#FCE4EC' }]}>
                                        <Ionicons name="heart" size={24} color="#E91E63" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Motivate Better</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('WeightGuide')}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                                        <Ionicons name="book" size={24} color="#1976D2" />
                                    </View>
                                    <Text style={styles.actionButtonText}>Bulk Educate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.sectionTitle}>Weight Gain Tools 🛠️</Text>
                        <TouchableOpacity 
                            style={[styles.shoppingButton, { borderColor: '#FF5722' }]}
                            onPress={() => navigation.navigate('Shopping')}
                        >
                            <Text style={styles.shoppingButtonText}>Gains Grocery List 📝</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.shoppingButton, { borderColor: '#4CAF50' }]}
                            onPress={() => navigation.navigate('MealSuggestions')}
                        >
                            <Text style={styles.shoppingButtonText}>What to eat today 🍽️</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.shoppingButton, { borderColor: '#5975ff' }]}
                            onPress={() => navigation.navigate('QuickMeals' as never)}
                        >
                            <Text style={styles.shoppingButtonText}>Meals from the cupboard 🏠</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.shoppingButton, { borderColor: '#3333ff' }]}
                            onPress={() => navigation.navigate('LowAppetite' as never)}
                        >
                            <Text style={styles.shoppingButtonText}>Small appetite meals 🥤</Text>
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
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    profileButton: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 20,
        letterSpacing: -0.5,
    },
    toolsNote: {
        fontSize: 15,
        color: '#666',
        marginBottom: 24,
        fontStyle: 'italic',
        lineHeight: 22,
    },
    goalContainer: {
        marginBottom: 36,
    },
    goalOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    goalOption: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    goalIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    goalValue: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 4,
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    goalText: {
        fontSize: 15,
        color: '#666',
        marginTop: 8,
        fontWeight: '500',
    },
    goalIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 14,
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
    },
    goalIndicatorText: {
        fontSize: 13,
        color: '#666',
        marginLeft: 6,
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
        marginBottom: 36,
    },
    actionButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    actionButton: {
        width: '47%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    actionButtonText: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '600',
        textAlign: 'center',
    },
    dailyTipSection: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginTop: 12,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    tipTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
        marginLeft: 12,
    },
    tipText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 26,
        letterSpacing: 0.2,
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
        paddingHorizontal: 28,
        paddingVertical: 20,
        borderRadius: 20,
        marginBottom: 24,
        alignItems: 'center',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        transform: [{ scale: 1 }],
    },
    shoppingButtonText: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: '#1a1a1a',
    },
});
