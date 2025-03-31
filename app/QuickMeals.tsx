import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface QuickMeal {
    id: number;
    name: string;
    calories: number;
    ingredients: string[];
    emojis: string[];
    prepTime: string;
    difficulty: 'Easy' | 'Medium';
}

const quickMeals: QuickMeal[] = [
    {
        id: 1,
        name: "Tuna & Rice Bowl",
        calories: 450,
        ingredients: ["Canned Tuna", "Instant Rice", "Canned Corn", "Soy Sauce", "Sesame Oil"],
        emojis: ["🐟", "🍚", "🌽", "🥫", "🫒"],
        prepTime: "5 mins",
        difficulty: "Easy"
    },
    {
        id: 2,
        name: "Peanut Butter Banana Toast",
        calories: 350,
        ingredients: ["Bread", "Peanut Butter", "Banana", "Honey", "Cinnamon"],
        emojis: ["🍞", "🥜", "🍌", "🍯", "🌿"],
        prepTime: "3 mins",
        difficulty: "Easy"
    },
    {
        id: 3,
        name: "Canned Bean Burrito",
        calories: 400,
        ingredients: ["Tortillas", "Canned Black Beans", "Canned Corn", "Rice", "Hot Sauce"],
        emojis: ["🌯", "🫘", "🌽", "🍚", "🌶️"],
        prepTime: "8 mins",
        difficulty: "Easy"
    },
    {
        id: 4,
        name: "Overnight Oats",
        calories: 300,
        ingredients: ["Oats", "Milk", "Honey", "Cinnamon", "Dried Fruit"],
        emojis: ["🥣", "🥛", "🍯", "🌿", "🍇"],
        prepTime: "2 mins + overnight",
        difficulty: "Easy"
    },
    {
        id: 5,
        name: "Canned Soup Upgrade",
        calories: 350,
        ingredients: ["Canned Soup", "Rice", "Canned Vegetables", "Hot Sauce", "Crackers"],
        emojis: ["🥣", "🍚", "🥬", "🌶️", "🥖"],
        prepTime: "10 mins",
        difficulty: "Easy"
    },
    {
        id: 6,
        name: "Pasta with Canned Sauce",
        calories: 450,
        ingredients: ["Pasta", "Canned Marinara", "Canned Mushrooms", "Parmesan", "Italian Herbs"],
        emojis: ["🍝", "🍅", "🍄", "🧀", "🌿"],
        prepTime: "15 mins",
        difficulty: "Medium"
    },
    {
        id: 7,
        name: "Rice & Beans Bowl",
        calories: 400,
        ingredients: ["Rice", "Canned Black Beans", "Canned Corn", "Salsa", "Hot Sauce"],
        emojis: ["🍚", "🫘", "🌽", "🍅", "🌶️"],
        prepTime: "10 mins",
        difficulty: "Easy"
    },
    {
        id: 8,
        name: "Canned Chicken Salad",
        calories: 350,
        ingredients: ["Canned Chicken", "Mayo", "Crackers", "Pickles", "Mustard"],
        emojis: ["🍗", "🥫", "🥖", "🥒", "🌿"],
        prepTime: "5 mins",
        difficulty: "Easy"
    },
    {
        id: 9,
        name: "Instant Ramen Upgrade",
        calories: 400,
        ingredients: ["Instant Ramen", "Egg", "Canned Corn", "Green Onions", "Sesame Oil"],
        emojis: ["🍜", "🥚", "🌽", "🧅", "🫒"],
        prepTime: "8 mins",
        difficulty: "Medium"
    },
    {
        id: 10,
        name: "Canned Fruit Parfait",
        calories: 300,
        ingredients: ["Canned Fruit", "Yogurt", "Granola", "Honey", "Cinnamon"],
        emojis: ["🍎", "🥛", "🌾", "🍯", "🌿"],
        prepTime: "5 mins",
        difficulty: "Easy"
    }
];

export default function QuickMeals() {
    const navigation = useNavigation();

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
                    <Text style={styles.title}>Quick Pantry Meals</Text>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {quickMeals.map((meal) => (
                        <View key={meal.id} style={styles.mealCard}>
                            <View style={styles.mealHeader}>
                                <Text style={styles.mealName}>{meal.name}</Text>
                                <View style={styles.mealInfo}>
                                    <View style={styles.infoItem}>
                                        <Ionicons name="time-outline" size={16} color="#666" />
                                        <Text style={styles.infoText}>{meal.prepTime}</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Ionicons name="flame-outline" size={16} color="#FF5722" />
                                        <Text style={styles.infoText}>{meal.calories} cal</Text>
                                    </View>
                                    <View style={[
                                        styles.difficultyBadge,
                                        { backgroundColor: meal.difficulty === 'Easy' ? '#E8F5E9' : '#FFF3E0' }
                                    ]}>
                                        <Text style={[
                                            styles.difficultyText,
                                            { color: meal.difficulty === 'Easy' ? '#4CAF50' : '#FF9800' }
                                        ]}>
                                            {meal.difficulty}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.ingredientsContainer}>
                                {meal.ingredients.map((ingredient, index) => (
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
        marginLeft: 16,
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
        marginBottom: 16,
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
    mealHeader: {
        marginBottom: 16,
    },
    mealName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    mealInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
    },
    difficultyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    difficultyText: {
        fontSize: 12,
        fontWeight: '500',
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