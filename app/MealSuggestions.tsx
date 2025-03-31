import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { allMeals } from './data/meals';

interface Meal {
    id: number;
    name: string;
    calories: number;
    ingredients: string[];
    emojis: string[];
    time: string;
    dietaryTags?: string[];
}

export default function MealSuggestions() {
    const navigation = useNavigation();
    const [dailyPlan, setDailyPlan] = useState<{
        breakfast: Meal;
        lunch: Meal;
        dinner: Meal;
        snacks: Meal[];
    } | null>(null);
    const [totalCalories, setTotalCalories] = useState(0);

    const generateDailyPlan = () => {
        // Get random breakfast
        const breakfasts = allMeals.filter((meal: Meal) => meal.time === 'Breakfast');
        const breakfast = breakfasts[Math.floor(Math.random() * breakfasts.length)];

        // Get random lunch
        const lunches = allMeals.filter((meal: Meal) => meal.time === 'Lunch');
        const lunch = lunches[Math.floor(Math.random() * lunches.length)];

        // Get random dinner
        const dinners = allMeals.filter((meal: Meal) => meal.time === 'Dinner');
        const dinner = dinners[Math.floor(Math.random() * dinners.length)];

        // Get random snacks
        const snacks = allMeals.filter((meal: Meal) => meal.time === 'Snack');
        const selectedSnacks = [];
        for (let i = 0; i < 3; i++) {
            const randomSnack = snacks[Math.floor(Math.random() * snacks.length)];
            selectedSnacks.push(randomSnack);
        }

        const plan = {
            breakfast,
            lunch,
            dinner,
            snacks: selectedSnacks
        };

        const total = breakfast.calories + lunch.calories + dinner.calories + 
                     selectedSnacks.reduce((sum, snack) => sum + snack.calories, 0);

        setDailyPlan(plan);
        setTotalCalories(total);
    };

    useEffect(() => {
        generateDailyPlan();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#666" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>What Should I Eat?</Text>
                    <TouchableOpacity 
                        style={styles.refreshButton}
                        onPress={generateDailyPlan}
                    >
                        <Ionicons name="refresh" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.caloriesContainer}>
                        <Ionicons name="flame" size={24} color="#FF5722" style={styles.caloriesIcon} />
                        <Text style={styles.caloriesTitle}>Total Calories</Text>
                        <Text style={styles.caloriesValue}>{totalCalories}</Text>
                    </View>

                    {dailyPlan && (
                        <>
                            <View style={styles.mealSection}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="sunny" size={24} color="#FF9800" />
                                    <Text style={styles.sectionTitle}>Breakfast</Text>
                                </View>
                                <View style={styles.mealCard}>
                                    <Text style={styles.mealName}>{dailyPlan.breakfast.name}</Text>
                                    <Text style={styles.mealCalories}>{dailyPlan.breakfast.calories} cal</Text>
                                    <View style={styles.ingredientsContainer}>
                                        {dailyPlan.breakfast.ingredients.map((ingredient: string, index: number) => (
                                            <View key={index} style={styles.ingredientItem}>
                                                <Text style={styles.ingredientEmoji}>{dailyPlan.breakfast.emojis[index]}</Text>
                                                <Text style={styles.ingredientText}>{ingredient}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>

                            <View style={styles.mealSection}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="sunny-outline" size={24} color="#4CAF50" />
                                    <Text style={styles.sectionTitle}>Lunch</Text>
                                </View>
                                <View style={styles.mealCard}>
                                    <Text style={styles.mealName}>{dailyPlan.lunch.name}</Text>
                                    <Text style={styles.mealCalories}>{dailyPlan.lunch.calories} cal</Text>
                                    <View style={styles.ingredientsContainer}>
                                        {dailyPlan.lunch.ingredients.map((ingredient: string, index: number) => (
                                            <View key={index} style={styles.ingredientItem}>
                                                <Text style={styles.ingredientEmoji}>{dailyPlan.lunch.emojis[index]}</Text>
                                                <Text style={styles.ingredientText}>{ingredient}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>

                            <View style={styles.mealSection}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="moon" size={24} color="#2196F3" />
                                    <Text style={styles.sectionTitle}>Dinner</Text>
                                </View>
                                <View style={styles.mealCard}>
                                    <Text style={styles.mealName}>{dailyPlan.dinner.name}</Text>
                                    <Text style={styles.mealCalories}>{dailyPlan.dinner.calories} cal</Text>
                                    <View style={styles.ingredientsContainer}>
                                        {dailyPlan.dinner.ingredients.map((ingredient: string, index: number) => (
                                            <View key={index} style={styles.ingredientItem}>
                                                <Text style={styles.ingredientEmoji}>{dailyPlan.dinner.emojis[index]}</Text>
                                                <Text style={styles.ingredientText}>{ingredient}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>

                            <View style={styles.mealSection}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="cafe" size={24} color="#9C27B0" />
                                    <Text style={styles.sectionTitle}>Snacks</Text>
                                </View>
                                {dailyPlan.snacks.map((snack: Meal, index: number) => (
                                    <View key={index} style={styles.mealCard}>
                                        <Text style={styles.mealName}>{snack.name}</Text>
                                        <Text style={styles.mealCalories}>{snack.calories} cal</Text>
                                        <View style={styles.ingredientsContainer}>
                                            {snack.ingredients.map((ingredient: string, idx: number) => (
                                                <View key={idx} style={styles.ingredientItem}>
                                                    <Text style={styles.ingredientEmoji}>{snack.emojis[idx]}</Text>
                                                    <Text style={styles.ingredientText}>{ingredient}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
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
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    refreshButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    caloriesContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
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
    caloriesIcon: {
        marginBottom: 8,
    },
    caloriesTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        marginBottom: 4,
    },
    caloriesValue: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FF5722',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    mealSection: {
        marginBottom: 24,
    },
    mealCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 12,
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
    mealName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    mealCalories: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5722',
        marginBottom: 12,
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