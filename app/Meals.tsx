import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

interface Meal {
    id: number;
    name: string;
    calories: number;
    ingredients: string[];
    emojis: string[];
    time: string;
}

interface UserData {
    currentWeight?: number;
    goalWeight?: number;
    useMetric?: boolean;
    dailyTip?: string;
    gender?: string;
    exerciseFrequency?: string;
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
    const route = useRoute();
    const userData = (route.params as { userData?: UserData })?.userData || {
        currentWeight: 70,
        useMetric: true,
        gender: 'Male',
        exerciseFrequency: 'Never'
    };
    const [selectedMealType, setSelectedMealType] = useState<MealType>('All');
    const [displayedMeals, setDisplayedMeals] = useState<Meal[]>([]);

    // Calculate calories based on weight (same as Dashboard)
    const calculateCalories = (weight: number) => {
        // Ensure weight is a valid number
        const validWeight = typeof weight === 'number' && !isNaN(weight) ? weight : 70;

        // Convert weight to kg if in stone
        const weightInKg = userData.useMetric ? validWeight : validWeight * 6.35029318;

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
            default:
                activityMultiplier = 1.2;
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activityMultiplier;

        // Add a small buffer to maintenance calories to ensure proper energy levels
        const maintenanceBuffer = 200; // 200 calorie buffer for maintenance

        return Math.round(tdee + maintenanceBuffer);
    };

    const dailyTarget = calculateCalories(userData.currentWeight ?? 70);

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

    const getRandomMeals = (type: MealType, count: number = 6) => {
        const filteredMeals = type === 'All' 
            ? allMeals 
            : allMeals.filter(meal => meal.time === type);
        
        const shuffled = [...filteredMeals].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        setDisplayedMeals(getRandomMeals(selectedMealType));
    }, [selectedMealType]);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Meals</Text>
                        <TouchableOpacity 
                            style={styles.refreshButton}
                            onPress={() => setDisplayedMeals(getRandomMeals(selectedMealType))}
                        >
                            <Ionicons name="refresh" size={24} color="#FF5722" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.targetContainer}>
                        <Text style={styles.targetLabel}>Daily Target</Text>
                        <Text style={styles.targetValue}>{dailyTarget} cal</Text>
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
                                <Text style={styles.mealCalories}>{meal.calories} cal</Text>
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
        padding: 20,
        paddingTop: 40,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
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
});
