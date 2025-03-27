import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { WeightConfig, loadWeightConfig } from './config/weightConfig';

interface Meal {
    id: number;
    name: string;
    calories: number;
    ingredients: string[];
    emojis: string[];
    time: string;
    isCompleted?: boolean;
}

interface UserData {
    currentWeight: number;
    goalWeight: number;
    useMetric: boolean;
    exerciseFrequency: string;
    mealsPerDay: string;
    foodPreference: string;
    completedMeals?: { [key: string]: boolean };
    dailyCalories?: number;
}

const allMeals: Meal[] = [
    // Breakfast Meals
    {
        id: 1,
        name: "High-Protein Breakfast Bowl",
        calories: 650,
        ingredients: ["Eggs", "Oatmeal", "Banana", "Peanut Butter", "Honey"],
        emojis: ["🥚", "🥣", "🍌", "🥜", "🍯"],
        time: "Breakfast"
    },
    {
        id: 2,
        name: "Peanut Butter & Banana Toast",
        calories: 550,
        ingredients: ["Whole Grain Bread", "Peanut Butter", "Banana", "Honey", "Chia Seeds"],
        emojis: ["🍞", "🥜", "🍌", "🍯", "🌱"],
        time: "Breakfast"
    },
    {
        id: 3,
        name: "Protein Pancakes",
        calories: 600,
        ingredients: ["Protein Powder", "Oats", "Eggs", "Greek Yogurt", "Maple Syrup"],
        emojis: ["🥞", "🌾", "🥚", "🥛", "🍁"],
        time: "Breakfast"
    },
    {
        id: 4,
        name: "Breakfast Burrito",
        calories: 700,
        ingredients: ["Eggs", "Black Beans", "Avocado", "Cheese", "Whole Wheat Tortilla"],
        emojis: ["🌯", "🥚", "🫘", "🥑", "🧀"],
        time: "Breakfast"
    },
    {
        id: 5,
        name: "Greek Yogurt Parfait",
        calories: 500,
        ingredients: ["Greek Yogurt", "Granola", "Mixed Berries", "Honey", "Almonds"],
        emojis: ["🥛", "🌾", "🫐", "🍯", "🥜"],
        time: "Breakfast"
    },
    {
        id: 6,
        name: "Breakfast Quesadilla",
        calories: 650,
        ingredients: ["Eggs", "Cheese", "Spinach", "Whole Wheat Tortilla", "Salsa"],
        emojis: ["🌯", "🥚", "🧀", "🥬", "🍅"],
        time: "Breakfast"
    },
    // Lunch Meals
    {
        id: 7,
        name: "Chicken & Rice Bowl",
        calories: 850,
        ingredients: ["Chicken Breast", "Brown Rice", "Avocado", "Sweet Potato", "Olive Oil"],
        emojis: ["🍗", "🍚", "🥑", "🍠", "🫒"],
        time: "Lunch"
    },
    {
        id: 8,
        name: "Tuna Pasta Bowl",
        calories: 700,
        ingredients: ["Whole Grain Pasta", "Tuna", "Olive Oil", "Cherry Tomatoes", "Parmesan"],
        emojis: ["🍝", "🐟", "🫒", "🍅", "🧀"],
        time: "Lunch"
    },
    {
        id: 9,
        name: "Quinoa Buddha Bowl",
        calories: 750,
        ingredients: ["Quinoa", "Chickpeas", "Kale", "Sweet Potato", "Tahini Dressing"],
        emojis: ["🌾", "🫘", "🥬", "🍠", "🥄"],
        time: "Lunch"
    },
    {
        id: 10,
        name: "Turkey Wrap",
        calories: 650,
        ingredients: ["Turkey Breast", "Whole Wheat Wrap", "Hummus", "Mixed Greens", "Cucumber"],
        emojis: ["🥪", "🦃", "🥫", "🥬", "🥒"],
        time: "Lunch"
    },
    {
        id: 11,
        name: "Salmon Salad",
        calories: 600,
        ingredients: ["Salmon", "Mixed Greens", "Avocado", "Cherry Tomatoes", "Olive Oil"],
        emojis: ["🐟", "🥬", "🥑", "🍅", "🫒"],
        time: "Lunch"
    },
    {
        id: 12,
        name: "Mediterranean Bowl",
        calories: 700,
        ingredients: ["Brown Rice", "Grilled Chicken", "Feta", "Olives", "Cucumber"],
        emojis: ["🍚", "🍗", "🧀", "🫒", "🥒"],
        time: "Lunch"
    },
    // Dinner Meals
    {
        id: 13,
        name: "Protein Power Bowl",
        calories: 750,
        ingredients: ["Quinoa", "Salmon", "Kale", "Almonds", "Dried Fruit"],
        emojis: ["🌾", "🐟", "🥬", "🥜", "🍇"],
        time: "Dinner"
    },
    {
        id: 14,
        name: "Beef & Sweet Potato Bowl",
        calories: 950,
        ingredients: ["Ground Beef", "Sweet Potato", "Spinach", "Cheese", "Sour Cream"],
        emojis: ["🥩", "🍠", "🥬", "🧀", "🥛"],
        time: "Dinner"
    },
    {
        id: 15,
        name: "Grilled Chicken Pasta",
        calories: 800,
        ingredients: ["Whole Grain Pasta", "Chicken Breast", "Pesto", "Cherry Tomatoes", "Parmesan"],
        emojis: ["🍝", "🍗", "🌿", "🍅", "🧀"],
        time: "Dinner"
    },
    {
        id: 16,
        name: "Shrimp Stir Fry",
        calories: 700,
        ingredients: ["Shrimp", "Brown Rice", "Mixed Vegetables", "Soy Sauce", "Ginger"],
        emojis: ["🦐", "🍚", "🥬", "🥫", "🧄"],
        time: "Dinner"
    },
    {
        id: 17,
        name: "Turkey Meatballs",
        calories: 750,
        ingredients: ["Ground Turkey", "Whole Grain Pasta", "Marinara", "Parmesan", "Basil"],
        emojis: ["🦃", "🍝", "🍅", "🧀", "🌿"],
        time: "Dinner"
    },
    {
        id: 18,
        name: "Baked Salmon",
        calories: 650,
        ingredients: ["Salmon", "Brown Rice", "Broccoli", "Lemon", "Olive Oil"],
        emojis: ["🐟", "🍚", "🥦", "🍋", "🫒"],
        time: "Dinner"
    },
    // Snack Meals
    {
        id: 19,
        name: "Mass Gaining Smoothie",
        calories: 800,
        ingredients: ["Protein Powder", "Banana", "Oats", "Almond Milk", "Chia Seeds"],
        emojis: ["🥛", "🍌", "🌾", "🥛", "🌱"],
        time: "Snack"
    },
    {
        id: 20,
        name: "Mass Gaining Shake",
        calories: 900,
        ingredients: ["Whey Protein", "Whole Milk", "Greek Yogurt", "Frozen Berries", "Honey"],
        emojis: ["🥛", "🥛", "🥛", "🫐", "🍯"],
        time: "Snack"
    },
    {
        id: 21,
        name: "Trail Mix Bowl",
        calories: 600,
        ingredients: ["Mixed Nuts", "Dried Fruit", "Dark Chocolate", "Seeds", "Coconut"],
        emojis: ["🥜", "🍇", "🍫", "🌱", "🥥"],
        time: "Snack"
    },
    {
        id: 22,
        name: "Protein Energy Balls",
        calories: 450,
        ingredients: ["Protein Powder", "Oats", "Peanut Butter", "Honey", "Chia Seeds"],
        emojis: ["⚪", "🌾", "🥜", "🍯", "🌱"],
        time: "Snack"
    },
    {
        id: 23,
        name: "Greek Yogurt Bowl",
        calories: 500,
        ingredients: ["Greek Yogurt", "Granola", "Banana", "Honey", "Almonds"],
        emojis: ["🥛", "🌾", "🍌", "🍯", "🥜"],
        time: "Snack"
    },
    {
        id: 24,
        name: "Protein Ice Cream",
        calories: 550,
        ingredients: ["Protein Powder", "Banana", "Almond Milk", "Cocoa Powder", "Peanut Butter"],
        emojis: ["🍦", "🍌", "🥛", "🍫", "🥜"],
        time: "Snack"
    }
];

type MealType = 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export default function Meals() {
    const navigation = useNavigation();
    const route = useRoute();
    const [fadeAnim] = useState(new Animated.Value(1));
    const [userData, setUserData] = useState<UserData>({
        currentWeight: 70,
        goalWeight: 70,
        useMetric: true,
        exerciseFrequency: 'Never',
        mealsPerDay: '3 times',
        foodPreference: 'A mix of all',
        completedMeals: {},
        dailyCalories: 0
    });
    const [weightConfig, setWeightConfig] = useState<WeightConfig | null>(null);
    const [selectedMealType, setSelectedMealType] = useState<MealType>('All');
    const [displayedMeals, setDisplayedMeals] = useState<Meal[]>([]);

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        const subscription = navigation.addListener('focus', () => {
            loadUserData();
        });

        return subscription;
    }, [navigation]);

    const loadUserData = async () => {
        try {
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                // Reset daily calories and completed meals
                const updatedData = {
                    ...userData,
                    dailyCalories: 0,
                    completedMeals: {}
                };
                await SecureStore.setItemAsync('userData', JSON.stringify(updatedData));
                setUserData(updatedData);
            }
            
            // Load weight configuration
            const config = await loadWeightConfig();
            setWeightConfig(config);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const getRandomMeals = (type: MealType, count: number = 6) => {
        const filteredMeals = type === 'All' 
            ? allMeals 
            : allMeals.filter(meal => meal.time === type);
        
        const shuffled = [...filteredMeals].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    // Update displayed meals when tab changes
    useEffect(() => {
        const meals = getRandomMeals(selectedMealType);
        // Add completion status to displayed meals from userData
        const mealsWithStatus = meals.map(meal => ({
            ...meal,
            isCompleted: userData.completedMeals?.[meal.id] || false
        }));
        setDisplayedMeals(mealsWithStatus);
    }, [selectedMealType]); // Remove userData.completedMeals from dependencies

    const toggleMealCompletion = async (mealId: number) => {
        try {
            const updatedCompletedMeals = {
                ...userData.completedMeals,
                [mealId]: !userData.completedMeals?.[mealId]
            };

            // Calculate total calories from completed meals
            const totalCalories = Object.entries(updatedCompletedMeals)
                .filter(([_, isCompleted]) => isCompleted)
                .reduce((sum, [mealId]) => {
                    const meal = allMeals.find(m => m.id === parseInt(mealId));
                    return sum + (meal?.calories || 0);
                }, 0);

            const updatedData = {
                ...userData,
                completedMeals: updatedCompletedMeals,
                dailyCalories: totalCalories
            };

            await SecureStore.setItemAsync('userData', JSON.stringify(updatedData));
            setUserData(updatedData);

            // Update only the specific meal's completion status in displayed meals
            setDisplayedMeals(prevMeals => 
                prevMeals.map(meal => 
                    meal.id === mealId 
                        ? { ...meal, isCompleted: !meal.isCompleted }
                        : meal
                )
            );
        } catch (error) {
            console.error('Error updating meal completion:', error);
        }
    };

    const mealTypes: MealType[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

    const getTabStyle = (type: MealType) => {
        const colors = {
            All: '#666666',
            Breakfast: '#FF9800',
            Lunch: '#4CAF50',
            Dinner: '#2196F3',
            Snack: '#9C27B0'
        };
        return {
            borderColor: colors[type],
            backgroundColor: selectedMealType === type ? `${colors[type]}20` : 'transparent'
        };
    };

    const getTabIcon = (type: MealType) => {
        switch (type) {
            case 'All':
                return 'grid';
            case 'Breakfast':
                return 'sunny';
            case 'Lunch':
                return 'sunny-outline';
            case 'Dinner':
                return 'moon';
            case 'Snack':
                return 'cafe';
            default:
                return 'grid';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Meals 🍽️</Text>
                        <Text style={styles.headerSubtitle}>Meals for muscle and weight gain</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.refreshButton}
                        onPress={() => {
                            const meals = getRandomMeals(selectedMealType);
                            const mealsWithStatus = meals.map(meal => ({
                                ...meal,
                                isCompleted: userData.completedMeals?.[meal.id] || false
                            }));
                            setDisplayedMeals(mealsWithStatus);
                        }}
                    >
                        <Ionicons name="refresh" size={24} color="#FF5722" />
                    </TouchableOpacity>
                </View>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetLabel}>Daily Target</Text>
                    <Text style={styles.targetValue}>
                        {userData.dailyCalories || 0}/{weightConfig?.dailyTarget ?? 0} cal
                    </Text>
                    <View style={styles.progressBar}>
                        <View 
                            style={[
                                styles.progressFill, 
                                { 
                                    width: `${Math.min(100, ((userData.dailyCalories || 0) / (weightConfig?.dailyTarget || 1)) * 100)}%` 
                                }
                            ]} 
                        />
                    </View>
                </View>

                <View style={styles.tabsContainer}>
                    <View style={styles.tabs}>
                        {mealTypes.map((type) => (
                            <TouchableOpacity 
                                key={type}
                                style={[styles.tab, getTabStyle(type)]}
                                onPress={() => setSelectedMealType(type)}
                            >
                                <Ionicons 
                                    name={getTabIcon(type)} 
                                    size={16} 
                                    color={getTabStyle(type).borderColor}
                                    style={styles.tabIcon}
                                />
                                <Text style={[styles.tabText, { color: getTabStyle(type).borderColor }]}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {displayedMeals.map((meal: Meal) => (
                        <View key={meal.id} style={styles.mealCard}>
                            <View style={styles.mealHeader}>
                                <Text style={styles.mealTime}>{meal.time}</Text>
                                <View style={styles.mealHeaderRight}>
                                    <Text style={styles.mealCalories}>{meal.calories} cal</Text>
                                    <TouchableOpacity 
                                        style={[styles.checkbox, meal.isCompleted && styles.checkboxChecked]}
                                        onPress={() => toggleMealCompletion(meal.id)}
                                    >
                                        {meal.isCompleted && (
                                            <Ionicons name="checkmark" size={16} color="white" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.mealName}>{meal.name}</Text>
                            <View style={styles.ingredientsContainer}>
                                {meal.ingredients.map((ingredient: string, index: number) => (
                                    <View key={index} style={styles.ingredientItem}>
                                        <Text style={styles.ingredientEmoji}>{meal.emojis[index]}</Text>
                                        <Text style={styles.ingredientText}>{ingredient}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    refreshButton: {
        padding: 8,
    },
    targetContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
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
        margin: 16,
    },
    targetLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    targetValue: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    tabsContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    tabs: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    tabIcon: {
        marginRight: 6,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    mealCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
    },
    mealHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    mealTime: {
        fontSize: 14,
        color: '#666',
        backgroundColor: '#FFF8E7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    mealCalories: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5722',
    },
    mealName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E7',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    ingredientEmoji: {
        fontSize: 16,
        marginRight: 5,
    },
    ingredientText: {
        fontSize: 14,
        color: '#666',
    },
    mealHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FF5722',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#FF5722',
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        marginTop: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FF5722',
        borderRadius: 3,
    },
});
